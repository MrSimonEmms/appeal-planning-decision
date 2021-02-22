const express = require('express');
const plansDecisionController = require('../controllers/plans-decision');
const fetchExistingAppealReplyMiddleware = require('../middleware/fetch-existing-appeal-reply');
const fetchAppealMiddleware = require('../middleware/fetch-appeal');
const { validationErrorHandler } = require('../validators/validation-error-handler');
const { rules: otherAppealsValidationRules } = require('../validators/other-appeals');

const router = express.Router();

router.get(
  '/:id/plans-decision',
  [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware],
  plansDecisionController.getPlansDecision
);

router.post(
  '/:id/plans-decision',
  otherAppealsValidationRules(),
  validationErrorHandler,
  plansDecisionController.postPlansDecision
);

module.exports = router;
