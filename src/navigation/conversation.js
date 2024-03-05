import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Conversations from "../screens/Chat/Conversations";
import Conversation from "../screens/Chat/Conversation";
import Profile from "../screens/Profile";

import * as THEME from "../libs/theme";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: THEME.Colors.primary,
      headerTitleStyle: {
        fontFamily: THEME.FontFamily.semibold,
        color: THEME.Colors.title,
      },
    }}
  >
    <Stack.Screen name="Messages" component={Conversations} />
    <Stack.Screen name="Conversation" component={Conversation} />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Profile"
      component={Profile}
    />
  </Stack.Navigator>
);
