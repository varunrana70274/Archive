import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default ({ left, right, onPress }) => {
  const touchStyles = [
    styles.base,
    left ? styles.left : null,
    right ? styles.right : null,
  ];

  return (
    <TouchableWithoutFeedback onPress={onPress} style={styles.base}>
      <View style={touchStyles}></View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  base: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "5%",
    height: "100%",
    zIndex: 98,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
});
