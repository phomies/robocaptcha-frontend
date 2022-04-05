import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query loginUser {
    loginUser
  }
`;

export const GET_CALLS = gql`
  query getCalls {
    getUser {
      calls {
        _id
        action
        dateTime
        from
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

export const GET_NOTIFS = gql`
  query getNotifs {
    getUser {
      notifications {
        _id
        content
        dateTime
        read
        url
      }
    }
  }
`;

export const GET_CONTACTS = gql`
  query getContacts {
    getUser {
      contacts {
        _id
        isBlacklisted
        isWhitelisted
        number
        name
      }
    }
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
      payments {
        dateEnd
        dateStart
        plan
      }
    }
  }
`;

export const GET_PAYMENTS = gql`
  query getPayments {
    getUser {
      _id
      payments {
        dateEnd
        dateStart
        plan
        isCancelled
      }
    }
  }
`;

export const GET_VERIFICATION_LEVEL = gql`
  query getNotifLevel {
    getUser {
      _id
      verificationLevel
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