import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as Theme from "../libs/theme";

export default class SplashScreen extends Component {
  render() {
    return (
      // <SafeAreaView style={styles.container}>
        <ImageBackground
        style={styles.container}
        source={require('../images/splashscreen_bg.png')}
        >

        <Image
        resizeMode='contain'
          source={require("../images/v2/wlogoicon.png")}
          style={styles.logo}
          />
        <ActivityIndicator size="large" color="#FFFFFF" />
          </ImageBackground>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: Theme.Colors.primary,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom:20
  },
});
