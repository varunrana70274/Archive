import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Animated,
  TouchableOpacity,
  Share,
} from "react-native";

import PromptDisplay from "../components/PromptDisplay";

import Text from "../components/Text";
import Loading from "../components/Loading";
import * as THEME from "../libs/theme";
import { getCachedVideo } from "../libs/helpers";
import { VideoPlayer, Trimmer } from "react-native-video-processing";

import { Video, Audio } from "expo-av";
import { createThumbnail } from "react-native-create-thumbnail";
import Slider from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient";

console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];

const { width, height } = Dimensions.get("window");
console.log("Width: ", width);
console.log("Height:", height);

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nearBy: props.isNearBy,
      imaeUrl: null,
      muted: false,
      showLoader: true,
      video: null,
      videoStatus: null,
      sliderValue: 0,
      sts: true,
    };

    this.lastTap = null;
    this.video = null;
    // this.getImage(this.props.media)
  }

  componentDidMount(){
    console.log('props.nearBy',this.props.isNearBy);
  }

  handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (this.lastTap && now - this.lastTap < DOUBLE_PRESS_DELAY) {
      this.toggleMute();
    } else {
      this.lastTap = now;
    }
  };

  toggleMute = () => {
    this.setState({ muted: !this.state.muted });
  };

  getImage = (media) => {
    createThumbnail({
      url: media.original_path,
      timeStamp: 100,
    })
      .then((res) => {
        this.props.media.tImage = res.path;
      })
      .catch((e) => {});

    //  .then(response => {
    //    console.log(response,"response");
    //    return response.path
    //  })
    //  .catch(err => console.log({ err }));
  };
  render() {
    const { tImage, media, imaeUrl, shouldPlay, showPrompt, profile } =
      this.props;
    return (
      <View style={[styles.container]}>
        {media.type == "video" && (
          <TouchableWithoutFeedback onPress={this.handleDoubleTap}>
            <Animated.View
              {...this.props.panResponder}
              style={[this.props?.animatedValue]}
            >
              {media.prompt && <PromptDisplay prompt={media.prompt} />}
              {
                <>
                
                  <View
                    style={{
                      position: "absolute",
                      top: "10%",
                      width: Dimensions.get("screen").width * 0.5,
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      zIndex: 99999,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ nearBy: false });
                        this.props?.forYouPress?.()
                      }}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 15,
                        backgroundColor: this.state.nearBy
                          ? "#23242780"
                          : "#5B76FA",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text color="white">For you</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ nearBy: true });
                        this.props?.nearByPress?.()

                      }}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 15,
                        backgroundColor: !this.state.nearBy
                          ? "#23242780"
                          : "#5B76FA",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text color="white">Nearby</Text>
                    </TouchableOpacity>
                  </View>
                  <Video
                    // onLoad={()=>{
                    //   this.setState({load:false})
                    // }}
                    // onLoadStart={()=>this.setState({load:true})}
                    onPlaybackStatusUpdate={(status) =>
                      this.setState({
                        videoStatus: status,
                        sliderValue:
                          status.positionMillis / status.durationMillis,
                      })
                    }
                    useNativeControls
                    posterSource={{ uri: tImage }}
                    usePoster={true}
                    ref={(ref) => (this.video = ref)}
                    source={{ uri: media.original_path }}
                    style={styles.video}
                    rate={1.0}
                    volume={1.0}
                    isMuted={this.state.muted}
                    resizeMode="cover"
                    shouldPlay={shouldPlay}
                    isLooping
                  />

                  <LinearGradient
                    colors={["#1A1B1C00", "#000000"]}
                    style={[
                      {
                        height: Dimensions.get("screen").height * 0.35,
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                        paddingHorizontal: 20,
                      },
                    ]}
                    start={{ y: 0.0, x: 0.0 }}
                    end={{ y: 0.5, x: 0.0 }}
                  >
                    <Image
                      ref={(ref) => {
                        this.imgRef = ref;
                      }}
                      onError={() => {
                        // if(this.imgRef?.props?.source){
                        //   this.imgRef.props.source.uri='https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
                        // }
                      }}
                      style={{ height: 100, width: 100 }}
                      source={{
                        uri: profile?.avatar
                          ? profile?.avatar
                          : "https://placehold.it/500x500",
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        semibold
                        weight="medium"
                        large
                        // style={{ alignSelf: "center" }}
                        // meta
                        color="white"
                      >
                        {profile.name},{profile?.age}
                      </Text>
                      <TouchableOpacity
                        onPress={async () => {
                          try {
                            const result = await Share.share({
                              url: profile?.intro_video,
                              message: `${profile?.name} has shared the wave app feed link, click here to more detail`,
                            });

                            if (result.action === Share.sharedAction) {
                              if (result.activityType) {
                                // shared with activity type of result.activityType
                                console.log(result.activityType);
                              } else {
                                // shared
                                // console.log(shared);
                              }
                            } else if (
                              result.action === Share.dismissedAction
                            ) {
                              // dismissed
                            }
                          } catch (error) {
                            alert(error.message);
                          }
                        }}
                      >
                        <Image
                          style={{ height: 40, width: 40 }}
                          source={require("../v3/Helpicon.png")}
                        />
                      </TouchableOpacity>
                    </View>
                    {!isNaN(this.state.sliderValue) ? (
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 20,
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Slider
                          style={{
                            width: "90%",
                            height: 20,
                            // position: "absolute",
                            // bottom: "10%",
                          }}
                          minimumValue={0}
                          maximumValue={1}
                          value={this.state.sliderValue}
                          onValueChange={(value) => {
                            const newPosition =
                              value * this.state.videoStatus?.durationMillis;
                            this.setState({ sliderValue: value });
                            this.video.setPositionAsync(newPosition);
                          }}
                          thumbTintColor={"white"}
                          maximumTrackTintColor="#1A1B1C"
                          minimumTrackTintColor={THEME.Colors.white}
                        />
                        <TouchableOpacity
                          style={{ height: 20, width: 20 }}
                          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
                          onPress={() => {
                            this.video.getStatusAsync().then((res) => {
                              if (res.shouldPlay === false) {
                                this.video.setStatusAsync({ shouldPlay: true });
                                this.setState({ sts: true });
                              } else {
                                this.video.setStatusAsync({
                                  shouldPlay: false,
                                });
                                this.setState({ sts: false });
                              }
                            });
                            // if(this.video.props.shouldPlay===false){
                            //   this.video.setStatusAsync({shouldPlay:true})
                            // }
                            // else{

                            //   this.video.setStatusAsync({shouldPlay:false})
                            // }
                          }}
                        >
                          <Image
                            style={{ height: 20, width: 20 }}
                            source={
                              this.state.sts == true
                                ? require("../v3/pause.png")
                                : require("../v3/play.png")
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </LinearGradient>
                </>
              }
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
        {media.type == "photo" && (
          <Image source={{ uri: media.original_path }} style={styles.photo} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    width: width,
    height: height,
  },
  photo: {
    width: width,
    height: height,
  },
});

export default ProfileCard;
