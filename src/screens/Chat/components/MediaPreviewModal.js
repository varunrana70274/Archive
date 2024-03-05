import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Video } from "expo-av";
import * as Theme from "../../../libs/theme";

export default ({ visible, path, type, onHideMedia }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Modal style={styles.modal} visible={visible} transparent={true}>
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.closeButton}
            onPress={() => {
              setLoaded(false);
              onHideMedia();
            }}
          >
            <Ionicons name="ios-close" color={Theme.Colors.primary} size={35} />
          </TouchableOpacity>
          {!loaded && (
            <View
              style={{
                position: "absolute",
                zIndex: 99,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          )}
          {type == "photo" && (
            <Image
              source={{ uri: path }}
              resizeMode="cover"
              style={styles.image}
              onLoad={() => setLoaded(true)}
            />
          )}
          {type == "video" && (
            <Video
              source={{ uri: path }}
              resizeMode="cover"
              style={styles.image}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              onLoad={() => setLoaded(true)}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  container: {
    overflow: "hidden",
    borderRadius: 10,
    height: "75%",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    padding: 20,
    position: "absolute",
    zIndex: 99,
  },
});
