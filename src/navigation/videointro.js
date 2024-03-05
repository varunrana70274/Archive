import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import CameraView from "../components/Settings/VideoIntroCameraView";
import CameraView from "../components/VideoIntroCameraView";
// import RecordingPreview from "../components/Settings/VideoIntroCameraPreview";
import RecordingPreview from "../components/VideoIntroCameraPreview";
import VideoIntroCameraEdit from "../components/VideoIntroCameraPreviewEdit";
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="RecordIntro"
  >
    <Stack.Screen
      name="RecordIntro"
      options={{ headerShown: false }}
      component={CameraView}
    />
    <Stack.Screen
      name="RecordingPreview"
      options={{ headerShown: false }}
      component={RecordingPreview}
    />
    <Stack.Screen
      initialParams={{ screen: "edit" }}
      options={{ headerLeft: null, gestureEnabled: false }}
      name="VideoIntroCameraEdit"
      component={VideoIntroCameraEdit}
    />
  </Stack.Navigator>
);
