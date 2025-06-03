const Patient = require('../models/Patient');

// Get all patients with optional search
exports.getPatients = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = { $text: { $search: search } };
    }
    
    const patients = await Patient.find(query).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const patient = await newPatient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Update a patient
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json({ message: 'Patient removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};