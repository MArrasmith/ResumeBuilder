const { Schema, model } = require('mongoose');

const EducationSchema = new Schema({
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  startYear: {
    type: Date,
    required: true,
  },
  endYear: {
    type: Date,
  },
});

module.exports = EducationSchema;