const { Schema, model } = require('mongoose');

const ExperienceSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  jobDescription: {
    type: String,
    required: true,
  },
});

module.exports = ExperienceSchema;