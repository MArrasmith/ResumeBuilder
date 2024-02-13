import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
        _id
        name
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      _id
    }
  }
`;