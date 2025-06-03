const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  medicalHistory: [String],
  currentMedications: [String],
  allergies: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
PatientSchema.index({ 
  firstName: 'text', 
  lastName: 'text', 
  email: 'text',
  'address.city': 'text'
});

module.exports = mongoose.model('Patient', PatientSchema);