import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../../../components/Text";
import { WebView } from "react-native-webview";
import * as THEME from "../../../libs/theme";

export default class HelpCenter extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: "https://wavedating.freshdesk.com/support/home",
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 