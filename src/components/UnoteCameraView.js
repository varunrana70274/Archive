import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MovToMp4 from "react-native-mov-to-mp4";
import { Camera } from "expo-camera";
import Text from "./Text";
import * as THEME from "../libs/theme";
import IntroPrompt from "./IntroPrompt";
import API from "../libs/api";

const prompts = [
  "What would your perfect date look like?",
  "What would your perfect day look like?",
  "What do you look for in your partner?",
];

const getRandomPrompt = () => {
  let index = Math.floor(Math.random() * prompts.length);
  return prompts[index];
};

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { minutes: formatNumber(mins), seconds: formatNumber(secs) };
};

const RecordButton = ({ onPress, isRecording }) => {
  return (
    <View style={styles.buttonContainer}>
      {isRecording ? (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          style={styles.stopButton}
        ></TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image
            source={require("../images/camera-button.png")}
            style={styles.recordButton}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

class UnoteCameraView extends Component {
  constructor(props) {
    super(props);

    this.cameraRef = null;

    this.state = {
      recording: false,
      previewing: false,
      media: null,
      prompt: getRandomPrompt(),
      showPrompt: false,
      type: Camera.Constants.Type.front,
      timerActive: true,
      showOverviewModal: true,
      availableRecordingTime: 30,
      recordingTimeAvailable: 30,
    };
  }

  async componentDidMount() {
    let permissionResult = await Camera.requestPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Wave doesn't have access to your camera");
      return;
    }
  }

  toggleRecording = () => {
    this.state.recording ? this.stopRecording() : this.startRecording();
  };

  startCameraTimer = () => {
    this.interval = setInterval(() => {
      this.setState(
        { recordingTimeAvailable: this.state.recordingTimeAvailable - 1 },
        () => {
          if (this.state.recordingTimeAvailable == 0) {
            this.stopCameraTimer();
            this.stopRecording();
          }
        }
      );
    }, 1000);
  };

  stopCameraTimer = () => {
    clearInterval(this.interval);
    this.setState({
      recordingTimeAvailable: this.state.availableRecordingTime,
    });
  };

  startRecording = async () => {
    this.setState({ recording: true });
    this.startCameraTimer();
    const media = await this.cameraRef.recordAsync({
      quality: Camera.Constants.VideoQuality["2160p"],
      mirror: true,
    });
    this.props.navigation.navigate("UnoteCameraPreview", {
      media: media,
      prompt: this.state.showPrompt ? this.state.prompt : "",
      recipient_id: this.props.route.params.recipient_id,
    });
    // this.props.onMediaRecorded(media);
  };

  stopRecording = async () => {
    this.setState({ recording: false });
    this.stopCameraTimer();
    await this.cameraRef.stopRecording();
  };

  chooseVideoFromGallery = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      let formData = await this.buildFormData(result);

      await this.handleUpload(formData);
    }
  };

  buildFormData = async (result) => {
    let formData = new FormData();

    const uri = result.uri;
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    if (Platform.OS == "ios") {
      const filename = Date.now().toString();
      let path =
        "file://" +
        (await MovToMp4.convertMovToMp4(
          result.uri.replace("file://", ""),
          filename
        ));
      console.log("pathpathpath", path, result.uri);
      formData.append("media", {
        uri: path,
        name: `video.mp4`,
        type: `video/mp4`,
      });
    } else {
      formData.append("media", {
        uri: uri,
        type: "video/mp4",
        name: "video.mp4",
      });
    }

    return formData;
  };

  handleUpload = (formData) => {
    API.sendUnote(this.props.route.params.recipient_id, formData)
      .then((response) => {
        this.props.navigation.navigate("Explore");
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  render() {
    const { hasPrompts } = this.props;
    const {
      recording,
      showPrompt,
      prompt,
      type,
      recordingTimeAvailable,
      availableRecordingTime,
    } = this.state;
    const { minutes, seconds } = getRemaining(recordingTimeAvailable);
    const {
      minutes: availableMinutes,
      seconds: availableSeconds,
    } = getRemaining(availableRecordingTime);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 9999,
            top: 30,
            left: 20,
            padding: 10,
          }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons name="ios-close" size={30} color={THEME.Colors.primary} />
        </TouchableOpacity>

        {showPrompt && (
          <IntroPrompt
            closePrompt={() => this.setState({ showPrompt: false })}
            prompt={prompt}
            onNext={() => {
              this.setState({ prompt: getRandomPrompt() });
            }}
          />
        )}

        {!showPrompt && (
          <TouchableOpacity
            onPress={() => this.setState({ showPrompt: true })}
            style={{ zIndex: 99, position: "absolute", right: 20, top: 40 }}
          >
            <Ionicons
              name="ios-help-circle-outline"
              size={24}
              color={THEME.Colors.primary}
            />
          </TouchableOpacity>
        )}
        <Camera
          ref={(ref) => (this.cameraRef = ref)}
          type={type}
          style={styles.camera}
        >
          <RecordButton
            onPress={this.toggleRecording}
            isRecording={recording}
          />
          <View
            style={{
              position: "absolute",
              bottom: 10,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text white>
              {`${minutes}:${seconds}`} /
              {`${availableMinutes}:${availableSeconds}`}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{ position: "absolute", left: 50, bottom: 100 }}
            onPress={this.chooseVideoFromGallery}
          >
            <MaterialIcons
              name="photo"
              size={32}
              color={THEME.Colors.primary}
            />
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: {
    flex: 1,
  },
  stopButton: {
    width: 44,
    height: 44,
    backgroundColor: "red",
    borderRadius: 8,
  },
  recordButton: {
    width: 88,
    height: 88,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 90,
    alignItems: "center",
  },
});

export default UnoteCameraView;
