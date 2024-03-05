import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LocationPermission from "../screens/Auth/Signup/LocationPermission";
import CameraPermission from "../screens/Auth/Signup/CameraPermission";
import RecordIntro from "../components/VideoIntroCameraView";
import RecordingPreview from "../components/VideoIntroCameraPreview";
import VideoIntroCameraEdit from "../components/VideoIntroCameraPreviewEdit";

const Stack = createStackNavigator();
import * as THEME from "../libs/theme";

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerTintColor: THEME.Colors.primary,
      headerTitleStyle: {
        fontFamily: THEME.FontFamily.semibold,
        color: THEME.Colors.title,
      },
    }}
    initialRouteName={"LocationPermission"}
  >
    <Stack.Screen name="LocationPermission" component={LocationPermission} />
    <Stack.Screen name="CameraPermission" component={CameraPermission} />
    <Stack.Screen name="RecordIntro" component={RecordIntro} />
    <Stack.Screen
      options={{ headerLeft: null }}
      name="RecordingPreview"
      component={RecordingPreview}
    />
    <Stack.Screen
      options={{ headerLeft: null, gestureEnabled: false }}
      name="VideoIntroCameraEdit"
      component={VideoIntroCameraEdit}
    />
  </Stack.Navigator>
);
