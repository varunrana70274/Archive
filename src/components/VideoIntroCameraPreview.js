import React, { Component } from "react";
import { Video } from "expo-av";
import MovToMp4 from "react-native-mov-to-mp4";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { setShowIntroToken } from "../libs/helpers";
import Text from "../components/Text";
import API from "../libs/api";
import { connect } from "react-redux";
import { updateUser } from "../actions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";

class VideoIntroCameraPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: true,
      media: null,
      prompt: null,
      currentTime: 0,
      end: 0,
    };
  }

  componentDidMount() {
    this.setState({
      media: this.props.route.params.media,
      prompt: this.props.route.params.prompt,
      end: this.props.route.params?.end,
      currentTime: 0,
      pause: false,
    });
  }
  // componentWillUnmount(){
  //   this.setState({pause:true})
  // }

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
    } else {
      const uri = this.state.media?.uri;
      Platform.OS == "android"
        ? formData.append("video", {
            uri: uri,
            type: "video/mp4",
            name: "video.mp4",
          })
        : formData.append("video", { uri: uri, type: "video/mp4" });
    }

    formData.append("prompt", this.state.prompt);
    formData.append("promptText", this.state.prompt);
    console.log("lfdsfkksdfhsfsdhfhh", formData);
    API.uploadUserIntro(formData)
      .then(async (response) => {
        console.log("response", response);
        await setShowIntroToken();
        let user = response.data.user;
        this.props.updateUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  trimVideo() {
    const options = {
      startTime: 0,
      endTime: 15,
      quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
      saveToCameraRoll: true, // default is false // iOS only
      saveWithCurrentDate: true, // default is false // iOS only
    };
    this.videoPlayerRef
      .trim(options)
      .then((newSource) => console.log(newSource))
      .catch(console.warn);
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
    const { media } = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.setState({ pause: !this.state.pause })}
        activeOpacity={1}
        style={styles.container}
      >
        {!this.state.pause ? (
          <MaterialCommunityIcons
            name="pause"
            size={50}
            color={"white"}
            style={{
              alignSelf: "center",
              position: "absolute",
              top: "45%",
              left: "45%",
              zIndex: 99999,
            }}
          />
        ) : (
          <MaterialCommunityIcons
            name="play"
            size={50}
            color={"white"}
            style={{
              alignSelf: "center",
              position: "absolute",
              top: "45%",
              left: "45%",
              zIndex: 99999,
            }}
          />
        )}
        {/* { (
          <TouchableOpacity
            onPress={() => { }
              // this.setState({ showPrompt: true, prompt: getRandomPrompt() })
            }
            style={{ zIndex: 99, position: "absolute", right: 20, top: 40 }}
          >
            <Image resizeMode={'contain'} style={{ height: 30, width: 30, }} source={require('../v3/Filter.png')} />

          </TouchableOpacity>
        )}
       {this.props.route.params.pending==true&& (
          <TouchableOpacity
            onPress={() =>
            {this.props.navigation.goBack()}
            }
            style={{ zIndex: 99, position: "absolute", right: 24, top: '12%' }}
          >
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={24}
              color={'white'}
            />
          <Text center size={6} white>Add clip</Text>
          </TouchableOpacity>
        )}
       { (
          <TouchableOpacity
            onPress={() =>
            {}
            }
            style={{ zIndex: 99, position: "absolute", right: 24, top:this.props.route.params.pending==true? '20%':'12%' }}
          >
            <MaterialCommunityIcons
              name="format-text"
              size={24}
              color={'white'}
              style={{alignSelf:'center'}}
            />
          <Text center size={6} white>Insert text</Text>
          </TouchableOpacity>
        )} */}
        {media && (
          <Video
            shouldPlay={!this.state.pause}
            resizeMode="cover"
            style={styles.video}
            isLooping={true}
            // shouldPlay={true}
            source={{ uri: media?.uri }}
          />
        )}
        {/* camera-plus-outline */}
        {/* <VideoPlayer
                    ref={ref => this.videoPlayerRef = ref}
                    startTime={30}  // seconds
                    endTime={120}   // seconds
                    play={true}     // default false
                    replay={true}   // should player play video again if it's ended
                    rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
                    source={media?.uri}
                    // playerWidth={300} // iOS only
                    // playerHeight={500} // iOS only
                    style={styles.video}
                    resizeMode={VideoPlayer.Constants.resizeMode.COVER}
                    onChange={({ nativeEvent }) => this.setState({currentTime:nativeEvent.currentTime})} // get Current time on every second
                />
                <Trimmer
                style={{backgroundColor:'red',zIndex:999999,position:'absolute',top:10}}
                    source={media?.uri}
                    height={100}
                    width={300}
                    onTrackerMove={(e) => this.setState({currentTime:e.currentTime})} // iOS only
                    currentTime={this.state.currentTime} // use this prop to set tracker position iOS only
                    themeColor={'red'} // iOS only
                    thumbWidth={30} // iOS only
                    trackerColor={'green'} // iOS only
                    onChange={(e) => console.log(e.startTime, e.endTime)}
                /> */}
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
          <TouchableOpacity
            style={{
              width: Dimensions.get("screen").width * 0.4,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              paddingVertical: 10,
              borderRadius: (Dimensions.get("screen").width * 0.38) / 2,
            }}
            // onPress={() => this.props.navigation.pop(1)}
            onPress={() => {
              if(this.props.route.params?.isAdditional){
                this.props.navigation.goBack()
              }
              else{
                this.props.navigation?.reset({
                  index: 1,
                  routes: [{ name: "RecordIntro" }],
                });
              }
            }}
          >
            <Text size={12} primary>
              Record again
            </Text>
          </TouchableOpacity>
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
              onPress={() => {
                this.setState({ pause: true });

                this.props.navigation.navigate("VideoIntroCameraEdit", {
                  end: this.state.end,
                  media: media,
                  prompt: this.state.prompt ? this.state.prompt : "",
                  pending: this.props.route.params.pending,
              isAdditional:this.props.route.params?.isAdditional

                });
              }}
            >
              Edit Video
            </Button>
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
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
});

export default connect(null, { updateUser })(VideoIntroCameraPreview);
