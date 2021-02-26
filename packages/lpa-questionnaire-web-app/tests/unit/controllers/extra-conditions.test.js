const extraConditionsController = require('../../../src/controllers/extra-conditions');
const { createOrUpdateAppealReply } = require('../../../src/lib/appeal-reply-api-wrapper');
const { getTaskStatus } = require('../../../src/services/task.service');
const logger = require('../../../src/lib/logger');
const appealReply = require('../../../src/lib/empty-appeal-reply');
const { VIEW } = require('../../../src/lib/views');
const { mockReq, mockRes } = require('../mocks');

jest.mock('../../../src/lib/appeal-reply-api-wrapper');
jest.mock('../../../src/services/task.service');
jest.mock('../../../src/lib/logger');

describe('controllers/extra-conditions', () => {
  const mockTaskStatus = 'MOCK_STATUS';
  const backLinkUrl = '/mock-id/mock-back-link';
  let req;
  let res;
  let mockAppealReply;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    mockAppealReply = { ...appealReply };

    jest.resetAllMocks();
  });

  describe('get extra conditions', () => {
    it('should call the correct template', () => {
      req.session.backLink = backLinkUrl;

      extraConditionsController.getExtraConditions(req, res);

      expect(res.render).toHaveBeenCalledWith(VIEW.EXTRA_CONDITIONS, {
        appeal: null,
        backLink: backLinkUrl,
      });
    });
  });

  it('it should have the correct backlink when no request session object exists.', () => {
    extraConditionsController.getExtraConditions(req, res);

    expect(res.render).toHaveBeenCalledWith(VIEW.EXTRA_CONDITIONS, {
      appeal: null,
      backLink: `/mock-id/${VIEW.TASK_LIST}`,
    });
  });

  describe('postOtherAppeals', () => {
    it('should redirect with extra-conditions set to false', async () => {
      getTaskStatus.mockImplementation(() => mockTaskStatus);

      mockAppealReply.aboutAppealSection.extraConditions.hasExtraConditions = false;
      // mockAppealReply.sectionStates.extraConditions.extraConditions = mockTaskStatus;

      const mockRequest = {
        ...mockReq(),
        body: {
          'extra-conditions': 'no',
        },
      };

      await extraConditionsController.postExtraConditions(mockRequest, res);

      expect(createOrUpdateAppealReply).toHaveBeenCalledWith(mockAppealReply);
      expect(res.render).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(`/mock-id/${VIEW.TASK_LIST}`);
    });

    it('should redirect to the back link specified', async () => {
      getTaskStatus.mockImplementation(() => mockTaskStatus);

      mockAppealReply.aboutAppealSection.extraConditions.hasExtraConditions = false;
      // mockAppealReply.sectionStates.aboutAppealSection.otherAppeals = mockTaskStatus;

      const mockRequest = {
        ...mockReq(),
        body: {
          'extra-conditions': 'no',
        },
      };
      mockRequest.session.backLink = backLinkUrl;

      await extraConditionsController.postExtraConditions(mockRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(backLinkUrl);
    });

    it('should redirect with extra-conditions set to true and extra-conditions-text passed', async () => {
      getTaskStatus.mockImplementation(() => mockTaskStatus);

      mockAppealReply.aboutAppealSection.extraConditions = {
        extraConditions: true,
        extraConditionsText: 'some-text',
      };
      mockAppealReply.aboutAppealSection.extraConditions.extraConditions = mockTaskStatus;

      const mockRequest = {
        ...mockReq(),
        body: {
          'extra-conditions': 'yes',
          'extra-conditions-text': 'some-text',
        },
      };
      mockRequest.session.backLink = `/mock-id/${VIEW.TASK_LIST}`;

      await extraConditionsController.postExtraConditions(mockRequest, res);

      expect(createOrUpdateAppealReply).toHaveBeenCalledWith(mockAppealReply);
      expect(res.render).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(`/mock-id/${VIEW.TASK_LIST}`);
    });

    it('should re-render the template with errors if there is any validator error', async () => {
      const mockRequest = {
        ...mockReq(),
        body: {
          'extra-conditions': 'yes',
          'extra-conditions-text': null,
          errors: { a: 'b' },
          errorSummary: [{ text: 'There were errors here', href: '#' }],
        },
      };
      await extraConditionsController.postExtraConditions(mockRequest, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(VIEW.EXTRA_CONDITIONS, {
        appeal: null,
        backLink: `/mock-id/${VIEW.TASK_LIST}`,
        errorSummary: [{ text: 'There were errors here', href: '#' }],
        errors: { a: 'b' },
        values: {
          'extra-conditions': 'yes',
          'extra-conditions-text': null,
        },
      });
    });

    it('should re-render the template with an error if there is an API error', async () => {
      mockAppealReply.aboutAppealSection.extraConditions.hasExtraConditions = false;
      mockAppealReply.sectionStates.extraConditions = mockTaskStatus;

      const mockRequest = {
        ...mockReq(),
        body: {
          'extra-conditions': 'no',
        },
      };

      createOrUpdateAppealReply.mockRejectedValue('mock api error');

      await extraConditionsController.postExtraConditions(mockRequest, res);

      expect(createOrUpdateAppealReply).toHaveBeenCalledWith(mockAppealReply);
      expect(res.redirect).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(VIEW.EXTRA_CONDITIONS, {
        appeal: null,
        backLink: `/mock-id/${VIEW.TASK_LIST}`,
        errorSummary: [{ text: 'mock api error' }],
        errors: {},
        values: {
          'extra-conditions': 'no',
          'extra-conditions-text': undefined,
        },
      });
    });
  });
});
