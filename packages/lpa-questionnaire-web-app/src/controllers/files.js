exports.uploadFile = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [], files = {} } = body;

  if (!Object.keys(files).length) {
    res.sendStatus(500);
    return;
  }

  // TODO: need validation here to manage duplicate items

  req.session.uploadedFiles.push(files);

  const { name: fileName } = files;

  if (Object.keys(errors).length > 0) {
    res.json({
      error: {
        message: errors.files.msg,
        summary: errorSummary,
      },
      file: {
        filename: fileName,
        originalname: fileName,
      },
    });
    return;
  }

  res.status(200).json({
    success: {
      messageText: fileName,
      messageHtml: fileName,
    },
    file: {
      filename: fileName,
      originalname: fileName,
    },
  });
};

exports.deleteFile = (req, res) => {
  if (!req.session) {
    res.status(500).send('No session data found');
    return;
  }

  const { body } = req;

  if (!body.delete) {
    res.status(400).send('Delete required');
    return;
  }

  const file = req.session.uploadedFiles.find((upload) => upload.name === body.delete);

  if (!file) {
    res.status(404).send('File not found');
    return;
  }

  req.session.uploadedFiles = req.session.uploadedFiles.filter(
    (upload) => upload.name !== body.delete
  );

  res.status(200).json({
    success: {
      messageText: `${req.body.delete} deleted`,
    },
  });
};
