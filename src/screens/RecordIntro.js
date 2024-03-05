import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";

import { Camera } from "expo-camera";
import MovToMp4 from "react-native-mov-to-mp4";
import Text from "../components/Text";
import CameraButton from "../components/CameraButton";
import IntroOverview from "../components/IntroOverview";
import IntroPrompt from "../components/IntroPrompt";
import { Video } from "expo-av";

import API from "../libs/api";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const prompts = [
  "What would your perfect date look like?",
  "What would your perfect day look like?",
  "What do you look for in your partner?",
];

const getRandomPrompt = () => {
  let index = Math.floor(Math.random() * prompts.length);
  return prompts[index];
};

class RecordIntro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermissions: null,
      type: Camera.Constants.Type.front,
      recording: false,
      previewing: false,
      media: null,
      showOverviewModal: true,
      prompt: getRandomPrompt(),
    };

    this.cameraRef = null;
  }

  uploadIntroVideo = async () => {
    if (Platform.OS == "ios") {
      const filename = Date.now().toString();
      let path =
        "file://" +
        (await MovToMp4.convertMovToMp4(
          result.uri.replace("file://", ""),
          filename
        ));
      console.log("pathpath5", path, result.uri);
      formData.append("video", {
        name: "video.mp4",
        uri: path,
        type: "video/mp4",
      });
    } else {
      const uri = result.uri;

      formData.append("video", { uri: uri, type: "video/mp4" });
    }

    API.uploadUserIntro(formData)
      .then((response) => {
        let user = response.data.user;
        this.props.updateUser(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermissions: status === "granted" });
  }

  startRecording = async () => {
    this.setState({ recording: true });

    const recording = await this.cameraRef.recordAsync({
      quality: Camera.Constants.VideoQuality["2160p"],
      mirror: true,
    });

    this.props.navigation.push("RecordingPreview", {
      media: recording,
    });
  };

  stopRecording = async () => {
    await this.cameraRef.stopRecording();
    this.setState({ recording: false });
  };

  toggleRecording = async () => {
    const { recording } = this.state;

    return recording ? this.stopRecording() : this.startRecording();
  };

  render() {
    if (this.state.hasPermission === null) {
      return <View />;
    }

    if (this.state.hasPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
        </View>
      );
    }

    if (this.state.previewing) {
      return (
        <View style={styles.container}>
          <Video
            source={{ uri: this.state.media.uri }}
            style={styles.video}
            isLooping
          />
          <TouchableOpacity activeOpacity={0.8} onPress={uploadIntroVideo}>
            <Text>Upload Video</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <IntroPrompt
            prompt={this.state.prompt}
            onNext={() => {
              this.setState({ prompt: getRandomPrompt() });
            }}
          />
          <Camera
            ref={(ref) => {
              this.cameraRef = ref;
            }}
            type={this.state.type}
            videoStabilizationMode={Camera.Constants.VideoStabilization.off}
            style={styles.cameraView}
          >
            <CameraButton onPress={this.toggleRecording} />
          </Camera>
          <IntroOverview
            visible={this.state.showOverviewModal}
            onClose={() => this.setState({ showOverviewModal: false })}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cameraView: { flex: 1 },
  video: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
});

export default RecordIntro;
