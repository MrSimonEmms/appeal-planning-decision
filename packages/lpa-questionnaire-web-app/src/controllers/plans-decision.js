const { VIEW } = require('../lib/views');
const getAppealSideBarDetails = require('../lib/appeal-sidebar-details');

exports.getPlansDecision = (req, res) => {
  res.render(VIEW.PLANS_DECISION, {
    appeal: getAppealSideBarDetails(req.session.appeal),
    backLink: req.session.backLink,
  });
};

exports.postPlansDecision = (req, res) => {
  res.render(VIEW.PLANS_DECISION, {
    appeal: getAppealSideBarDetails(req.session.appeal),
    backLink: req.session.backLink,
  });
};
