import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Auth/Welcome";
import Login from "../screens/Auth/Login";

import GetName from "../screens/Auth/Signup/GetName";
import GetEmail from "../screens/Auth/Signup/GetEmail";
import GetPassword from "../screens/Auth/Signup/GetPassword";
import GetBirthday from "../screens/Auth/Signup/GetBirthday";
import GetGender from "../screens/Auth/Signup/GetGender";
import LocationPermission from "../screens/Auth/Signup/LocationPermission";
import CameraPermission from "../screens/Auth/Signup/CameraPermission";
import RecordIntro from "../screens/RecordIntro";
import ReferalCode from '../screens/Auth/RferalCode'
import Terms from "../screens/Account/Settings/Terms";
import PrivacyPolicy from "../screens/Account/Settings/PrivacyPolicy";

import * as THEME from "../libs/theme";
import ForgoPassword from "../screens/Auth/ForgoPassword";
import ResetPassword from "../screens/Auth/ResetPassword";
import CreateNewPassword from "../screens/Auth/CreateNewPassword";
import Success from "../screens/Auth/Success";
import GetOTp from "../screens/Auth/Signup/GetOTp";
import Onboarding from "../screens/Onboarding";
import NameDOB from "../screens/Auth/NameDOB";
import Gender from "../screens/Auth/Gender";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default ({token,user}) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerBackTitleVisible: false,
      headerTintColor: THEME.Colors.primary,
      headerTitleStyle: {
        fontFamily: THEME.FontFamily.semibold,
        color: THEME.Colors.title,
      },
    }}
    initialRouteName={token &&!user?'Onboarding' :"Login"}
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignupName" component={GetName}  />
    <Stack.Screen name="SignupEmail" component={GetEmail} />
    <Stack.Screen name="SignupPassword" component={GetPassword} />
    <Stack.Screen name="SignupBirthday" component={GetBirthday} />
    <Stack.Screen name="SignupGender" component={GetGender} />
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="ReferalCode" component={ReferalCode} />
    <Stack.Screen name="LocationPermission" component={LocationPermission} />
    <Stack.Screen name="CameraPermission" component={CameraPermission} />
    <Stack.Screen name="RecordIntro" component={RecordIntro} />
    <Stack.Screen name="ForgoPassword" component={ForgoPassword} />
    <Stack.Screen name="GetOTp" component={GetOTp} />
    <Stack.Screen name="NameDOB" component={NameDOB} />
    <Stack.Screen name="Gender" component={Gender} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
    <Stack.Screen name="Success" component={Success} options={
      {
        gestureEnabled:false
      }
    }/>
    <Stack.Screen
      name="Terms"
      component={Terms}
      options={{ headerShown: true, headerTitle: "Terms of Service" }}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicy}
      options={{ headerShown: true, headerTitle: "Privacy Policy" }}
    />
  </Stack.Navigator>
);
