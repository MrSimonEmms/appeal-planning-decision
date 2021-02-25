const express = require('express');

const cookiePreferencesController = require('../../controllers/help/cookies');

const router = express.Router();

router.get('/cookies', cookiePreferencesController.getCookiePreferences);
// router.post('/cookies', cookiePreferencesController.postCookiePreferences);

module.exports = router;
