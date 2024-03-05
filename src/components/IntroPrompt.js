import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "./Text";
import * as THEME from "../libs/theme";

export default ({ prompt, onNext, closePrompt }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={closePrompt}
        style={{
          position: "absolute",
          zIndex: 99,
          top: 5,
          right: 30,
          padding: 5,
        }}
      >
        <Ionicons name="ios-close" size={35} color={THEME.Colors.primary} />
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        <View>
          <Text primary mediumItalic>
            Intro Prompt
          </Text>
          <Text white>{prompt}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={onNext}>
            <Text primary mediumItalic>
              Next >
            </Text>
          </TouchableOpacity>
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
    top: 40,
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
