import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import Text from "../../../components/Text";
import * as THEME from "../../../libs/theme";
import API from "../../../libs/api";
 
export default class Terms extends Component {
  render() {
    return <WebView
    
    style={{flex:1,backgroundColor:'white'}}
    source={{ uri: "https://drive.google.com/viewerng/viewer?embedded=true&url="+`${API.baseUrl}/terms` }} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
