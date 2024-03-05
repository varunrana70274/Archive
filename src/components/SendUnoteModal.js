import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import Text from "./Text";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import * as THEME from "../libs/theme";

export default ({
  name,
  visibility,
  onRecordMessage,
  closeModal,
  onSendUnoteFromLibrary,
  onSendUnoteMessage,
  navigation,
}) => {
  const [textMode, setTextMode] = useState(false);
  const [content, setContent] = useState("");
  return (
    <Modal animationType="slideInDown" visible={visibility} transparent={true}>
      <View style={styles.container}>
        <Text thin center style={{ marginBottom: 20 }}>
          SEND {name} A UNOTE
        </Text>
        {textMode && (
          <View>
            <TextInput
              value={content}
              onChangeText={(text) => setContent(text)}
              placeholder="Write your message"
              multiline
              style={styles.textInput}
            />
          </View>
        )}
        {!textMode && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={onRecordMessage}
            >
              <FontAwesome
                size={32}
                name="video-camera"
                color={THEME.Colors.primary}
              />
              <Text primary style={{ marginTop: 20 }}>
                Record Message
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => {
                setTextMode(true);
              }}
            >
              <Ionicons
                size={32}
                name="ios-text"
                color={THEME.Colors.primary}
              />
              <Text primary style={{ marginTop: 20 }}>
                Send Message
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setTextMode(false);
              closeModal();
            }}
          >
            <Text thin>Cancel</Text>
          </TouchableOpacity>
          {textMode && (
            <TouchableOpacity
              onPress={() => {
                // setContent("");
                // setTextMode(false);
                onSendUnoteMessage(content);
              }}
            >
              <Text thin>Send Message</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.Colors.white,
    padding: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderColor: THEME.Colors.placeholder,
    borderWidth: 1,
    borderRadius: 5,
    height: 150,
    padding: 10,
  },
});
