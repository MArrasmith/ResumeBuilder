import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $firstLastName: String!, $password: String!) {
    addUser(name: $name, email: $email, firstLastName: $firstLastName, password: $password) {
      token
      user {
        _id
        name
        email
        firstLastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const ADD_RESUME = gql`
  mutation addResume($userId: ID!, $resume: ResumeInput!) {
    addResume(userId: $userId, resume: $resume) {
      _id
      name
      email
      phone
      resumes {
        _id
        opener
        skills
        experience
        education
      }
    }
  }
`;

export const REMOVE_RESUME = gql`
  mutation removeResume($userId: ID!, $resumeId: ID!) {
    removeResume(userId: $userId, resumeId: $resumeId) {
      _id
      name
      resumes {
        _id
        opener
        skill
        experience
        education
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
    }
  }
`;