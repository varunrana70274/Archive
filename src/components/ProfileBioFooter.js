import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  Share,
} from "react-native";
import Text from "../components/Text";
import * as THEME from "../libs/theme";
import ReportModal from "./ReportModal";
import * as Sharing from "expo-sharing";
import FastImage from "react-native-fast-image";

const { width, height } = Dimensions.get("window");

export default class ProfileBioFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScrollEnabled: false,
      showReportModal: false,
    };

    this.scrollOffset = 0;
    this.animation = new Animated.ValueXY({ x: 0, y: height - 128 });
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.spring(this.animation.y, {
            toValue: -285,
            tension: 1,
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.spring(this.animation.y, {
            toValue: 285,
            tension: 1,
          }).start();
        }
      },
    });
  }

  render() {
    const { avatar, name, age, school, bio } = this.props;
    const animatedHeight = {
      transform: this.animation.getTranslateTransform(),
    };

    return (
      <Animated.View
        style={[animatedHeight, styles.container]}
        {...this.panResponder.panHandlers}
      >
        <View
          style={{ alignItems: "center", paddingTop: 12, marginBottom: 10 }}
        >
          <Image source={require("../images/bar.png")} style={{ width: 35 }} />
        </View>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <FastImage
              style={styles.avatar}
              source={{ uri: avatar ? avatar : "https://placehold.it/500x500" }}
            />
          </View>
          <View style={styles.headerBar}>
            <Text white title extralight>
              {name}, {age}
            </Text>
            <Text white bold>
              {school}
            </Text>
          </View>
        </View>
        <View style={styles.bio}>
          <Text white med thin>
            {bio}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={async () => {
              try {
                const result = await Share.share({
                  url: "https://google.com",
                  message:
                    "React Native | A framework for building native apps using React",
                });

                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                    console.log(result.activityType);
                  } else {
                    // shared

                    console.log(shared);
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            <Text white>Share {name}'s Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ showReportModal: true })}
          >
            <Text white>Report {name}'s Profile</Text>
          </TouchableOpacity>
        </View>
        <ReportModal
          userId={this.props.id}
          showModal={this.state.showReportModal}
          onClose={() => {
            this.setState({ showReportModal: false });
          }}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    width: width,
    flex: 1,
    zIndex: 99,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 36,
    height: 423,
  },
  header: {
    flexDirection: "row",
  },
  headerBar: {
    height: 103,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  bio: {
    flex: 0.5,
  },
  actionContainer: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
