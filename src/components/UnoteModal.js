import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Video } from "expo-av";
import Text from "./Text";

import { Ionicons } from "@expo/vector-icons";

import * as THEME from "../libs/theme";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

export default class UnoteModal extends Component {
  renderImage = () => {
    return <Image source={{ uri: this.props.media }} style={styles.image} />;
  };

  renderVideo = () => {
    return (
      <Video
        source={{ uri: this.props.media }}
        style={styles.video}
        shouldPlay={true}
        isLooping
      />
    );
  };

  renderText = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text white hero style={{ textAlign: "center" }}>
          {this.props.content}
        </Text>
      </View>
    );
  };

  render() {
    const { visible, type, media, onPress } = this.props;

    return (
      <Modal
        style={{ margin: 0, backgroundColor: THEME.Colors.primary }}
        visible={visible}
        transparent={true}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 30, right: 30, zIndex: 999 }}
          onPress={onPress}
        >
          <Ionicons name="ios-close" size={32} color="#000000" />
        </TouchableOpacity>
        {type == "video" && this.renderVideo()}
        {type == "text" && this.renderText()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: DEVICE_HEIGHT,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
