import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CameraView from "../components/MediaCameraView";
import RecordingPreview from "../components/MediaUploadPreview";
import VideoIntroCameraPreview from "../components/VideoIntroCameraPreview";
import VideoIntroCameraPreviewEdit from "../components/VideoIntroCameraPreviewEdit";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Camera"
      options={{ headerShown: false }}
      component={CameraView}
    />
    <Stack.Screen
      name="RecordingPreview"
      options={{ headerShown: false }}
      component={VideoIntroCameraPreview}
    />
    <Stack.Screen
      options={{ headerLeft: null, gestureEnabled: false }}
      name="VideoIntroCameraEdit"
      component={VideoIntroCameraPreviewEdit}
    />
    <Stack.Screen
      name="Preview"
      options={{ headerShown: false }}
      component={RecordingPreview}
    />
  </Stack.Navigator>
);
