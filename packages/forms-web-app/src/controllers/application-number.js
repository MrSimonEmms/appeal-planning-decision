const { VIEW } = require('../lib/views');

exports.getApplicationNumber = (req, res) => {
  res.render(VIEW.APPLICATION_NUMBER);
};

exports.postApplicationNumber = (req, res) => {
  res.redirect(`/${VIEW.APPELLANT_SUBMISSION.TASK_LIST}`);
};