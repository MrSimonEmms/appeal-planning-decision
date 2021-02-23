const express = require('express');

const router = express.Router();

const homeRouter = require('./home');
const filesRouter = require('./files');
const taskListRouter = require('./task-list');
const otherAppealsRouter = require('./other-appeals');
const placeholderRouter = require('./placeholder');
const plansDecisionRouter = require('./plans-decision');

router.use(homeRouter);
router.use(filesRouter);
router.use(taskListRouter);
router.use(otherAppealsRouter);
router.use(placeholderRouter);
router.use(plansDecisionRouter);

module.exports = router;
