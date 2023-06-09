import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        feelings {
          _id
          emotion
          description
          recommendations
        }
        emotionHistory {
          _id
          emotion
          description
          recommendations
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_FEELING = gql`
  mutation addFeeling($feelingData: FeelingInput!) {
    addFeeling(feelingData: $feelingData) {
      _id
      emotion
      description
      recommendations
    }
  }
`;


export const DELETE_EMOTION_HISTORY = gql`
  mutation deleteEmotionHistory {
    deleteEmotionHistory {
      _id
      username
      email
      feelings {
        _id
        emotion
        description
        recommendations
      }
      emotionHistory {
        _id
        emotion
        description
        recommendations
      }
    }
  }
`;

export const UPDATE_FEELINGS = gql`
  mutation updateFeelings($feelings: [ID]!) {
    updateFeelings(feelings: $feelings) {
      _id
      username
      email
      feelings {
        _id
        emotion
        description
        recommendations
      }
      emotionHistory {
        _id
        emotion
        description
        recommendations
      }
    }
  }
`;

export const SAVE_FEELING = gql`
  mutation saveFeeling($emotion: String!, $description: String!, $recommendations: String!) {
    saveFeeling(emotion: $emotion, description: $description, recommendations: $recommendations) {
      _id
      username
      email
      feelings {
        _id
        emotion
        description
        recommendations
      }
      emotionHistory {
        _id
        emotion
        description
        recommendations
      }
    }
  }
`;


export const UPDATE_EMOTION_HISTORY = gql`
  mutation updateEmotionHistory($emotionHistory: [ID]!) {
    updateEmotionHistory(emotionHistory: $emotionHistory) {
      _id
      username
      email
      feelings {
        _id
        emotion
        description
        recommendations
      }
      emotionHistory {
        _id
        emotion
        description
        recommendations
      }
    }
  }
`;
