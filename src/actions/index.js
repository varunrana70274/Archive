import { signIn, signOut, updateUserSession } from "../libs/helpers";
import makeApolloClient from "../libs/graphql";

export const setMessageNotificationCounter = (count) => {
  return (dispatch) => {
    dispatch({
      type: "SET_MESSAGE_NOTIFICATIONS",
      payload: {
        count: count,
      },
    });
  };
};

export const generateApolloClient = (token) => {
  return (dispatch) => {
    console.log('token',token);
    let client = makeApolloClient(token);

    dispatch({
      type: "SET_APOLLO_CLIENT",
      payload: {
        client: client,
      },
    });
  };
};

export const login = (token, user) => {
  return async (dispatch) => {
    let client = makeApolloClient(token);
    await signIn(token, user);
    dispatch({
      type: "LOGIN",
      payload: {
        token: token,
        user: user,
        client: client,
      },
    });
  };
};

export const setAuthenticatedUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER",
      payload: {
        user: user,
      },
    });
  };
};

export const updateName = (name) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_NAME",
      payload: {
        name: name,
      },
    });
  };
};

export const updateEmail = (email) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_EMAIL",
      payload: {
        email: email,
      },
    });
  };
};

export const updatePassword = (password) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_PASSWORD",
      payload: {
        password: password,
      },
    });
  };
};

export const updateGender = (gender) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_GENDER",
      payload: {
        gender: gender,
      },
    });
  };
};

export const updateBirthdate = (birthdate) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_BIRTHDATE",
      payload: {
        birthdate: birthdate,
      },
    });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    updateUserSession(user);
    dispatch({
      type: "UPDATE_USER",
      payload: {
        user: user,
      },
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await signOut();
    dispatch({
      type: "LOGOUT",
    });
  };
};
