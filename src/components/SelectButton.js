import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "./Text";

import * as THEME from "../libs/theme";

export default ({ selected, onPress, children, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, styles.button, selected ? styles.selected : {borderWidth:3,borderColor:'#2BBFC9'}]}
    >
      <Text
        regular
        size={45}
        color={!selected ? THEME.Colors.primary : THEME.Colors.white}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 26,
    width: 234,
    height: 102,
    borderWidth: 3,
    borderColor: THEME.Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#2BBFC9",
  },
});
