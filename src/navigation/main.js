import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Explore from "../screens/Explore";
import Conversations from "../screens/Conversations";

import UnoteCameraView from "../components/UnoteCameraView";
import UnoteCameraPreview from "../components/UnoteCameraPreview";

import ConversationNavigation from "./conversation";

const Stack = createStackNavigator();
const UnoteStack = createStackNavigator();

const UnoteNavigation = () => (
  <UnoteStack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
      headerTintColor: THEME.Colors.primary,
      headerTitleStyle: {
        fontFamily: THEME.FontFamily.semibold,
        color: THEME.Colors.title,
      },
    }}
  >
    <Stack.Screen name="Explore" component={Explore} />
    <UnoteStack.Screen name="UnoteCameraView" component={UnoteCameraView} />
    <UnoteStack.Screen
      name="UnoteCameraPreview"
      component={UnoteCameraPreview}
    />
  </UnoteStack.Navigator>
);

import * as THEME from "../libs/theme";

export default () => (
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
    <Stack.Screen name="Unote" component={UnoteNavigation} />
    <Stack.Screen name="Conversations" component={ConversationNavigation} />
  </Stack.Navigator>
);
