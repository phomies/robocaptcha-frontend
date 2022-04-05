import { gql } from '@apollo/client';

export const EDIT_USER = gql`
  mutation updateUser($userInput: UserInput) {
    updateUser(userInput: $userInput) {
      _id
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser
  }
`;

export const UPSERT_CONTACT = gql`
  mutation upsertContact($upsertContactInput: UpsertContactInput) {
    upsertContact(upsertContactInput: $upsertContactInput) {
      _id
    }
  }
`;

export const UPSERT_PAYMENT = gql`
  mutation upsertPayment($upsertPaymentInput: UpsertPaymentInput) {
    upsertPayment(upsertPaymentInput: $upsertPaymentInput) {
      _id
    }
  }
`;

export const DELETE_PAYMENT = gql`
  mutation deletePayment {
    deletePayment
  }
`

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput) {
    createUser(createUserInput: $createUserInput)
  }
`;

export const READ_NOTIFS = gql`
  mutation readNotifs($id: ID) {
    readNotification(_id: $id) {
      _id
    }
  }
`;