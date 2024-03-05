import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import * as THEME from "../libs/theme";

import Text from "./Text";

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text primary center medium large>
          All Waved Out
        </Text>
        <Text white center size={18}>
          Fetching more matches!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {},
});
