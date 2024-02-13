const { Schema, model } = require('mongoose');
const EducationSchema = require('./Education');
const ExperienceSchema = require('./Experience');
const SkillSchema = require('./Skills');

const ResumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    phone: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number.'],
    },
    opener: {
        type: String,
    },
    education: [EducationSchema],
    experience: [ExperienceSchema],
    skills: [SkillSchema],
});

module.exports = model('Resume', ResumeSchema);