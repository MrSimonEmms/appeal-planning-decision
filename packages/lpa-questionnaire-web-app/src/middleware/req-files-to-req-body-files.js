/**
 * Middleware for converting `req.files` to `req.body.files`.
 *
 * The requirement for this is due to `express-validator` only considering a limited subset of
 * keys on the `req` object as being eligible for validation.
 *
 * `filesPropertyPath` should be set at the point the middleware is called, and should related to
 * the name of the `input` element used for multiple file upload. This has not been tested with
 * pages that contain two or more multiple file uploads.
 *
 * @param {string} filesPropertyPath
 * @returns {function(*, *, *): (*)}
 */
module.exports = (filesPropertyPath) => (req, res, next) => {
  if (!req.body || !req.files) {
    return next();
  }

  if (typeof req.files[filesPropertyPath] === 'undefined') {
    req.body.files = {};
    return next();
  }

  try {
    req.body.files = {
      ...req.body.files,
      ...req.files[filesPropertyPath],
    };
  } catch (err) {
    req.body.files = {};
  }

  return next();
};
