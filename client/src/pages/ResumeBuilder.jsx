import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ResumeInputForm = ({ resume, setResume, onSubmit }) => {
  let navigate = useNavigate();

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (e.target.name === 'resume') {
      try {
        newValue = JSON.parse(e.target.value);
      } catch (error) {
        console.error("Invalid JSON input:", error);
        return;
      }
    }
    setResume({
      ...resume,
      [e.target.name]: newValue,
    });
  };

  const handleCancelClick = () => {
    setResume(initialResumeState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(resume);
  };

  const handlePhoneChange = (event) => {
    let input = event.target.value;
    let formattedInput = input.replace(/\D/g, '');

    if (formattedInput.length > 3) {
      formattedInput = `(${formattedInput.slice(0, 3)}) ${formattedInput.slice(3)}`;
    }
    if (formattedInput.length > 9) {
      formattedInput = `${formattedInput.slice(0, 9)}-${formattedInput.slice(9, 13)}`;
    }
    setResume({
      ...resume,
      phone: formattedInput,
    });
  };

  const handleExperienceChange = (e, index) => {
    const updatedExperiences = [...resume.experience];
    updatedExperiences[index][e.target.name] = e.target.value;
    setResume({ ...resume, experience: updatedExperiences });

  };

  const handleEducationChange = (e, index) => {
    const updatedEducation = [...resume.education];
    updatedEducation[index][e.target.name] = e.target.value;
    setResume({ ...resume, education: updatedEducation });
  };

  const handleSkillChange = (index, event) => {
    const values = [...resume.skills];
    values[index][event.target.name] = event.target.value;
    setResume({ ...resume, skills: values });
  };

  const addSkill = () => {
    setResume({ ...resume, skills: [...resume.skills, { name: '', proficiency: '' }] });
  };

  const addEducation = () => {
    setResume({ ...resume, education: [...resume.education, { school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' }] });
  };

  const addExperience = () => {
    setResume({ ...resume, experience: [...resume.experience, { jobTitle: '', company: '', startDate: '', endDate: '', jobDescription: '' }] });
  };

  const resumeString = JSON.stringify(resume, null, 2);

  return (
    <>
    <div className='resume-template'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="resume">
          <Form.Label>Resume:</Form.Label>
          <Form.Control as="textarea" value={resumeString} name="resume" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" name="name" value={resume.name} onChange={handleChange} autoComplete="name" />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter your email" name="email" value={resume.email} onChange={handleChange} autoComplete="email" />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder="Enter your phone number" name="phone" value={resume.phone} onChange={handlePhoneChange} autoComplete="tel" />
        </Form.Group>

        <Form.Group controlId="opener">
          <Form.Label>Opening statement</Form.Label>
          <Form.Control
            type="text"
            name="opener"
            value={resume.opener}
            placeholder="Write a brief statement about yourself to catch the attention of potential employers"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Group>

        {resume.skills.map((skill, index) => (
          <Form.Group key={index}>
            <Form.Label htmlFor="skills">Skills {index + 1}</Form.Label>

            <Form.Group>
              <Form.Label htmlFor={`skillName${index}`}>Skill Name</Form.Label>
              <Form.Control
                id={`skillName${index}`}
                type="text"
                name="name"
                value={skill.name}
                onChange={event => handleSkillChange(index, event)}
                placeholder="Skill name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`skillProficiency${index}`}>Skill Proficiency</Form.Label>
              <Form.Select
                id={`skillProficiency${index}`}
                name="proficiency"
                value={skill.proficiency}
                onChange={event => handleSkillChange(index, event)}
              >
                <option value="">Select Proficiency</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </Form.Select>
            </Form.Group>
          </Form.Group>
        ))}

        <Button variant="primary" type="button" onClick={addSkill}>Add Skill</Button>

        {resume.experience.map((experience, index) => (
          <Form.Group key={index}>
            <Form.Label htmlFor="experience">Experience {index + 1}</Form.Label>

            <Form.Group>
              <Form.Label htmlFor={`company${index}`}>Company</Form.Label>
              <Form.Control
                id={`company${index}`}
                type="text"
                placeholder="Enter company"
                name="company"
                value={experience.company}
                onChange={(e) => handleExperienceChange(e, index)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`positions${index}`}>Position</Form.Label>
              <Form.Control
                id={`position${index}`}
                type="text"
                placeholder="Enter position"
                name="position"
                value={experience.position}
                onChange={(e) => handleExperienceChange(e, index)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`startDate${index}`}>Start Date</Form.Label>
              <Form.Control
                id={`startDate${index}`}
                type="date"
                name="startDate"
                value={experience.startDate}
                onChange={(e) => handleExperienceChange(e, index)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`endDate${index}`}>End Date</Form.Label>
              <Form.Control
                id={`endDate${index}`}
                type="date"
                name="endDate"
                value={experience.endDate}
                onChange={(e) => handleExperienceChange(e, index)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`descriptions${index}`}>Description</Form.Label>
              <Form.Control
                id={`description${index}`}
                as="textarea"
                rows={3}
                placeholder="Describe your experience"
                name="description"
                value={experience.description}
                onChange={(e) => handleExperienceChange(e, index)}
              />
            </Form.Group>
          </Form.Group>
        ))}

        <Button onClick={addExperience}>Add Experience</Button>

        {resume.education.map((education, index) => (
          <Form.Group key={index}>
            <Form.Label htmlFor='education'>Education {index + 1}</Form.Label>

            <Form.Group>
              <Form.Label htmlFor={`school${index}`}>School</Form.Label>
              <Form.Control
                id={`school${index}`}
                type="text"
                placeholder="Enter school"
                name="school"
                value={education.school}
                onChange={(e) => handleEducationChange(e, index)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`degree${index}`}>Degree</Form.Label>
              <Form.Control
                id={`degree${index}`}
                type="text"
                placeholder="Enter degree"
                name="degree"
                value={education.degree}
                onChange={(e) => handleEducationChange(e, index)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`fieldOfStudy${index}`}>Field of Study</Form.Label>
              <Form.Control
                id={`fieldOfStudy${index}`}
                type="text"
                placeholder="Enter field of study"
                name="fieldOfStudy"
                value={education.fieldOfStudy}
                onChange={(e) => handleEducationChange(e, index)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`startYear${index}`}>Start Year</Form.Label>
              <Form.Control
                id={`startYear${index}`}
                type="date"
                name="startYear"
                value={education.startYear}
                onChange={(e) => handleEducationChange(e, index)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor={`endYear${index}`}>End Year</Form.Label>
              <Form.Control
                id={`endYear${index}`}
                type="date"
                name="endYear"
                value={education.endYear}
                onChange={(e) => handleEducationChange(e, index)}
              />
            </Form.Group>
          </Form.Group>
        ))}

        <Button onClick={addEducation}>Add Education</Button>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="danger" type="button" onClick={handleCancelClick}>
          Cancel Form Input
        </Button>
      </Form>
    </div>
    </>
  );
}
export default ResumeInputForm;