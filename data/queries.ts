import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query loginUser {
    loginUser
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      name
      email
      phoneNumber
      maskedNumber
      verificationLevel
      # calls {
      #   _id
      #   action
      #   dateTime
      #   from
      # }
      notifications {
        _id
        content
        dateTime
        read
        url
      }
      contacts {
        _id
        isBlacklisted
        isWhitelisted
        number
        name
      }
      payments {
        dateEnd
        dateStart
        plan
        isCancelled
      }
    }
    getCallSummary {
      callsReceived {
        callsAccepted
        callsRejected
        dateTime
      }
      newCalls
      newCallsPercentage
      totalBlockedCalls
      weeklyBlockedCalls
    }
  }
`;

export const SYNC_CONTACTS = gql`
  query syncContacts {
    syncContacts
  }
`;

export const CHECK_USER = gql`
  query checkUser($email: String) {
    checkUser(email: $email)
  }
`