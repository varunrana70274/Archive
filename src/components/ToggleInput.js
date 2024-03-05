import React from "react";
import Text from "./Text";
import * as THEME from "../libs/theme";
import { View, StyleSheet, Switch } from "react-native";

export default ({ title, subtitle, value, onChange }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{title}</Text>
        {subtitle && <Text>{subtitle}</Text>}
      </View>
      <View style={styles.switchContainer}>
        <Switch value={value} onValueChange={onChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.Colors.white,
    padding: 10,
    flexDirection: "row",
    marginBottom: 1,
  },
  switchContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
