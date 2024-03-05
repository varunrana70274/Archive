import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import * as Font from "expo-font";
import { MenuProvider } from "react-native-popup-menu";
import { cacheImages } from "./src/libs/helpers";
import AppNavigation from "./src/navigation";
import Crashlytics from "@react-native-firebase/crashlytics";
import Constants from 'expo-constants';

const App = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Crashlytics().setCrashlyticsCollectionEnabled(true);
        await loadAssets();
        setAssetsLoaded(true);
      } catch (error) {
        alert(error.message);
      }
    };

    initializeApp();
  }, []);

  const componentDidCatch = (error, errorInfo) => {
    console.log("errrrrr", error);
    Crashlytics().log(error);
    Crashlytics().recordError(error);
  };

  const loadAssets = async () => {
    const fonts = Font.loadAsync({
      Poppins: require("./src/fonts/Inter-Regular.ttf"),
      PoppinsMedium: require("./src/fonts/Inter-Medium.ttf"),
      PoppinsThin: require("./src/fonts/Inter-Thin.ttf"),
      PoppinsBold: require("./src/fonts/Inter-Bold.ttf"),
      PoppinsSemiBold: require("./src/fonts/Inter-SemiBold.ttf"),
      PoppinsLight: require("./src/fonts/Inter-Light.ttf"),
      PoppinsExtraLight: require("./src/fonts/Inter-ExtraLight.ttf"),
    });

    const images = cacheImages([
      require("./src/images/splashscreen-logo.png"),
      require("./src/images/couple.png"),
      require("./src/images/user-icon.png"),
      require("./src/images/chat-icon.png"),
      require("./src/images/placeholder.png"),
      require("./src/images/how-to.png"),
    ]);

    await Promise.all([fonts, ...images]);
  };

  if (!assetsLoaded) {
    return null;
  }

  const linking = {
    prefixes: ["https://wavetodate.com"],
  };

  console.log(Constants.deviceName);

  return (
    <>
      <MenuProvider style={{ backgroundColor: "black", paddingBottom: "5%" }}>
        <Provider store={store}>
          <NavigationContainer linking={linking}>
            <AppNavigation />
          </NavigationContainer>
        </Provider>
      </MenuProvider>
    </>
  );
};
