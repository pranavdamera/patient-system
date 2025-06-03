const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// @route   GET /api/patients
// @desc    Get all patients with optional search
router.get('/', patientController.getPatients);

// @route   GET /api/patients/:id
// @desc    Get a single patient by ID
router.get('/:id', patientController.getPatientById);

// @route   POST /api/patients
// @desc    Create a new patient
router.post('/', patientController.createPatient);

// @route   PUT /api/patients/:id
// @desc    Update a patient
router.put('/:id', patientController.updatePatient);

// @route   DELETE /api/patients/:id
// @desc    Delete a patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;