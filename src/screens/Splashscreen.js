import React, { Component } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import * as Theme from "../libs/theme";

export default class SplashScreen extends Component {
  render() {
    return <Image source={require("../images/WGif.gif")} style={styles.logo} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.Colors.background,
  },
  logo: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
