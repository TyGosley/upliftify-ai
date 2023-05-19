import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
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

export const QUERY_FEELINGS = gql`
    query feelings {
        feelings {
            _id
            emotion
            description
            recommendations
        }
    }
`;

export const QUERY_EMOTION_HISTORY = gql`
    query emotionHistory {
        emotionHistory {
            _id
            emotion
            description
            recommendations
        }
    }
`;

export const QUERY_SINGLE_FEELING = gql`
    query singleFeeling($feelingId: ID!) {
        feeling(feelingId: $feelingId) {
            _id
            emotion
            description
            recommendations
        }
    }
`;

export const QUERY_SINGLE_EMOTION_HISTORY = gql`
    query singleEmotionHistory($emotionHistoryId: ID!) {
        emotionHistory(emotionHistoryId: $emotionHistoryId) {
            _id
            emotion
            description
            recommendations
        }
    }
`;

