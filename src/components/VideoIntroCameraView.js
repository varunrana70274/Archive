import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Platform,
  Easing,
  Animated,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider";

import { setShowIntroToken } from "../libs/helpers";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MovToMp4 from "react-native-mov-to-mp4";
import { RNCamera as Camera } from "react-native-camera";
import Text from "./Text";
import * as THEME from "../libs/theme";
import IntroOverview from "./IntroOverview";
import IntroPrompt from "./IntroPrompt";
import { connect } from "react-redux";
import { updateUser } from "../actions";
import API from "../libs/api";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as Progress from "react-native-progress";
import { VideoManager } from "react-native-video-manager";
import Loading from "./Loading";

const prompts = [
  "What would your perfect date look like?",
  "What would your perfect day look like?",
  "What do you look for in your partner?",
];
const { height, width } = Dimensions.get("window");
const screenRatio = height / width;
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

const MAX_POINTS = 30;
let inter;
class MediaCameraView extends Component {
  constructor(props) {
    super(props);
    this.cameraRef = null;

    this.state = {
      loading: false,
      sliderVisible: false,
      timerReverse: 0,
      timer: 0,
      vodeosArray: [],
      isPaused: false,
      pausedArray: [],
      pointsDelta: 0,
      points: 1,
      isRatioSet: false,
      ratio: "4:3",
      recording: false,
      previewing: false,
      media: null,
      prompt: "",
      showPrompt: false,
      type: Camera.Constants.Type.back,
      flash: "off",
      timerActive: true,
      showOverviewModal: true,
      availableRecordingTime: 30,
      recordingTimeAvailable: 30,
      recordingTimeAvailable2: 30,
    };
    // this._circularProgressRef = React.createRef();
    // this._panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: (evt, gestureState) => true,
    //   onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    //   onMoveShouldSetPanResponder: (evt, gestureState) => true,
    //   onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    //   onPanResponderGrant: (evt, gestureState) => {
    //     this.setState({ isMoving: true, pointsDelta: 0 });
    //   },

    //   onPanResponderMove: (evt, gestureState) => {
    //     if (this._circularProgressRef.current) {
    //       this._circularProgressRef.current.animate(0, 0);
    //     }
    //     // For each 2 pixels add or subtract 1 point
    //     this.setState({ pointsDelta: Math.round(-gestureState.dy / 2) });
    //   },
    //   onPanResponderTerminationRequest: (evt, gestureState) => true,
    //   onPanResponderRelease: (evt, gestureState) => {
    //     // if (this._circularProgressRef.current) {
    //     //   this._circularProgressRef.current.animate(100, 3000);
    //     // }
    //     let points = this.state.points + this.state.pointsDelta;
    //     console.log(Math.min(points, MAX_POINTS));
    //     this.setState({
    //       isMoving: false,
    //       points: points > 0 ? Math.min(points, MAX_POINTS) : 0,
    //       pointsDelta: 0,
    //     });
    //   },
    // });
  }

  componentDidMount() {
    console.log('this.props',this.props.route);
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.setState({ flash: "off" });
      //   this.setState({
      //     vodeosArray: [],
      //   isPaused: false,
      //   pausedArray: [],
      //   pointsDelta: 0,
      //   points: 1,
      //   isRatioSet: false,
      //   ratio: '4:3',
      //   recording: false,
      //   previewing: false,
      //   media: null,
      //   prompt: "",
      //   showPrompt: false,
      //   type: Camera.Constants.Type.front,
      //   timerActive: true,
      //   showOverviewModal: true,
      //   availableRecordingTime: 30,
      //   recordingTimeAvailable: 30,
      //   });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  closeModal = () => {
    this.setState({ sliderVisible: false });
  };
  RecordButton = (onPress, isRecording) => {
    const fill = (this.state.points / MAX_POINTS) * 100;
    return (
      <View style={styles.buttonContainer}>
        {isRecording ? (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            // style={styles.stopButton}
          >
            {/* <AnimatedCircularProgress
  size={70}
  width={5}
  fill={100}
  tintColor="#00e0ff"
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" /> */}
            <AnimatedCircularProgress
              size={70}
              width={3}
              fill={fill}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            >
              {(fill) => null
              // <Text>
              //   { this.state.fill }
              // </Text>
              }
            </AnimatedCircularProgress>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              onPress();

              // this.interval2=setInterval(() => {
              //   this.setState({points:this.state.points+1})
              // }, 1000);
              // console.log(this.circularProgress);
              // thiss.circularProgress?.animate(100, 8000, Easing.quad); // Will fill the progress bar linearly in 8 seconds
            }}
            activeOpacity={0.9}
          >
            <Image
              source={require("../images/camera-button.png")}
              style={styles.recordButton}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  toggleRecording = () => {
    this.state.recording
      ? this.state.isPaused
        ? this.startRecording()
        : this.stopRecording()
      : this.startRecording();
  };

  startCameraTimer = () => {
    this.interval = setInterval(() => {
      this.setState(
        {
          recordingTimeAvailable: this.state.recordingTimeAvailable - 0.2,
          points: this.state.points + 0.2,
        },
        () => {
          console.log(
            "this.state.recordingTimeAvailable",
            this.state.recordingTimeAvailable
          );
          if (this.state.recordingTimeAvailable <= 0) {
            this.cameraRef.stopRecording();
            // this.stopRecording();
            this.setState({ recording: false });
            // this.stopCameraTimer();

            clearInterval(this.interval);
          }
        }
      );
    }, 200);
  };

  stopCameraTimer = () => {
    clearInterval(this.interval);
    clearInterval(this.interval2);
    this.setState({
      points: 1,
      recordingTimeAvailable: this.state.availableRecordingTime,
    });
  };

  startRecording = async () => {
    if (this.state.timerReverse == 0) {
      this.setState({ timerReverse: this.state.timer });
      if (this.state.timer == 0) {
        let media;
        if (this.state.isPaused) {
          this.startCameraTimer();
          this.cameraRef.resumePreview();
          this.setState({ isPaused: false });
        } else {
          this.setState({ recording: true });
          setTimeout(() => {
            console.log("this.circularProgress", this.circularProgress);
            this.circularProgress?.animate(100, 30000, Easing.quad); // Will fill the progress bar linearly in 8 seconds
          }, 2000);
          this.startCameraTimer();
        }
        // if(this.state.points==1){
        media =
          Platform.OS == "android"
            ? await this.cameraRef.recordAsync()
            : await this.cameraRef.recordAsync({
                quality: Camera.Constants.VideoQuality["2160p"],
                mirror: true,
              });
        let videos = [...this.state.vodeosArray];
        console.log("media", media, videos);
        videos.push(media.uri);
        this.setState({ vodeosArray: videos }, () => {
          if (this.state.recordingTimeAvailable <= 0) {
            this.stopCameraTimer();
            this.setState({ loading: true });
            if(this.state.vodeosArray.length>1){
              console.log('278');
            VideoManager.merge(this.state.vodeosArray).then(({ uri }) => {
              this.setState({ loading: false, flash: "off" });
              this.props.navigation.navigate("RecordingPreview", {
                end: 30,
                media: { uri },
                prompt: this.state.showPrompt ? this.state.prompt : "",
                pending: false,
                isAdditional:this.props?.route?.params?.isAdditional
              });
            }).catch((e)=>{
              console.log('eeee',e);
            });
          }
          else{
            this.setState({ loading: false, flash: "off" });
            this.props.navigation.navigate("RecordingPreview", {
              end: 30,
              media: { uri:this.state.vodeosArray[0] },
              prompt: this.state.showPrompt ? this.state.prompt : "",
              pending: false,
              isAdditional:this.props?.route?.params?.isAdditional
            });
          }
        }
        });
        

        // this.props.navigation.navigate("RecordingPreview", {
        //   media: media,
        //   prompt: this.state.showPrompt ? this.state.prompt : "",
        // });
        // }
        // this.props.onMediaRecorded(media);
      } else {
        clearInterval(inter);
        inter = setInterval(() => {
          this.setState({ timerReverse: this.state.timerReverse - 1 });
        }, 1000);
        setTimeout(async () => {
          this.setState({ timerReverse: 0 });
          clearInterval(inter);
          let media;
          if (this.state.isPaused) {
            this.startCameraTimer();
            this.cameraRef.resumePreview();
            this.setState({ isPaused: false });
          } else {
            this.setState({ recording: true });
            setTimeout(() => {
              console.log("this.circularProgress", this.circularProgress);
              this.circularProgress?.animate(100, 30000, Easing.quad); // Will fill the progress bar linearly in 8 seconds
            }, 2000);
            this.startCameraTimer();
          }
          // if(this.state.points==1){
          media =
            Platform.OS == "android"
              ? await this.cameraRef.recordAsync()
              : await this.cameraRef.recordAsync({
                  quality: Camera.Constants.VideoQuality["2160p"],
                  mirror: true,
                });
          let videos = [...this.state.vodeosArray];
          videos.push(media.uri);
          this.setState({ vodeosArray: videos }, () => {
            if (this.state.recordingTimeAvailable <= 0) {
              this.stopCameraTimer();
              this.setState({ loading: true });
              console.log('346');

              VideoManager.merge(this.state.vodeosArray).then(({ uri }) => {
                this.setState({ loading: false, flash: "off" });
                console.log("results", results, file);
                this.props.navigation.navigate("RecordingPreview", {
                  end: 30,
                  media: { uri },
                  prompt: this.state.showPrompt ? this.state.prompt : "",
                  pending: false,
                  isAdditional:this.props?.route?.params?.isAdditional
                });
              });
            }
          });

          // this.props.navigation.navigate("RecordingPreview", {
          //   media: media,
          //   prompt: this.state.showPrompt ? this.state.prompt : "",
          // });
          // }
          // this.props.onMediaRecorded(media);
        }, this.state.timer * 1000);
      }
    }
  };

  stopRecording = async () => {
    // this.setState({ recording: false });
    // this.stopCameraTimer();
    await this.cameraRef.stopRecording();
    this.setState({ isPaused: true });
    clearInterval(this.interval);
    let obj = [...this.state.pausedArray];

    obj.push({
      left:
        Dimensions.get("screen").width * 0.1 +
        ((Dimensions.get("screen").width * 0.8) / 30) * this.state.points,
    });
    this.setState({ pausedArray: obj });
  };

  chooseVideoFromGallery = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
    });

    if (!result.canceled) {
      // let formData = await this.buildFormData(result);
      console.log("formDataformData", result);
      this.setState({
        flash: "off",
        recordingTimeAvailable:
          this.state.recordingTimeAvailable -
          Math.round(result.duration / 1000),
      });
      this.props.navigation.navigate("RecordingPreview", {
        end: Math.round(result.duration) / 1000,
        media: { uri: result.uri },
        prompt: this.state.showPrompt ? this.state.prompt : "",
        pending: false,
        isAdditional:this.props?.route?.params?.isAdditional
        // recordingTimeAvailable:this.state.recordingTimeAvailable-Math.round(result.duration/1000)
      });
      // await this.handleUpload(formData);
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

      formData.append("video", {
        uri: path,
        name: `video.mp4`,
        type: `video/mp4`,
      });
    } else {
      formData.append("video", {
        uri: uri,
        type: "video/mp4",
        name: "video.mp4",
      });
    }
    // formData.append(
    //   "audio",''
    // )
    return formData;
  };

  handleUpload = (formData) => {
    API.uploadUserIntro(formData)
      .then(async (response) => {
        console.log("responseresponseresponse", response);
        await setShowIntroToken();
        let user = response.data.user;
        this.props.updateUser(user);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  render() {
    const fill = this.state.points / MAX_POINTS;

    const { hasPrompts } = this.props;
    const {
      recording,
      showPrompt,
      prompt,
      type,
      loading,
      recordingTimeAvailable,
      availableRecordingTime,
      flash,
    } = this.state;
    const { minutes, seconds } = getRemaining(
      Math.round(recordingTimeAvailable)
    );
    const {
      minutes: availableMinutes,
      seconds: availableSeconds,
    } = getRemaining(availableRecordingTime);
    const dimensions = Dimensions.get("window");
    const screenWidth = dimensions.width;
    const height = Math.round((screenWidth * 17) / 9);
    return loading ? (
      <Loading />
    ) : (
      <View style={styles.container}>
        {this.state.pausedArray.map((x, index) => {
          return (
            <View
              key={index}
              style={{
                position: "absolute",
                top: "5%",
                height: 10,
                width: 10,
                backgroundColor: "gray",
                zIndex: 99999999,
                left: x.left,
              }}
            />
          );
        })}
        {recording && (
          <Progress.Bar
            ref={(ref) => (this.barRef = ref)}
            onTouchMove={(x) => console.log(x.nativeEvent.locationX)}
            onLayout={(x) => console.log(x.nativeEvent.layout.x)}
            useNativeDriver={true}
            // animationOptions={{
            //   animationFunction: Animated.timing,
            //   config: { easing: Easing.linear },
            // }}
            progress={fill}
            // animationType='timing'
            unfilledColor="gray"
            color="#2BBFC9"
            borderWidth={0}
            borderColor="rgba(0,0,0,0.1)"
            borderRadius={10}
            height={10}
            width={Dimensions.get("screen").width * 0.8}
            style={{
              backgroundColor: "rgba(222,222,222,0.4)",
              position: "absolute",
              top: "5%",
              width: Dimensions.get("screen").width * 0.8,
              alignSelf: "center",
              zIndex: 9999,
            }}
          />
        )}
        {showPrompt && (
          <IntroPrompt
            closePrompt={() => this.setState({ showPrompt: false, prompt: "" })}
            prompt={prompt}
            onNext={() => {
              this.setState({ prompt: getRandomPrompt() });
            }}
          />
        )}

        {!showPrompt && (
          <TouchableOpacity
            onPress={() =>
              this.setState({ showPrompt: true, prompt: getRandomPrompt() })
            }
            style={{ zIndex: 99, position: "absolute", right: 24, top: 40 }}
          >
            <Ionicons
              name="ios-help-circle-outline"
              size={24}
              color={THEME.Colors.primary}
            />
          </TouchableOpacity>
        )}
        {(this.state.isPaused || !this.state.recording) && (
          <TouchableOpacity
            onPress={
              () => {
                this.setState({ sliderVisible: true });
                // setTimeout(() => {

                //   // this.toggleRecording()
                // }, 3000);
              }
              // this.setState({ showPrompt: true, prompt: getRandomPrompt() })
            }
            style={{ zIndex: 99, position: "absolute", right: 20, top: "15%" }}
          >
            <Image
              resizeMode={"contain"}
              style={{ height: 30, width: 30 }}
              source={require("../v3/Timer.png")}
            />
          </TouchableOpacity>
        )}
        {(this.state.isPaused || !this.state.recording) && (
          <TouchableOpacity
            onPress={
              () => {}
              // this.setState({ showPrompt: true, prompt: getRandomPrompt() })
            }
            style={{ zIndex: 99, position: "absolute", right: 20, top: "25%" }}
          >
            <Image
              resizeMode={"contain"}
              style={{ height: 30, width: 30 }}
              source={require("../v3/Filter.png")}
            />
          </TouchableOpacity>
        )}
        {(this.state.isPaused || !this.state.recording) && (
          <TouchableOpacity
            onPress={
              () => {
                if (this.state.flash == "off")
                  this.setState({ flash: "torch" });
                else this.setState({ flash: "off" });
              }
              // this.setState({ showPrompt: true, prompt: getRandomPrompt() })
            }
            style={{ zIndex: 99, position: "absolute", right: 20, top: "35%" }}
          >
            <Ionicons
              name={this.state.flash == "off" ? "flash-off" : "flash"}
              size={24}
              color="white"
            />
            {/* <Image
              resizeMode={"contain"}
              style={{ height: 30, width: 30 }}
              source={require("../v3/Flashon.png")}
            /> */}
          </TouchableOpacity>
        )}

        {this.state.isPaused && this.state.vodeosArray.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              try {
                if(this.state.vodeosArray.length>1){
                this.setState({ loading: true });
                VideoManager.merge(this.state.vodeosArray).then(({ uri }) => {
                  this.setState({ loading: false, flash: "off" });
                  this.props.navigation.navigate("RecordingPreview", {
                    media: { uri },
                    prompt: this.state.showPrompt ? this.state.prompt : "",
                    pending: true,
                    end: 30 - this.state.recordingTimeAvailable,
                    isAdditional:this.props?.route?.params?.isAdditional
                  });
                });
              }
              else{
                this.setState({ loading: false, flash: "off" });
                this.props.navigation.navigate("RecordingPreview", {
                  media: { uri:this.state.vodeosArray[0] },
                  prompt: this.state.showPrompt ? this.state.prompt : "",
                  pending: true,
                  end: 30 - this.state.recordingTimeAvailable,
                  isAdditional:this.props?.route?.params?.isAdditional
                });
              }
              } catch (e) {
                console.log(e);
              }
            }}
            style={{
              paddingHorizontal: 20,
              borderRadius: 10,
              paddingVertical: 10,
              zIndex: 99,
              backgroundColor: THEME.Colors.primary,
              position: "absolute",
              alignSelf: "center",
              bottom: "25%",
            }}
          >
            <Text white>Preview</Text>
          </TouchableOpacity>
        )}

        <Camera
          flashMode={flash}
          ratio="16:9"
          ref={(ref) => (this.cameraRef = ref)}
          type={type}
          style={
            Platform.OS == "android"
              ? {
                  height: height,
                  width: "100%",
                }
              : styles.camera
          }
        >
          {/* <RecordButton
          thiss={this}
            onPress={this.toggleRecording}
            isRecording={recording}
          /> */}
          {this.RecordButton(this.toggleRecording, recording)}
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

          {!this.state.recording && (
            <TouchableOpacity
              style={{ position: "absolute", left: 50, bottom: 100 }}
              onPress={this.chooseVideoFromGallery}
            >
              <MaterialIcons
                name="photo"
                size={32}
                color={THEME.Colors.primary}
              />
            </TouchableOpacity>
          )}
          {(this.state.isPaused || !this.state.recording) && (
            <TouchableOpacity
              style={{ position: "absolute", right: 50, bottom: 100 }}
              onPress={() =>
                this.setState({
                  type:
                    this.state.type == Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                })
              }
            >
              <Image
                style={{
                  height: 32,
                  width: 32,
                  tintColor: THEME.Colors.primary,
                }}
                source={require("../images/switchC.png")}
              />
            </TouchableOpacity>
          )}
        </Camera>
        <IntroOverview
          visible={this.state.showOverviewModal}
          onClose={() => this.setState({ showOverviewModal: false })}
        />
        {this.state.timerReverse > 0 ? (
          <Animated.Text
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              zIndex: 99999,
              fontSize: 30,
              color: "white",
              fontFamily: THEME.FontFamily.bold,
            }}
          >
            {this.state.timerReverse}
          </Animated.Text>
        ) : null}
        <Modal
          visible={this.state.sliderVisible}
          animationType="slide"
          transparent
          onRequestClose={() => this.closeModal()}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={{ height: "25%", backgroundColor: "white" }}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                onValueChange={(val) => this.setState({ timer: val })}
                maximumValue={10}
                value={this.state.timer}
                step={1}
                maximumTrackTintColor="gray"
                minimumTrackTintColor={THEME.Colors.primary}
              />
              <Text center>{this.state.timer}</Text>

              <TouchableOpacity
                onPress={() => {
                  this.closeModal();
                }}
                style={{
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  paddingVertical: 10,
                  zIndex: 99,
                  backgroundColor: THEME.Colors.primary,
                  position: "absolute",
                  alignSelf: "center",
                  bottom: "25%",
                }}
              >
                <Text white>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: {
    flex: 1,
    // resizeMode:'cover'
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
  slider: {
    alignSelf: "center",
    width: "90%",
    height: 40,
  },
});

export default connect(null, { updateUser })(MediaCameraView);
