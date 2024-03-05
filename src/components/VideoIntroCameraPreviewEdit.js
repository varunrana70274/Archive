import React, { Component } from "react";
import { Audio } from "expo-av";
import MovToMp4 from "react-native-mov-to-mp4";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { setShowIntroToken } from "../libs/helpers";
import Text from "./Text";
import API from "../libs/api";
import { connect } from "react-redux";
import { updateUser } from "../actions";
import { VideoPlayer, Trimmer } from "react-native-video-processing";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import Button from "./Button";
import AudioRecord from "react-native-audio-record";
import { Colors } from "../libs/theme";
import * as THEME from "../libs/theme";

import Slider from "@react-native-community/slider";
import Loading from "./Loading";
import { DragTextEditor } from "react-native-drag-text-editor";
import { RNVoiceRecorder } from "react-native-voice-recorder";
import IntroPrompt from "./IntroPrompt";
// import { LogLevel, RNFFmpeg } from "react-native-ffmpeg";

// import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
// const audioRecorderPlayer = new AudioRecorderPlayer();

class VideoIntroCameraEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x:0,
      y:0,
      loading: false,
      voloumeVideo: 1.0,
      originalVolume: 1,
      customVolume: 1,
      soundEdit: false,
      text: "",
      textEnable: false,
      audioFile: "",
      vPlay: true,
      startTimer: 0,
      endTimer: props.route.params.end,
      audionAdded: false,
      play: false,
      media: null,
      prompt: null,
      currentTime: 0,
      audioClick: false,
      paused: false,
      newFile: null,
    };
    this.AudioRecorder = new Audio.Recording();
    this.AudioPlayer = new Audio.Sound();
    // audioRecorderPlayer = new AudioRecorderPlayer();
  }

  GetPermission = async () => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    })
      .then((res) => {
        console.log("ressssss", res);
      })
      .catch((e) => {
        console.log("eeeeeee", e);
      });
    const getAudioPerm = await Audio.requestPermissionsAsync();
    console.log("getAudioPerm", getAudioPerm);
    // SetAudioPermission(getAudioPerm.granted);
  };

  // Function to stop recording
  StopRecording = async () => {
    try {
      // Stop recording
      await this.AudioRecorder.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = this.AudioRecorder.getURI();
      console.log("uriiiii", result);
      if (result) {
        this.setState({ audioFile: result });
      }

      // Reset the Audio Recorder
      this.AudioRecorder = new Audio.Recording();
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      })
        .then((res) => {
          console.log("ressssss", res);
        })
        .catch((e) => {
          console.log("eeeeeee", e);
        });
      // SetIsRecording(false);
    } catch (error) { }
  };

  // Function to play the recorded audio
  PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await this.AudioPlayer.loadAsync(
        { uri: this.state.audioFile },
        { volume: this.state.customVolume, shouldCorrectPitch: true },
        true
      );

      // Get Player Status
      const playerStatus = await this.AudioPlayer.getStatusAsync();
      console.log("playerStatus", playerStatus);
      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        this.setState({
          paused: false,
          play: false,
          audioClick: false,
          vPlay: false,
        });
        if (playerStatus.isPlaying === false) {
          this.AudioPlayer.playAsync();
          // SetIsPLaying(true);
        }
      }
    } catch (error) {
      console.log("errrrr", error);
    }
  };

  // Function to stop the playing audio
  StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await this.AudioPlayer.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true) {
        // this.setState({ audionAdded: false, newFile: null,audioFile: ''})

        await this.AudioPlayer.unloadAsync();
      }
      // SetIsPLaying(false);
    } catch (error) { }
  };
  // Function to stop the playing audio
  removePlaying = async () => {
    this.setState({
      soundEdit: false,
      endTimer: this.props.route.params.end,
      startTimer: 0,
    });
    try {
      //Get Player Status
      const playerStatus = await this.AudioPlayer.getStatusAsync();
      console.log("playerStatusplayerStatus", playerStatus);
      // If song is playing then stop it
      //       if (playerStatus.isLoaded === true)
      // {
      this.setState({
        vPlay: true,
        audionAdded: false,
        audioClick: false,
        play: false,
        paused: false,
        newFile: null,
        audioFile: "",
      });

      await this.AudioPlayer.unloadAsync();
      // }
      // SetIsPLaying(false);
    } catch (error) {
      console.log("errrrrrr", error);
    }
  };

  StartRecording = async () => {
    this.StopRecording();
    // Check if user has given the permission to record
    try {
      // Prepare the Audio Recorder
      await this.AudioRecorder.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      // Start recording
      await this.AudioRecorder.startAsync();
      this.setState({ vPlay: false, paused: true });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    console.log(
      "this.props.route.params.end",
      this.props.route?.params?.screen
    );
    setTimeout(() => {
      // this.trimVideo()

      this.setState({ endTimer: this.props.route.params.end });
    }, 100);
    // setTimeout(() => {

    //   // console.log('this.videoPlayerRef',this.videoPlayerRef);
    // }, 5000);
    this.AudioPlayer?._eventEmitter?.addListener(
      "didUpdatePlaybackStatus",
      (sts) => {
        console.log("stsssss", sts.status);
        if (sts.status?.shouldPlay == false) {
          this.StopPlaying();
          this.setState({ audioClick: true, play: true });
        }
      }
    );

    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 8, // 8 or 16, default 16
      // audioSource: 6 // android only (see below)
      // wavFile: 'test.wav' // default 'audio.wav'
    };

    AudioRecord.init(options);
    this.setState({
      media: this.props.route.params.media,
      prompt: this.props.route.params.prompt,
      currentTime: 0,
    });
  }

  uploadIntroVideo = async () => {
    let formData = new FormData();
    if (Platform.OS == "ios") {
      const filename = Date.now().toString();
      let path =
        "file://" +
        (await MovToMp4.convertMovToMp4(
          this.state.media.uri.replace("file://", ""),
          filename
        ));
      console.log("pathpathpath10", path, this.state.media.uri);
      formData.append("video", {
        name: "video.mp4",
        uri: path,
        type: "video/mp4",
      });
      this.state.audioFile
        ? formData.append("audio", {
          name: Math.random() + "audio.mp3",
          uri: this.state.audioFile,
          type: "audio/mp3",
        })
        : null;
    } else {
      const uri = this.state.media?.uri;
      Platform.OS == "android"
        ? formData.append("video", {
          uri: uri,
          type: "video/mp4",
          name: "video.mp4",
        })
        : formData.append("video", { uri: uri, type: "video/mp4" });
      this.state.audioFile
        ? Platform.OS == "android"
          ? formData.append("audio", {
            uri: this.state.audioFile,
            type: "video/mp3",
            name: Math.random() + "audio.mp3",
          })
          : formData.append("audio", {
            uri: this.state.audioFile,
            type: "audio/mp3",
          })
        : null;
    }

    formData.append("prompt", this.state.prompt);
    formData.append("promptText", this.state.prompt);
    formData.append("x", this.state.x);
    formData.append("y", this.state.y);
    formData.append("text", this.state.text);
    // if(this.state.text){
    //   formData.append("video_text", this.state.text);
    // }
    console.log("lfdsfkksdfhsfsdhfhh", this.props.route.params);
    this.setState({ loading: true });
    if(!this.props.route.params.isAdditional){
    API.uploadUserIntro(formData)
      .then(async (response) => {
        console.log("response", response);
        if (this.props.route?.params?.screen == "edit") {
          this.props.navigation.navigate("EditProfile");
        } else {
          await setShowIntroToken();
        }
        let user = response.data.user;
        this.props.updateUser(user);
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
    }
    else{
      let formData = new FormData();
      if (Platform.OS == "ios") {
        const filename = Date.now().toString();
        let path =
          "file://" +
          (await MovToMp4.convertMovToMp4(
            this.state.media.uri.replace("file://", ""),
            filename
          ));
  console.log('pathpathpath2',path,this.state.media.uri);
        formData.append("media", {
          name: "video.mp4",
          uri: path,
          type: "video/mp4",
        });
  
        formData.append("prompt", this.state.prompt);
      } else {
        const uri = this.state.media.uri;
  
        formData.append("media", { uri: uri, type: "video/mp4" });
        formData.append("prompt", this.state.prompt);
      }
      formData.append("promptText", this.state.prompt);
    formData.append("x", this.state.x);
    formData.append("y", this.state.y);
    formData.append("text", this.state.text);
    this.state.audioFile
    ? formData.append("audio", {
      name: Math.random() + "audio.mp3",
      uri: this.state.audioFile,
      type: "audio/mp3",
    })
    : null;
    this.handleUpload(formData)
    }
  };

  handleUpload = (formData) => {
    API.uploadProfileMedia(formData)
      .then((response) => {
        let user = response.data.user;
        this.props.updateUser(user);
        this.props.navigation.navigate("EditProfile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  trimVideo() {
    console.log("this.videoPlayerRef", this.videoPlayerRef);
    const options = {
      startTime: 0,
      endTime: this.props.route.params.end,
      quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
      saveToCameraRoll: true, // default is false // iOS only
      saveWithCurrentDate: true, // default is false // iOS only
    };
    this.videoPlayerRef
      .trim(options)
      ?.then((newSource) => console.log("hhhhb", newSource))
      .catch((e) => console.log("kkkkkkkkkk"));
  }

  compressVideo() {
    const options = {
      width: 720,
      height: 1280,
      bitrateMultiplier: 3,
      saveToCameraRoll: true, // default is false, iOS only
      saveWithCurrentDate: true, // default is false, iOS only
      minimumBitrate: 300000,
      removeAudio: true, // default is false
    };
    this.videoPlayerRef
      .compress(options)
      .then((newSource) => console.log(newSource))
      .catch(console.warn);
  }

  getPreviewImageForSecond(second) {
    const maximumSize = { width: 640, height: 1024 }; // default is { width: 1080, height: 1080 } iOS only
    this.videoPlayerRef
      .getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
      .then((base64String) =>
        console.log("This is BASE64 of image", base64String)
      )
      .catch(console.warn);
  }

  getVideoInfo() {
    this.videoPlayerRef
      .getVideoInfo()
      .then((info) => console.log(info))
      .catch(console.warn);
  }

  render() {
    const { media, loading, textEnable, text } = this.state;
    const viewComponent = () => <View onLayout={e=>{
      e.target.measure((x, y, width, height, pageX, pageY) => {
        console.log(
          "x, y, width, height, pageX, pageY==>",
          x,
          y,
          width,
          height,
          pageX,
          pageY
        );
      });
    }} style={styles.cornerStyles} />;
    const _cornerComponent = [
      {
        side: "TR",
        customCornerComponent: () => viewComponent(),
      },
    ];
    const _rotateComponent = {
      side: "bottom",
      customRotationComponent: () => viewComponent(),
    };

    const _resizerSnapPoints = ["right", "left"];
    return loading ? (
      <Loading />
    ) : (
      <View style={[styles.container]}>
         {this.state.prompt && (
          <IntroPrompt
            closePrompt={() => {}}
            prompt={this.state.prompt}
            onNext={() => {
              // this.setState({ prompt: getRandomPrompt() });
            }}
          />
        )}
        {!this.state.audionAdded ? (
          <>
            {
              <TouchableOpacity
                onPress={
                  () => { }
                  // this.setState({ showPrompt: true, prompt: getRandomPrompt() })
                }
                style={{ zIndex: 99, position: "absolute", right: 20, top: 40 }}
              >
                <Image
                  resizeMode={"contain"}
                  style={{ height: 34, width: 34 }}
                  source={require("../v3/Filter.png")}
                />
              </TouchableOpacity>
            }
            {this.props.route.params.pending == true && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.pop(2);
                }}
                style={{
                  zIndex: 99,
                  position: "absolute",
                  right: 24,
                  top: "12%",
                }}
              >
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={24}
                  color={"white"}
                />
                <Text center size={6} white>
                  Add clip
                </Text>
              </TouchableOpacity>
            )}
            {
              <TouchableOpacity
                onPress={() => {
                  this.setState({ textEnable: !textEnable });
                }}
                style={{
                  zIndex: 99,
                  position: "absolute",
                  right: 24,
                  top: this.props.route.params.pending == true ? "20%" : "12%",
                }}
              >
                <MaterialCommunityIcons
                  name="format-text"
                  size={24}
                  color={"white"}
                  style={{ alignSelf: "center" }}
                />
                <Text center size={6} white>
                  Insert text
                </Text>
              </TouchableOpacity>
            }
            {
              <TouchableOpacity
                onPress={() => {
                  this.setState({vPlay:false})
                  RNVoiceRecorder.Record({
                    onDone: (path) => {
                      console.log('path',path);
                      this.setState({ audioFile: 'file:///'+path,audioClick:true,soundEdit:true,play:true,audionAdded:true,vPlay:true });
                      // RNVoiceRecorder.Play(path)
                    },
                    
                    onCancel: () => {
                      this.setState({vPlay:true})
                    }
                  })
                  // this.setState({ audioClick: !this.state.audioClick });
                }}
                style={{
                  zIndex: 99,
                  position: "absolute",
                  right: 24,
                  top: this.props.route.params.pending == true ? "28%" : "20%",
                }}
              >
                <MaterialIcons
                  name="settings-voice"
                  size={24}
                  color={"white"}
                  style={{ alignSelf: "center" }}
                />
                <Text center size={6} white>
                  Add sound
                </Text>
              </TouchableOpacity>
            }
          </>
        ) : (
          <TouchableOpacity
            onPress={
              () => {
                this.setState({ soundEdit: !this.state.soundEdit });
              }
              // this.setState({ showPrompt: true, prompt: getRandomPrompt() })
            }
            style={{ zIndex: 99, position: "absolute", right: 20, top: 40 }}
          >
            <AntDesign name="sound" size={24} color={"white"} />
            <Text center size={6} white>
              Edit volumes
            </Text>
            {/* sound */}
          </TouchableOpacity>
        )}
        {/* {media && (
          <Video
          resizeMode='cover'
            style={styles.video}
            isLooping={true}
            shouldPlay={true}
            source={{ uri: media?.uri }}
          />
        )} */}
        {/* camera-plus-outline */}
        {media?.uri && (
          <View style={{flex:1}}>
          <VideoPlayer
          resizeMode={VideoPlayer.Constants.resizeMode.COVER}
          volume={this.state.voloumeVideo}
            startTime={this.state.startTimer} // seconds
            endTime={this.state.endTimer}
            play={this.state.vPlay}
            ref={(ref) => (this.videoPlayerRef = ref)}
            // startTime={30}  // seconds
            // endTime={120}   // seconds
            replay={true} // should player play video again if it's ended
            rotate={true} // use this prop to rotate video if it captured in landscape mode iOS only
            source={this.state.newFile ? this.state.newFile : media?.uri}
            playerWidth={Dimensions.get("screen").width} // iOS only
            playerHeight={Dimensions.get("screen").height} // iOS only
            style={{ height: 100, width: Dimensions.get("screen").width }}
            onChange={({ nativeEvent }) =>
              this.setState({ currentTime: nativeEvent.currentTime })
            } // get Current time on every second
          >
             {this.state.textEnable?<DragTextEditor
        
        placeholderTextColor='white'
  
          onDragEnd={(x,y)=>{
            console.log('sss',x,y,Dimensions.get('screen').width);
           this.setState({x:x.value<10? x?.value+10:x.value,y:y?.value})
          }}
            visible={true}
            value={text}
            resizerSnapPoints={_resizerSnapPoints}
            cornerComponents={_cornerComponent}
            // rotationComponent={_rotateComponent}
            externalTextStyles={styles.textStyles}
            externalBorderStyles={styles.borderStyles}
            onChangeText={(text) => this.setState({ text })}
            placeholder="Please Enter Text"
            onLayout={(event) => {
              console.log('event',event);
              event.target.measure((x, y, width, height, pageX, pageY) => {
                console.log(
                  "x, y, width, height, pageX, pageY==>",
                  x,
                  y,
                  width,
                  height,
                  pageX,
                  pageY
                );
              });
            }}
          />:null}
            </VideoPlayer>
            </View>
        )}

        {this.state.audioClick && this.state.soundEdit ? (
          <View
            style={{
              height: "30%",
              width: "90%",
              marginTop: "50%",
              alignSelf: "center",
            }}
          >
            <Text size={12} white>
              Custom Sound Volume
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              onValueChange={async (val) => {
                await this.AudioPlayer.loadAsync(
                  { uri: this.state.audioFile },
                  {},
                  true
                );
                // await this.AudioPlayer.loadAsync(this.state.audioFile);
                await this.AudioPlayer.setVolumeAsync(val)
                  .then((res) => {
                    console.log("eeeeeee", res);
                  })
                  .catch((e) => {
                    console.log("eeeerrr", e);
                  });
                //  await this.AudioPlayer.setIsLoopingAsync(true)

                this.setState({ customVolume: val });
              }}
              maximumValue={1}
              value={this.state.customVolume}
              step={0.1}
              thumbTintColor={THEME.Colors.primary}
              maximumTrackTintColor="white"
              minimumTrackTintColor={THEME.Colors.primary}
            />
            <Text size={12} white>
              Original Sound Volume
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              onValueChange={(val) => {
                this.setState({ timer: val });
                this.setState({ originalVolume: val });
              }}
              maximumValue={1}
              value={this.state.originalVolume}
              step={0.1}
              thumbTintColor={THEME.Colors.primary}
              maximumTrackTintColor="white"
              minimumTrackTintColor={THEME.Colors.primary}
            />
          </View>
        ) : null}

        <View
          style={{
            zIndex: 999999999,
            position: "absolute",
            width: "100%",
            padding: 20,
            bottom: "20%",
            alignItems: "center",
            // flexDirection: "row",
            // justifyContent: "space-between",
          }}
        >
          {!this.state.audionAdded
            ? media?.uri && (
              <Trimmer
                // style={{ backgroundColor: 'red', zIndex: 999999, position: 'absolute', top: 10 }}
                source={this.state.newFile ? this.state.newFile : media?.uri}
                height={50}
                width={300}
                // onTrackerMove={e => this.setState({currentTime:e.currentTime})} // iOS only
                currentTime={this.state.currentTime} // use this prop to set tracker position iOS only
                themeColor={Colors.primary} // iOS only
                thumbWidth={30} // iOS only
                trackerColor={"green"} // iOS only
                onChange={(e) =>
                  this.setState({
                    startTimer: e.startTime,
                    endTimer: e.endTime,
                  })
                }
              />
            )
            : null}
          {this.state.paused && (
            <Image
              style={{ height: 80, width: "100%", marginTop: "10%" }}
              source={require("../v3/YdBO.gif")}
            />
          )}

          {this.state.audioClick ? (
            this.state.paused ? (
              <TouchableOpacity
                onPress={async () => {
                  this.StopRecording();
                  //       let arr = []
                  //       arr.push(media?.uri.replace("%2540", "%40").replace("%252F", "%2F"))
                  // let file = await AudioRecord.stop();
                  // console.log("AudioRecord", file);
                  // this.setState({ newFile: media.uri });
                  //       let v1 = media?.uri;
                  //       let v2 = 'file://'+file;
                  //  RNVideoEditor.merge(
                  //       [v1,v2],
                  //       results => {
                  //            alert("Error: " + results);
                  //       },
                  //       (results, file) => {
                  //            alert("Success : " + results + " file: " + file);
                  //            }
                  //       );

                  //       RNFFmpeg.execute(`ffmpeg -i ${media?.uri} -i ${file} -c copy -map 0:v:0 -map 1:a:0 output.mp4`).then(result =>
                  //         console.log(`FFmpeg process exited with rc=${result}.`));

                  this.setState({
                    paused: false,
                    play: true,
                    audionAdded: true,
                    newFile: media.uri,
                  });
                }}
                style={{ zIndex: 99, marginTop: "10%" }}
              // style={{ zIndex: 99, position: "absolute", right: 24, top: this.props.route.params.pending == true ? '28%' : '20%' }}
              >
                <MaterialCommunityIcons
                  name="stop-circle"
                  size={30}
                  color={"white"}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            ) : this.state.play ? (
              <TouchableOpacity
                onPress={async () => {
                  this.setState({ soundEdit: false });
                  this.PlayRecordedAudio();
                  // this.setState({
                  //   paused: false,
                  //   play: false,
                  //   audioClick: false
                  // });
                }}
                style={{ zIndex: 99, marginTop: "10%" }}
              >
                <MaterialCommunityIcons
                  name="play"
                  size={30}
                  color={"white"}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  // AudioRecord.start();
                  this.GetPermission();

                  this.StartRecording();
                }}
                style={{ zIndex: 99, marginTop: "10%" }}
              >
                <MaterialIcons
                  name="settings-voice"
                  size={30}
                  color={"white"}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>

        <View
          style={{
            position: "absolute",
            width: "100%",
            padding: 20,
            bottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {this.state.audionAdded ? (
            <TouchableOpacity
              style={{
                width: Dimensions.get("screen").width * 0.4,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
                paddingVertical: 10,
                borderRadius: (Dimensions.get("screen").width * 0.4) / 2,
              }}
              onPress={() => this.removePlaying()}
            >
              <Text size={12} white>
                Remove Sound
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: Dimensions.get("screen").width * 0.4,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
                padding: 10,
                borderRadius: (Dimensions.get("screen").width * 0.4) / 2,
              }}
              onPress={() => this.props.navigation.pop()}
            >
              <Text size={12} white>
                Discard
              </Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity style={{width:'30%'}} onPress={this.uploadIntroVideo}> */}
          {/* <Text white>Continue</Text> */}
          <View
            style={{
              width: Dimensions.get("screen").width * 0.4,
              justifyContent: "center",
            }}
          >
            <Button
              size={12}
              style={{ width: Dimensions.get("screen").width * 0.4 }}
              textColor="#fff"
              rounded
              onPress={this.uploadIntroVideo}
            >
              Continue
            </Button>
          </View>
          {/* </TouchableOpacity> */}
        </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  slider: {
    alignSelf: "center",
    width: "100%",
    height: 40,
  },
  borderStyles: {
    // width:Dimensions.get('screen').width*0.95,
    borderStyle: "dashed",
    borderColor: "gray",
  },
  textStyles: {
    color: "white",
    fontSize: 20,
  },
  cornerStyles: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "black",
    // borderColor: '#aaa',
    borderColor: "green",
  },
});

export default connect(null, { updateUser })(VideoIntroCameraEdit);
