const { Schema, model } = require('mongoose');

const SkillSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = SkillSchema;
