import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";

const StopButton = () => {
  return (
    <View
      style={{ width: 88, height: 88, backgroundColor: "red", borderRadius: 8 }}
    ></View>
  );
};

export default ({ onPress, style, recording }) => {
  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        bottom: 90,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, style]}
        activeOpacity={0.8}
      >
        {recording ? (
          <StopButton />
        ) : (
          <Image
            source={require("../images/camera-button.png")}
            style={styles.image}
          />
        )}
      </TouchableOpacity>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 88,
    height: 88,
  },
  image: {
    width: 88,
    height: 88,
  },
});
