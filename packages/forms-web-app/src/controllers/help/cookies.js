const { VIEW } = require('../../lib/views');

exports.getCookiePreferences = (req, res) => {
  res.render(VIEW.HELP.COOKIES);
};

// exports.postCookiePreferences = (req, res) => {
//   res.redirect(`/${VIEW.HELP.COOKIES}`);
// };
