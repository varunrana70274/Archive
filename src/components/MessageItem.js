import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Video } from "expo-av";

import Text from "./Text";
import * as THEME from "../libs/theme";

export default ({ userId, avatar, message, onShowMedia }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <View style={styles.container}>
      {userId != message.user.id && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        {!loaded && message.type != null && (
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
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
        {console.log('userId == message.user.id',userId, message.user.id)}
        {message.message !== "" && (
          <View
            style={[
              styles.messageContainer,
              userId == message.user.id ? styles.senderBg : styles.recipientBg,
            ]}
          >
            <Text>{message.message}</Text>
          </View>
        )}
        {message.original_path && (
          <TouchableOpacity
            style={[
              styles.mediaContainer,
              userId == message.user.id ? styles.senderBg : styles.recipientBg,
              message.message ? styles.mediaWithMessage : null,
            ]}
            onPress={() => {
              onShowMedia(message.original_path, message.type);
            }}
          >
            {message.type == "photo" && (
              <Image
                source={{ uri: message.original_path }}
                resizeMode="cover"
                style={styles.media}
                onLoad={() => {
                  setLoaded(true);
                }}
              />
            )}

            {message.type == "video" && (
              <Video
                source={{ uri: message.original_path }}
                style={styles.media}
                isLooping
                shouldPlay
                isMuted={true}
                onReadyForDisplay={() => {
                  setLoaded(true);
                }}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  imageContainer: {justifyContent:'center'},
  messageContainer: {
    flex: 1,
    padding: 15,
    marginLeft: 18,
  },
  mediaWithMessage: {
    marginTop: 20,
  },
  mediaContainer: {
    marginLeft: 18,
    padding: 20,
  },
  media: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
  senderBg: {
    backgroundColor: "#2BBFC9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  recipientBg: {
    backgroundColor: "#D3D3D3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
