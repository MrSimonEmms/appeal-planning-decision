const logger = require('../lib/logger');
const { createDocument } = require('../lib/documents-api-wrapper');

exports.uploadFile = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [], files = {} } = body;

  if (!Object.keys(files).length) {
    res.sendStatus(500);
    return;
  }

  logger.debug(errors);

  if (Object.keys(errors).length > 0) {
    res.json({
      error: {
        message: errors.files.msg,
        summary: errorSummary,
      },
      file: {
        filename: files.name,
        originalname: files.name,
      },
    });
    return;
  }

  const document = await createDocument(req.session.appealReply, files);

  res.status(200).json({
    success: {
      messageText: document.name,
      messageHtml: document.name,
    },
    file: {
      filename: document.name,
      originalname: document.name,
    },
  });
};

exports.deleteFile = (req, res) => {
  res.status(200).json({
    success: {
      messageText: `${req.body.delete} deleted`,
    },
  });
};
