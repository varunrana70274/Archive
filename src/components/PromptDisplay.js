import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "./Text";
import * as THEME from "../libs/theme";

export default ({ prompt }) => {
  console.log(prompt);
  if (prompt == null) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text primary mediumItalic>
            Intro Prompt
          </Text>
          <Text white>{prompt}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    top: 100,
  },
  innerContainer: {
    width: "90%",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});
