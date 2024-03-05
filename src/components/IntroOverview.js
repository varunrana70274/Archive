import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "./Text";

export default ({ onClose, visible }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      backdropColor="rgba(0,0,0,0.2)"
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="ios-close" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5, marginTop: "14%" }}>
          <Text color="#FFFFFF" hero>
            Record an introduction video
          </Text>
          <Text color="#FFFFFF" style={{ marginTop: "20%", fontSize: 18 }}>
            This video will be showcased as your primary video so make sure you
            stand out!
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 36,
    backgroundColor: "rgba(0,0,0,0.8)",
    // position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center",
  },
});
