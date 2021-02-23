const { checkSchema } = require('express-validator');
const filesSchema = require('./schemas/files');

const rules = () => {
  return [checkSchema(filesSchema)];
};

module.exports = rules;
