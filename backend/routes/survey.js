const express = require('express');
const { createSurvey, createWeeklySurvey,checkWeeklySurveyStatus, updateSurvey, getSurvey, getSurveys } = require('../controllers/surveyController');
const router = express.Router();


router.post('/', createSurvey); // Create a new survey response
router.post("/weekly", createWeeklySurvey); //weekly survey
router.put('/:id', updateSurvey);// Update a survey response
router.get('/:id', getSurvey); // Get a specific survey response by ID
router.get('/user/:userId', getSurveys);// Get all survey responses by userId
router.get('/status/:userId', checkWeeklySurveyStatus); //Weekly survey status

module.exports = router;

