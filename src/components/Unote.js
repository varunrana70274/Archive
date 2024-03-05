import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import * as THEME from "../libs/theme";

export default ({ avatar, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={0.9}
    onPress={onPress}
  >
    <Image source={{ uri: avatar }} style={styles.avatar} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 140,
    right: 10,
  },
  avatar: {
    borderRadius: 73 / 2,
    borderWidth: 2,
    borderColor: THEME.Colors.primary,
    width: 73,
    height: 73,
  },
});
