import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import Text from "../../../components/Text";
import * as THEME from "../../../libs/theme";

export default class ReportProble extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>ReportProble</Text>
      </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
