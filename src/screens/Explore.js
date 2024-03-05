import React, { Component, createRef, useCallback } from "react";
import {
  Animated,
  StyleSheet,
  Platform,
  Vibration,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Toast from "react-native-simple-toast";
import { Ionicons } from "@expo/vector-icons";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import * as Notifications from "expo-notifications";
import SendUnoteModal from "../components/SendUnoteModal";
import EmptyExploreLoading from "../components/EmptyExploreLoading";
import Loading from "./Loading";
import ProfileSwiper from "../components/ProfileSwiperV2";
import ReadyWaveOverlay from "../components/ReadyWaveOverlay";
import Vibe from "./Vibe";

import API from "../libs/api";

import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import MovToMp4 from "react-native-mov-to-mp4";
import * as THEME from "../libs/theme";
import { createThumbnail } from "react-native-create-thumbnail";

import messaging from "@react-native-firebase/messaging";

import { getShowIntroToken, deleteShowIntroToken } from "../libs/helpers";

import { registerForPushNotifications } from "../libs/helpers";
import { bulkCacheVideos } from "../libs/helpers";
import CardStack, {
  Card,
} from "../components/react-native-card-stack-swiper-master";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import Text from "../components/Text";
import RnRangeSliderMaster from "../components/rn-range-slider-master";
import Thumb from "../components/rn-range-slider-master/thumb";
import Rail from "../components/rn-range-slider-master/rail";
import RailSelecter from "../components/rn-range-slider-master/railSelecter";
import Label from "../components/rn-range-slider-master/Label";
import Notch from "../components/rn-range-slider-master/Notch";
import MultiSlider from "../components/react-native-multi-slider-master";
import Button from "../components/Button";
import { Video } from "expo-av";
const { width, height } = Dimensions.get("window");

// const renderThumb = useCallback(() => <Thumb/>, []);
// const renderRail = useCallback(() => <Rail/>, []);
// const renderRailSelected = useCallback(() => <RailSelecter/>, []);
// const renderLabel = useCallback(value => <Label text={value}/>, []);
// const renderNotch = useCallback(() => <Notch/>, []);
// const handleValueChange = useCallback((low, high) => {
//   setLow(low);
//   setHigh(high);
// }, []);
let marginIndex = [1];
const Tutorial = ({ onClose }) => {
  return (
    <SafeAreaView
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 100,
        paddingTop: 20,
      }}
    >
      <TouchableOpacity
        onPress={onClose}
        style={{
          padding: 5,
          position: "absolute",
          zIndex: 101,
          top: 30,
          left: 10,
        }}
      >
        <Ionicons name="ios-close" size={32} color={THEME.Colors.primary} />
      </TouchableOpacity>
      <Image
        resizeMode="cover"
        source={require("../images/how-to.png")}
        style={{ width: width, height: height }}
      />
    </SafeAreaView>
  );
};

export default class Explore extends Component {
  scrollView = createRef();

  state = {
    id: "",
    showIntroModal: false,
    currentIndex: 0,
    openModal: false,
    profiles: [],
    profile: null,
    profile2: null,
    showUnoteModal: false,
    latitude: null,
    longitude: null,
    loading: true,
    showMatch: false,
    matchAvatar: null,
    onShowTutorial: false,
    selectedIndex: 0,
    notifications: 0,
    shouldPlay: true,
    modalVisible: false,
    selectedShow: "Women",
    selectedOrientation: "Straight",
    distance: 2,
    ageMin: 5,
    ageMax: 18,
    isNearBy: false,
    isNearByPressed: false,
    nearByArr: [],
  };
  position = new Animated.ValueXY();
  pushTokenListenerSubscription = null;
  notificationListener = null;

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.setState({ shouldPlay: true });
      this.getNotifications();
      this.fetchFeed();
      setTimeout(() => {
        this.fetchFeed()
      }, 2000);
    });

    this.blurListener = this.props.navigation.addListener("blur", () => {
      this.setState({ shouldPlay: false });
    });

    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync();

    registerForPushNotifications();

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Background Message:".remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background",
        remoteMessage
      );
    });

    messaging().onMessage(async (notification) => {
      try {
        Vibration.vibrate();
        if (notification) {
          await Notifications.presentNotificationAsync({
            title: notification.notification.title,
            body: notification.notification.body,
            ios: { _displayInForeground: true },
          });
        }
      } catch (error) {
        console.log("Message Error:", error);
      }
    });

    let showIntroToken = await getShowIntroToken();
    await deleteShowIntroToken();

    this.setState({
      showIntroModal: showIntroToken ? true : false,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    this.getNotifications();
    this.fetchFeed("nearBy");
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.blurListener) {
      this.blurListener();
    }
  }

  getNotifications = () => {
    API.getNotificationCount()
      .then((response) => {
        this.setState({ notifications: response.data.count });
      })
      .catch((error) => {
        console.log("Get Notification Error:", error.message);
      });
  };

  fetchFeed = (type = "nearBy") => {
    // AsyncStorage.clear()
    this.setState({ loading: true });
    API.fetchFeed(
      type == "nearBy" ? this.state.latitude : this.state.latitude,
      type == "nearBy" ? this.state.longitude : this.state.longitude
    )
      .then(async (res) => {
        console.log("ressssssssssssss20", res.data);
        let profiles = res.data.users;

        let videos = [];

        let profile = profiles ? profiles : null;

        // let profile2 = profiles ?profiles.length>1? profiles[profiles.length-2] : null:null;
        if (profiles?.length > 0) {
          createThumbnail({
            url: profiles[0]?.media[0]?.original_path,
            timeStamp: 10000,
          })
            .then(async (res) => {
              console.log("ksjkjdskjf", res);
              profiles[0].media[0].tImage = await res.path;
              this.setState({
                loading: false,
                profiles: profiles,
                profile: profile,
                // profile2:profile2
              });
            })
            .catch((e) => {
              console.log("errorthissnsds", e);
            });
        }

        this.setState({
          loading: false,
          profiles: profiles,
          profile: profile,
          // profile2:profile2
        });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log(err.message);
        }
        this.setState({ loading: false });
      });
  };

  onSwipe = async (gestureName, id, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      // case SWIPE_UP:
      //   this.props.navigation.push("SettingsModal");
      //   break;
      case SWIPE_DOWN:
        let response = await API.pingUnote();

        if (this.state.profile && response.data.allowed) {
          this.setState({ id: id, openModal: true, shouldPlay: false });
        } else {
          alert("You can only send unotes once every 24 hours.");
        }

        break;
      case SWIPE_LEFT:
        if (this.state.profile) {
          API.sendUserReaction(id, "dislike")
            .then((res) => {
              let leftSwipeProfiles = this.state.profiles;
              let leftSwipeProfile = leftSwipeProfiles.pop();
              let leftSwipeProfile2 =
                leftSwipeProfiles.length > 1
                  ? leftSwipeProfiles[leftSwipeProfiles.length - 2]
                  : null;

              if (!leftSwipeProfile) {
                // this.fetchFeed();
              } else {
                this.setState(
                  {
                    // profiles: leftSwipeProfiles,
                    // profile: leftSwipeProfile,
                    selectedIndex: 0,
                    // profile2:leftSwipeProfile2
                  },
                  () => {
                    // console.log("Profile:", this.state.profile);
                  }
                );
              }

              Toast.showWithGravity("No Wave", Toast.SHORT, Toast.CENTER);
            })
            .catch((err) => {
              if (err.response) {
                // console.log(err.response.data);
              }
            });
        }
        break;
      case SWIPE_RIGHT:
        if (this.state.profile) {
          API.sendUserReaction(id, "like")
            .then((res) => {
              // console.log("Has Match Respone:", res.data);
              if (res.data.hasMatched) {
                this.setState({
                  matchAvatar: res.data.match.avatar,
                  showMatch: true,
                  shouldPlay: false,
                });
              }

              let rightSwipeProfiles = this.state.profiles;
              let rightSwipeProfile = rightSwipeProfiles.pop();
              let rightSwipeProfile2 =
                rightSwipeProfiles.length > 1
                  ? rightSwipeProfiles[rightSwipeProfiles.length - 2]
                  : null;

              if (!rightSwipeProfile) {
                // console.log("Loading More Profiles (Right)");
                // this.fetchFeed();
              } else {
                this.setState(
                  {
                    // profiles: rightSwipeProfiles,
                    // profile: rightSwipeProfile,
                    // profile2: rightSwipeProfile2,

                    selectedIndex: 0,
                  },
                  () => {
                    // console.log("Profile:", this.state.profile);
                  }
                );
              }

              Toast.showWithGravity("Waved", Toast.SHORT, Toast.CENTER);
            })
            .catch((err) => {
              if (err.response) {
                console.log("Swipe Right Error: ", err.response.data.message);
              } else {
                console.log("Swipe Right Error: ", err.message);
              }
            });
        }
        break;
      default:
        // alert("Gesture Not Recognized");
        break;
    }
  };

  onRecordUnote = async () => {
    this.setState({ openModal: false });
    this.props.navigation.navigate("UnoteCameraView", {
      recipient_id: this.state.id,
    });
  };

  onSendUnoteMessage = (message) => {
    let formData = new FormData();

    formData.append("content", message);

    API.sendUnote(this.state.id, formData)
      .then(async (response) => {
        this.setState({ openModal: false });
        Toast.showWithGravity("Unote Sent!", Toast.LONG, Toast.CENTER);
        await this.onSwipe("SWIPE_RIGHT", this.state.id);
      })
      .catch((err) => {
        // console.log(err.message);
      });
  };

  render() {
    const { loading, showIntroModal, onShowTutorial } = this.state;

    // if (loading) {
    //   return <Loading />;
    // }

    return (
      <>
        {/* <View style={{position:'absolute',height:height,width:width,backgroundColor:"red"}}>
{/* <ProfileSwiper
          shouldPlay={this.state.shouldPlay}
          notifications={this.state.notifications}
          selectedIndex={this.state.selectedIndex}
          onIndexSelected={(state, callback) => {
            this.setState(state, callback);
          }}
          profile={this.state.profile}
          onSwipe={this.onSwipe}
          onEditProfilePress={() =>
            this.props.navigation.navigate("SettingsModal")
          }
          onConversationPress={() =>
            this.props.navigation.navigate("Conversations")
          }
        /> */}
        {/* </View> */}

        {onShowTutorial && (
          <Tutorial onClose={() => this.setState({ onShowTutorial: false })} />
        )}
        {!this.state.isNearBy ? (
          <ProfileSwiper
            isNearBy={this.state.isNearBy}
            nearByPress={() => {
              this.setState({ isNearBy: true });
              this.fetchFeed("nearBy");
            }}
            forYouPress={() => {
              this.setState({
                isNearBy: false,
                isNearByPressed: false,
                nearByArr: [],
              });

              this.fetchFeed();
            }}
            onFilterPress={() => {
              this.setState({ modalVisible: true });
            }}
            props={this.props}
            shouldPlay={this.state.shouldPlay}
            notifications={this.state.notifications}
            selectedIndex={this.state.selectedIndex}
            onIndexSelected={(state, callback) => {
              this.setState(state, callback);
            }}
            profileArray={this.state.profiles}
            profile={this.state.profile}
            profile2={this.state.profile2}
            onSwipe={(name, id, type) => this.onSwipe(name, id, type)}
            onEditProfilePress={() =>
              this.props.navigation.navigate("SettingsModal")
            }
            onConversationPress={() =>
              this.props.navigation.navigate("Conversations")
            }
          />
        ) : this.state.isNearByPressed ? (
          <ProfileSwiper
            isNearBy={this.state.isNearBy}
            nearByPress={() => {
              this.setState({ isNearBy: true });
              this.fetchFeed("nearBy");
            }}
            forYouPress={() => {
              this.setState({
                isNearBy: false,
                isNearByPressed: false,
                nearByArr: [],
              });

              this.fetchFeed();
            }}
            onFilterPress={() => {
              this.setState({ modalVisible: true });
            }}
            props={this.props}
            shouldPlay={this.state.shouldPlay}
            notifications={this.state.notifications}
            selectedIndex={this.state.selectedIndex}
            onIndexSelected={(state, callback) => {
              this.setState(state, callback);
            }}
            profileArray={this.state.nearByArr}
            profile={this.state.profile}
            profile2={this.state.profile2}
            onSwipe={(name, id, type) => this.onSwipe(name, id, type)}
            onEditProfilePress={() =>
              this.props.navigation.navigate("SettingsModal")
            }
            onConversationPress={() =>
              this.props.navigation.navigate("Conversations")
            }
          />
        ) : (
          <View>
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
                  // console.log("fff");
                  this.setState({
                    isNearBy: false,
                    isNearByPressed: false,
                    nearByArr: [],
                  });
                  this.fetchFeed();
                }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  backgroundColor: "#23242780",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text color="white">For you</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ nearBy: true });
                }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  backgroundColor: "#5B76FA",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text color="white">Nearby</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={3}
              keyExtractor={(item) => item.id}
              style={{ backgroundColor: "black" }}
              data={this.state.profiles}
              contentContainerStyle={{ alignItems: "center" }}
              renderItem={({ item, index }) => {
                if (marginIndex.includes(index)) {
                  marginIndex.push(index + 3);
                }
                console.log("marginIndex", item?.media[0]);
                return item?.media[0]?.original_path ? (
                  <TouchableOpacity
                    onPress={() => {
                      let ar = [...this.state.profiles];

                      let fd = ar.splice(index, 1);
                      console.log("fddd", ar);
                      ar.unshift(fd[0]);
                      console.log("sfdhfdshfkhdshf", ar);
                      this.setState({ nearByArr: ar, isNearByPressed: true });
                    }}
                  >
                    <Image
                      style={{
                        height: 150,
                        borderWidth: 1,
                        borderColor: "#232427",
                        width: Dimensions.get("screen").width / 3.5,
                        marginHorizontal: 10,
                        borderRadius: 20,
                        marginTop: marginIndex.includes(index) ? 20 : 0,
                      }}
                      source={{ uri: item?.avatar?item?.avatar:'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U' }}
                    />
                    <View style={{position:'absolute',width:Dimensions.get("screen").width / 3.5,bottom:marginIndex.includes(index) ?
                    10:30,left:20}}>
                    <Text
                    style={{width:'90%'}}
                        semibold
                        weight="medium"
                        // large
                        // style={{ alignSelf: "center" }}
                        // meta
                        color="white"
                      >
                        {item.name},{item?.age}
                      </Text>
                      </View>
                  </TouchableOpacity>
                ) : null;
              }}
            />
          </View>
        )}

        <SendUnoteModal
          visibility={this.state.openModal}
          onRecordMessage={this.onRecordUnote}
          onSendUnoteFromLibrary={this.onSendUnoteFromLibrary}
          closeModal={() =>
            this.setState({ openModal: false, shouldPlay: true })
          }
          onSendUnoteMessage={this.onSendUnoteMessage}
          navigation={this.props.navigation}
        />
        <Vibe
          showMatch={this.state.showMatch}
          avatar={this.state.matchAvatar}
          onClose={() => this.setState({ showMatch: false, shouldPlay: true })}
          onPress={() => {
            this.setState({ showMatch: false, matchAvatar: "" });
            this.props.navigation.navigate("Conversations");
          }}
        />
        {/* <ReadyWaveOverlay
          visible={showIntroModal}
          onClose={() =>
            this.setState({ showIntroModal: false,  })
          }
        /> */}

        <Modal visible={this.state.modalVisible}>
          <ScrollView
            style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "black" }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
                // paddingHorizontal: 20,
                justifyContent: "space-between",
                // backgroundColor:'red',
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#23242780",
                }}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <AntDesign name="left" size={15} color={THEME.Colors.white} />
              </TouchableOpacity>
              <View>
                <Text
                  weight="medium"
                  medium
                  style={{ alignSelf: "center" }}
                  bold
                  color="white"
                >
                  Filters
                </Text>
              </View>
              <Text style={{ alignSelf: "center" }} meta color="white"></Text>
            </View>

            <Text
              paragraph
              color="white"
              weight="medium"
              style={{ marginVertical: 10 }}
            >
              Location
            </Text>
            <View
              style={[
                inputContainerStyles,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                },
              ]}
            >
              <TextInput
                onFocus={() => {}}
                placeholder="Search location"
                selectionColor="white"
                keyboardType={"default"}
                placeholderTextColor="#888993"
                autoCapitalize="none"
                style={[inputStyles]}
                onChangeText={() => {}}
                onBlur={() => {}}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <Text paragraph color="white" weight="medium">
                Distance
              </Text>
              <Text paragraph color="#5B76FA" weight="medium">
                up to {this.state.distance ? parseInt(this.state.distance) : 0}
                km
              </Text>
            </View>
            <Slider
              style={{
                width: "100%",
                height: 20,
                // position: "absolute",
                // bottom: "10%",
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.distance}
              onValueChange={(value) => {
                console.log("value", value);
                this.setState({ distance: value });
              }}
              thumbTintColor={"#5B76FA"}
              maximumTrackTintColor="#1A1B1C"
              minimumTrackTintColor={THEME.Colors.primary}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <Text paragraph color="white" weight="medium">
                Show me
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedShow: "Women",
                  });
                }}
                style={{
                  alignItems: "center",
                  borderWidth: this.state.selectedShow == "Women" ? 1 : 0,
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: "#5B76FA",
                  backgroundColor: "#1B1E29",
                  width: "30%",
                }}
              >
                <Text color="white">Women</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedShow: "Men",
                  });
                }}
                style={{
                  alignItems: "center",
                  borderWidth: this.state.selectedShow == "Men" ? 1 : 0,
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: "#5B76FA",
                  backgroundColor: "#1B1E29",
                  width: "30%",
                }}
              >
                <Text color="white">Men</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedShow: "Both",
                  });
                }}
                style={{
                  alignItems: "center",
                  borderWidth: this.state.selectedShow == "Both" ? 1 : 0,
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: "#5B76FA",
                  backgroundColor: "#1B1E29",
                  width: "30%",
                }}
              >
                <Text color="white">Both</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <Text paragraph color="white" weight="medium">
                Orientation
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedOrientation: "Straight",
                  });
                }}
                style={{
                  alignItems: "center",
                  borderWidth:
                    this.state.selectedOrientation == "Straight" ? 1 : 0,
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: "#5B76FA",
                  backgroundColor: "#1B1E29",
                  width: "48%",
                }}
              >
                <Text color="white">Straight</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedOrientation: "Gay",
                  });
                }}
                style={{
                  alignItems: "center",
                  borderWidth: this.state.selectedOrientation == "Gay" ? 1 : 0,
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: "#5B76FA",
                  backgroundColor: "#1B1E29",
                  width: "48%",
                }}
              >
                <Text color="white">Gay</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedOrientation: "Lesbian",
                  });
                }}
                style={{
                  alignItems: "center",
                  borderWidth:
                    this.state.selectedOrientation == "Lesbian" ? 1 : 0,
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: "#5B76FA",
                  backgroundColor: "#1B1E29",
                  width: "48%",
                }}
              >
                <Text color="white">Lesbian</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedOrientation: "Bisexual",
                  });
                }}
                style={{
                  alignItems: "center",
                  borderWidth:
                    this.state.selectedOrientation == "Bisexual" ? 1 : 0,
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: "#5B76FA",
                  backgroundColor: "#1B1E29",
                  width: "48%",
                }}
              >
                <Text color="white">Bisexual</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <Text paragraph color="white" weight="medium">
                Age preference
              </Text>
              <Text paragraph color="#5B76FA" weight="medium">
                {parseInt(this.state.ageMin)}-{parseInt(this.state.ageMax)} y.o.
              </Text>
            </View>
            <Slider
              style={{
                width: "100%",
                height: 20,
                // position: "absolute",
                // bottom: "10%",
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.ageMax}
              onValueChange={(value) => {
                console.log("value", value);
                this.setState({ ageMax: value });
              }}
              thumbTintColor={"#5B76FA"}
              maximumTrackTintColor="#1A1B1C"
              minimumTrackTintColor={THEME.Colors.primary}
            />
            {/* <RnRangeSliderMaster
            disabled={false}
            disableRange={false}
            low={this.state.ageMin}
            high={this.state.ageMax}
  // style={styles.slider}
  min={0}
  max={100}
  step={1}
  floatingLabel
  renderThumb={()=>{
    return(
      <Thumb/>
    )
  }}
  renderRail={()=>{
    return(
      <Rail/>
    )
  }}
  renderRailSelected={()=>{
    return(
      <RailSelecter/>
    )
  }}
  renderLabel={(value)=>{
    return(
      <Label text={value}/>
    )
  }}
  renderNotch={()=>{
    return(
      <Notch/>
    )
  }}
  onValueChanged={(low,high)=>{
    console.log(low!==this.state.ageMin);
    if(low!==this.state.ageMin){

    }
    if(high!==this.state.ageMax){
      this.setState({ ageMax: high });
    }
    // this.setState({ ageMax: high });
  
  }}
/> */}

            <Button
              buttonContainer={{ marginTop: "20%" }}
              bgColor="#fff"
              textColor="#fff"
              rounded
              onPress={() => {
                let body = {
                  // latitude: string,
                  // longitude: string,
                  search_distance: this.state.distance,
                  looking_for: this.state.selectedShow,
                  orientation: this.state.selectedOrientation,
                  maxAge: this.state.ageMin,
                  minAge: this.state.ageMax,
                };
                API.filter(body)
                  .then((res) => {
                    console.log("ressss", res);
                    this.setState({
                      modalVisible: false,
                    });
                    this.fetchFeed();
                  })
                  .catch((e) => {
                    console.log("eeee", e);
                  });
              }}
            >
              Apply
            </Button>
          </ScrollView>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chat: {
    position: "absolute",
    top: 52,
    right: 30,
    zIndex: 99,
  },
  chatIcon: {},
  mediaContainer: {},
  imageBackground: { width: "100%", height: "100%" },
  bioFooterContainer: {},
});

const inputStyles = {
  // borderWidth: 0,
  // borderColor: THEME.Colors.inputBorder,
  fontFamily: THEME.FontFamily.medium,
  fontSize: THEME.Sizes.paragraph,
  // paddingHorizontal: 8,
  // paddingVertical: 10,
  // borderRadius: 10,
  color: THEME.Colors.white,
  width: "90%",
  // height:'100%',
  // backgroundColor: 'red',
};
const inputContainerStyles = {
  borderWidth: 0,
  borderColor: THEME.Colors.inputBorder,
  fontFamily: THEME.FontFamily.medium,
  fontSize: THEME.Sizes.paragraph,
  paddingHorizontal: 8,
  paddingVertical: 12,
  borderRadius: 10,
  color: THEME.Colors.white,
  backgroundColor: THEME.Colors.inputBoxColor,
};
