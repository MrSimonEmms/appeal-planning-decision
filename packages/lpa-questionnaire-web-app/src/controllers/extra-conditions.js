const logger = require('../lib/logger');
const { VIEW } = require('../lib/views');
const getAppealSideBarDetails = require('../lib/appeal-sidebar-details');
const { getTaskStatus } = require('../services/task.service');
const { createOrUpdateAppealReply } = require('../lib/appeal-reply-api-wrapper');

const sectionName = 'aboutAppealSection';
const taskName = 'extraConditions';

exports.getExtraConditions = (req, res) => {
  res.render(VIEW.EXTRA_CONDITIONS, {
    appeal: getAppealSideBarDetails(req.session.appeal),
    backLink: req.session.backLink || `/${req.params.id}/${VIEW.TASK_LIST}`,
  });
};

exports.postExtraConditions = async (req, res) => {
  const {
    body,
    session: { appealReply },
  } = req;
  const { errors = {}, errorSummary = [] } = body;

  const values = {
    'extra-conditions-text': body['extra-conditions-text'],
    'extra-conditions': body['extra-conditions'],
  };

  if (Object.keys(errors).length > 0) {
    res.render(VIEW.EXTRA_CONDITIONS, {
      appeal: getAppealSideBarDetails(req.session.appeal),
      backLink: req.session.backLink || `/${req.params.id}/${VIEW.TASK_LIST}`,
      errors,
      errorSummary,
      values,
    });
    return;
  }

  const task = appealReply[sectionName][taskName];
  task.extraConditions = body['extra-conditions'] === 'yes';
  task.extraConditionsText =
    body['extra-conditions'] === 'yes' ? body['extra-conditions-text'] : '';
  appealReply.sectionStates[sectionName][taskName] = getTaskStatus(
    appealReply,
    sectionName,
    taskName
  );

  try {
    req.session.appealReply = await createOrUpdateAppealReply(appealReply);
  } catch (e) {
    logger.error(e);

    res.render(VIEW.EXTRA_CONDITIONS, {
      appeal: getAppealSideBarDetails(req.session.appeal),
      backLink: req.session.backLink || `/${req.params.id}/${VIEW.TASK_LIST}`,
      errors,
      errorSummary: [{ text: e.toString() }],
      values,
    });

    return;
  }

  res.redirect(req.session.backLink || `/${req.params.id}/${VIEW.TASK_LIST}`);
};
