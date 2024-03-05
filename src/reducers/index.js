import makeApolloClient from "../libs/graphql";

const initialState = {
  token: null,
  user: null,
  name: "",
  email: "",
  password: "",
  birthdate: "",
  gender: null,
  notifications: 10,
  apolloClient: makeApolloClient(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_APOLLO_CLIENT":
      return {
        ...state,
        apolloClient: action.payload.client,
      };
      break;
    case "SET_MESSAGE_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload.count,
      };
      break;
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        apolloClient: action.payload.client,
      };
      break;
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload.name,
      };
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload.email,
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload.password,
      };
    case "UPDATE_GENDER":
      return {
        ...state,
        gender: action.payload.gender,
      };
    case "UPDATE_BIRTHDATE":
      return {
        ...state,
        birthdate: action.payload.birthdate,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.user,
      };
      break;
    case "LOGOUT":
      return {
        ...state,
        token: null,
        apolloClient: null,
      };
      break;
    default:
      return state;
  }
};
