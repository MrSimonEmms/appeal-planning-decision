const logger = require('../lib/logger');
const { VIEW } = require('../lib/views');
const getAppealSideBarDetails = require('../lib/appeal-sidebar-details');

exports.getPlansDecision = (req, res) => {
  res.render(VIEW.PLANS_DECISION, {
    appeal: getAppealSideBarDetails(req.session.appeal),
    backLink: req.session.backLink || `/${req.params.id}/${VIEW.TASK_LIST}`,
    uploadedFiles: [],
  });
};

exports.postPlansDecision = (req, res) => {
  logger.debug(req.session.uploadedFiles);

  res.redirect(req.session.backLink || `/${req.params.id}/${VIEW.TASK_LIST}`);
};
