const taskListController = require('../../../../src/controllers/appellant-submission/task-list');
const { VIEW } = require('../../../../src/lib/views');
const { mockReq, mockRes } = require('../../mocks');

describe('controller/appellant-submission/task-list', () => {
  describe('getTaskList', () => {
    it('All the tasks except check answers should be in not started', () => {
      const req = mockReq();
      const res = mockRes();

      taskListController.getTaskList(req, res);

      expect(res.render).toHaveBeenCalledWith(VIEW.APPELLANT_SUBMISSION.TASK_LIST, {
        applicationStatus: 'Application incomplete',
        sectionInfo: { nbTasks: 12, nbCompleted: 0 },
        sections: [
          {
            heading: {
              text: 'About you',
            },
            items: [
              {
                href: `/${VIEW.APPELLANT_SUBMISSION.WHO_ARE_YOU}`,
                text: 'Your details',
                status: 'NOT STARTED',
              },
            ],
          },
          {
            heading: {
              text: 'About the original planning application',
            },
            items: [
              {
                text: 'Planning application number',
                href: `/${VIEW.APPELLANT_SUBMISSION.APPLICATION_NUMBER}`,
                status: 'NOT STARTED',
              },
              {
                text: 'Upload the original planning application form',
                href: `/${VIEW.APPELLANT_SUBMISSION.UPLOAD_APPLICATION}`,
                status: 'NOT STARTED',
              },
              {
                text: 'Upload the decision letter',
                href: `/${VIEW.APPELLANT_SUBMISSION.UPLOAD_DECISION}`,
                status: 'NOT STARTED',
              },
            ],
          },
          {
            heading: {
              text: 'Your appeal',
            },
            items: [
              {
                text: 'Your appeal statement',
                href: `/${VIEW.APPELLANT_SUBMISSION.APPEAL_STATEMENT}`,
                status: 'NOT STARTED',
              },
              {
                text: 'Any other documents to support your appeal',
                href: `/${VIEW.APPELLANT_SUBMISSION.SUPPORTING_DOCUMENTS}`,
                status: 'TODO',
              },
              {
                text: 'Other relevant appeals',
                href: 'other-appeals',
                status: 'TODO',
              },
            ],
          },
          {
            heading: {
              text: 'About the appeal site',
            },
            items: [
              {
                text: 'Address of the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_LOCATION}`,
                status: 'NOT STARTED',
              },
              {
                text: 'Access to the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_ACCESS}`,
                status: 'NOT STARTED',
              },
              {
                text: 'Ownership of the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_OWNERSHIP}`,
                status: 'TODO',
              },
              {
                text: 'Any health and safety issues',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_ACCESS_SAFETY}`,
                status: 'TODO',
              },
            ],
          },

          {
            heading: {
              text: 'Submit your appeal',
            },
            items: [
              {
                text: 'Check your answers',
                href: `/${VIEW.CHECK_ANSWERS}`,
                status: 'CANNOT START YET',
              },
            ],
          },
        ],
      });
    });
    it('Some tasks still in progress and check your answer cannot be started', () => {
      const req = mockReq({
        aboutYouSection: {
          yourDetails: { isOriginalApplicant: true },
        },
        appealSiteSection: {
          siteAddress: {
            addressLine1: '1',
            county: 'PACA',
            postcode: '06300',
          },
          siteAccess: {
            canInspectorSeeWholeSiteFromPublicRoad: true,
          },
        },
        requiredDocumentsSection: {
          applicationNumber: '123',
          originalApplication: {
            uploadedFile: {
              name: 'original.pdf',
            },
          },
          decisionLetter: {
            uploadedFile: {
              name: 'decision.pdf',
            },
          },
        },
        yourAppealSection: {
          appealStatement: {
            uploadedFile: {
              name: 'appeal.pdf',
            },
          },
        },
      });
      const res = mockRes();

      taskListController.getTaskList(req, res);

      expect(res.render).toHaveBeenCalledWith(VIEW.APPELLANT_SUBMISSION.TASK_LIST, {
        applicationStatus: 'Application incomplete',
        sectionInfo: { nbTasks: 12, nbCompleted: 6 },
        sections: [
          {
            heading: {
              text: 'About you',
            },
            items: [
              {
                href: `/${VIEW.APPELLANT_SUBMISSION.WHO_ARE_YOU}`,
                text: 'Your details',
                status: 'IN PROGRESS',
              },
            ],
          },
          {
            heading: {
              text: 'About the original planning application',
            },
            items: [
              {
                text: 'Planning application number',
                href: `/${VIEW.APPELLANT_SUBMISSION.APPLICATION_NUMBER}`,
                status: 'COMPLETED',
              },
              {
                text: 'Upload the original planning application form',
                href: `/${VIEW.APPELLANT_SUBMISSION.UPLOAD_APPLICATION}`,
                status: 'COMPLETED',
              },
              {
                text: 'Upload the decision letter',
                href: `/${VIEW.APPELLANT_SUBMISSION.UPLOAD_DECISION}`,
                status: 'COMPLETED',
              },
            ],
          },
          {
            heading: {
              text: 'Your appeal',
            },
            items: [
              {
                text: 'Your appeal statement',
                href: `/${VIEW.APPELLANT_SUBMISSION.APPEAL_STATEMENT}`,
                status: 'COMPLETED',
              },
              {
                text: 'Any other documents to support your appeal',
                href: `/${VIEW.APPELLANT_SUBMISSION.SUPPORTING_DOCUMENTS}`,
                status: 'TODO',
              },
              {
                text: 'Other relevant appeals',
                href: 'other-appeals',
                status: 'TODO',
              },
            ],
          },
          {
            heading: {
              text: 'About the appeal site',
            },
            items: [
              {
                text: 'Address of the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_LOCATION}`,
                status: 'COMPLETED',
              },
              {
                text: 'Access to the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_ACCESS}`,
                status: 'COMPLETED',
              },
              {
                text: 'Ownership of the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_OWNERSHIP}`,
                status: 'TODO',
              },
              {
                text: 'Any health and safety issues',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_ACCESS_SAFETY}`,
                status: 'TODO',
              },
            ],
          },

          {
            heading: {
              text: 'Submit your appeal',
            },
            items: [
              {
                text: 'Check your answers',
                href: `/${VIEW.CHECK_ANSWERS}`,
                status: 'CANNOT START YET',
              },
            ],
          },
        ],
      });
    });

    it('All the task should be completed and check your answer can be started', () => {
      const req = mockReq({
        aboutYouSection: {
          yourDetails: { isOriginalApplicant: true, name: 'Joe', email: 'joe@email.com' },
        },
        appealSiteSection: {
          siteAddress: {
            addressLine1: '1',
            county: 'PACA',
            postcode: '06300',
          },
          siteAccess: {
            canInspectorSeeWholeSiteFromPublicRoad: true,
          },
        },
        requiredDocumentsSection: {
          applicationNumber: '123',
          originalApplication: {
            uploadedFile: {
              name: 'original.pdf',
            },
          },
          decisionLetter: {
            uploadedFile: {
              name: 'decision.pdf',
            },
          },
        },
        yourAppealSection: {
          appealStatement: {
            uploadedFile: {
              name: 'appeal.pdf',
            },
          },
        },
      });
      const res = mockRes();

      taskListController.getTaskList(req, res);

      expect(res.render).toHaveBeenCalledWith(VIEW.APPELLANT_SUBMISSION.TASK_LIST, {
        applicationStatus: 'Application incomplete',
        sectionInfo: { nbTasks: 12, nbCompleted: 7 },
        sections: [
          {
            heading: {
              text: 'About you',
            },
            items: [
              {
                href: `/${VIEW.APPELLANT_SUBMISSION.WHO_ARE_YOU}`,
                text: 'Your details',
                status: 'COMPLETED',
              },
            ],
          },
          {
            heading: {
              text: 'About the original planning application',
            },
            items: [
              {
                text: 'Planning application number',
                href: `/${VIEW.APPELLANT_SUBMISSION.APPLICATION_NUMBER}`,
                status: 'COMPLETED',
              },
              {
                text: 'Upload the original planning application form',
                href: `/${VIEW.APPELLANT_SUBMISSION.UPLOAD_APPLICATION}`,
                status: 'COMPLETED',
              },
              {
                text: 'Upload the decision letter',
                href: `/${VIEW.APPELLANT_SUBMISSION.UPLOAD_DECISION}`,
                status: 'COMPLETED',
              },
            ],
          },
          {
            heading: {
              text: 'Your appeal',
            },
            items: [
              {
                text: 'Your appeal statement',
                href: `/${VIEW.APPELLANT_SUBMISSION.APPEAL_STATEMENT}`,
                status: 'COMPLETED',
              },
              {
                text: 'Any other documents to support your appeal',
                href: `/${VIEW.APPELLANT_SUBMISSION.SUPPORTING_DOCUMENTS}`,
                status: 'TODO',
              },
              {
                text: 'Other relevant appeals',
                href: 'other-appeals',
                status: 'TODO',
              },
            ],
          },
          {
            heading: {
              text: 'About the appeal site',
            },
            items: [
              {
                text: 'Address of the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_LOCATION}`,
                status: 'COMPLETED',
              },
              {
                text: 'Access to the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_ACCESS}`,
                status: 'COMPLETED',
              },
              {
                text: 'Ownership of the appeal site',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_OWNERSHIP}`,
                status: 'TODO',
              },
              {
                text: 'Any health and safety issues',
                href: `/${VIEW.APPELLANT_SUBMISSION.SITE_ACCESS_SAFETY}`,
                status: 'TODO',
              },
            ],
          },

          {
            heading: {
              text: 'Submit your appeal',
            },
            items: [
              {
                text: 'Check your answers',
                href: `/${VIEW.CHECK_ANSWERS}`,
                status: 'NOT STARTED',
              },
            ],
          },
        ],
      });
    });
  });
});