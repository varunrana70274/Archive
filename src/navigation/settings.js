import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ViewProfile from "../screens/Account/ViewProfile";
import Settings from "../screens/Account/Settings/Settings";
import ChangeDistance from "../screens/Account/Settings/ChangeDistance";
import ChangeLookingFor from "../screens/Account/Settings/ChangeLookingFor";
import ChangeOrientation from "../screens/Account/Settings/ChangeOrientation";
import ChangePassword from "../screens/Account/Settings/ChangePassword";
import EditEmail from "../screens/Account/Settings/EditEmail";
import EditPhone from "../screens/Account/Settings/EditPhone";
import HelpCenter from "../screens/Account/Settings/HelpCenter";
import PrivacyPolicy from "../screens/Account/Settings/PrivacyPolicy";
import PushNotifications from "../screens/Account/Settings/PushNotifications";
import ReportProblem from "../screens/Account/Settings/ReportProblem";
import Terms from "../screens/Account/Settings/Terms";
import ReferalAdd from "../screens/Account/Settings/Referal";

import CameraNavigation from "../navigation/camera";
import VideoIntroNavigation from "../navigation/videointro";
import EditProfile from "../screens/Account/EditProfile";
import EditName from "../screens/Account/Profile/EditName";
import EditBio from "../screens/Account/Profile/EditBio";
import EditGender from "../screens/Account/Profile/EditGender";
import EditSchool from "../screens/Account/Profile/EditSchool";
import RecordIntro from "../components/VideoIntroCameraView";
import RecordingPreview from "../components/VideoIntroCameraPreview";
import VideoIntroCameraEdit from "../components/VideoIntroCameraPreviewEdit";
import * as THEME from "../libs/theme";
import VideoPreview from "../screens/Account/VideoPreview";
import { Image } from "react-native";
import EditVideoIntro from "../components/EditVideoIntro";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    options={{}}
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: THEME.Colors.black,
      headerTitleStyle: {
        fontFamily: THEME.FontFamily.semibold,
        color: THEME.Colors.title,
      },
    }}
    // initialRouteName="CameraView"
  >
    <Stack.Screen
      name="ViewProfile"
      component={ViewProfile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Settings"
      options={{
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      component={Settings}
    />
    <Stack.Screen
      name="ChangeDistance"
      options={{ title: "Change Distance" }}
      component={ChangeDistance}
    />
    <Stack.Screen
      name="ChangeLookingFor"
      options={{ title: "Change Looking For" }}
      component={ChangeLookingFor}
    />
    <Stack.Screen
      name="ChangeOrientation"
      options={{ title: "Change Orientation" }}
      component={ChangeOrientation}
    />
    <Stack.Screen
      name="ChangePassword"
      options={{ title: "Change Password" }}
      component={ChangePassword}
    />
    <Stack.Screen
      name="EditEmail"
      options={{ title: "Change Email" }}
      component={EditEmail}
    />
    <Stack.Screen
      name="EditPhone"
      options={{ title: "Change Phone" }}
      component={EditPhone}
    />
    <Stack.Screen
      name="HelpCenter"
      options={{ title: "Help Center" }}
      component={HelpCenter}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      options={{ title: "Privacy Policy" }}
      component={PrivacyPolicy}
    />
    <Stack.Screen
      name="PushNotifications"
      options={{ title: "Push Notifications" }}
      component={PushNotifications}
    />
    <Stack.Screen
      name="ReportProblem"
      options={{ title: "Report Problem" }}
      component={ReportProblem}
    />
    <Stack.Screen
      name="Terms"
      options={{ title: "Terms of Service" }}
      component={Terms}
    />
    <Stack.Screen
      name="EditProfile"
      options={{
        title: "Edit Profile",
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      component={EditProfile}
    />
    <Stack.Screen
      name="VideoPreview"
      options={{
        title: "Preview",
        // ,headerRight:()=>{console.log('dsddd')
        //   return(
        //     <Image
        //     style={{tintColor:'black',height:40,width:40,marginRight:5}}
        //     source={require('../images/camera-pin.png')}
        //     />
        //   )
        // }
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      component={VideoPreview}
    />
    <Stack.Screen
      name="EditVideoIntro"
      options={{
        header:()=>null,
        // title: "Edit Intro Video",
        // ,headerRight:()=>{console.log('dsddd')
        //   return(
        //     <Image
        //     style={{tintColor:'black',height:40,width:40,marginRight:5}}
        //     source={require('../images/camera-pin.png')}
        //     />
        //   )
        // }
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      component={EditVideoIntro}
    />
    <Stack.Screen
      name="CameraView"
      options={{ headerShown: false }}
      component={CameraNavigation}
    />
    <Stack.Screen
      name="RecordIntro"
      options={{ headerShown: false }}
      component={RecordIntro}
    />
<Stack.Screen
      options={{ headerLeft: null,
        headerShown: false,
        headerTintColor: THEME.Colors.primary,
        headerTitleStyle: {
          fontFamily: THEME.FontFamily.semibold,
          color: THEME.Colors.title,
        },
      }}
      name="RecordingPreview"
      component={RecordingPreview}
    />
    <Stack.Screen
      options={{ headerLeft: null, gestureEnabled: false ,
        headerShown: false,
        headerTintColor: THEME.Colors.primary,
        headerTitleStyle: {
          fontFamily: THEME.FontFamily.semibold,
          color: THEME.Colors.title,
        },
      }}
      name="VideoIntroCameraEdit"
      component={VideoIntroCameraEdit}
    />
    <Stack.Screen
      name="VideoIntroView"
      options={{ headerShown: false }}
      component={VideoIntroNavigation}
    />
    <Stack.Screen
      name="EditName"
      options={{
        title: "Name",
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      // options={{  }}
      component={EditName}
    />
    <Stack.Screen
      name="ReferalAdd"
      options={{
        title: "Referral Code",
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      // options={{  }}
      component={ReferalAdd}
    />
    <Stack.Screen
      name="EditBio"
      options={{
        title: "Bio",
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      component={EditBio}
    />
    <Stack.Screen
      name="EditGender"
      options={{
        title: "Gender",
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      component={EditGender}
    />
    <Stack.Screen
      name="EditSchool"
      options={{
        title: "School",
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 20,
          color: "#454F63",
        },
      }}
      component={EditSchool}
    />
  </Stack.Navigator>
);
