import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/Splashscreen";
import AuthStackNavigation from "./auth";
import MainStackNavigation from "./main";
import SettingsNavigation from "./settings";
import OnboardingNavigation from "./onboarding";
import { connect } from "react-redux";
import * as THEME from "../libs/theme";
import makeApolloClient from "../libs/graphql";
import { fetchToken } from "../libs/helpers";
import { ApolloProvider } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { login, updateUser } from "../actions";
import { Platform } from "react-native";
import { MyTabs } from "./tabNavigator";

const Stack = createStackNavigator();

const USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      avatar
      school
      age
      phone_number
      search_distance
      looking_for
      orientation
    }
  }
`;

const AppNavigation = ({ token, user, login, updateUser }) => {
  const [client, setClient] = useState(makeApolloClient());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { token: fetchedToken, user: fetchedUser } = await fetchToken();
      setClient(makeApolloClient(fetchedToken));

      if (fetchedToken) {
        login(fetchedToken, fetchedUser);
      }

      const timeoutDuration = Platform.OS === "android" ? 3000 : 2000;
      setTimeout(() => {
        setLoading(false);
      }, timeoutDuration);
    };

    fetchData();
  }, [login]);

  useEffect(() => {
    if (token) {
      setClient(makeApolloClient(token));
    }
  }, [token]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <ApolloProvider client={client}>
      {!token || !user?.name ? (
        <Stack.Navigator
          options={{}}
          screenOptions={{
            headerShown: false,
            headerTintColor: THEME.Colors.primary,
            headerTitleStyle: {
              fontFamily: THEME.FontFamily.semibold,
              color: THEME.Colors.title,
            },
          }}
        >
          <Stack.Screen
            name="Auth"
            component={() => AuthStackNavigation({ token, user: user?.name })}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : user?.onboarded ? (
        <MyTabs />
      ) : (
        <OnboardingNavigation />
      )}
    </ApolloProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};

export default connect(mapStateToProps, { login, updateUser })(AppNavigation);
