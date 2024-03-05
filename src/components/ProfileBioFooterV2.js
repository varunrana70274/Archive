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
import BottomDrawer from "rn-bottom-drawer";
import * as Sharing from "expo-sharing";

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
    const { avatar, name, age, school, bio, uuid, id } = this.props;
    console.log(id);
    const animatedHeight = {
      transform: this.animation.getTranslateTransform(),
    };

    return (
      <BottomDrawer
      // offset={100}
        backgroundColor={"#fff"}
        containerHeight={400}
        shadow={false}
        startUp={false}
        roundedEdges={false}
      >
        <View
          style={{ alignItems: "center", paddingTop: 12, marginBottom: 10 }}
        >
          <Image resizeMode='contain' source={require("../images/v2/line_icon.png")} style={{ width: 35 }} />
        </View>
        <View style={{ padding: 10, flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: avatar ? avatar : "https://placehold.it/62x62" }}
              />
            </View>
            <View style={styles.headerBar}>
              <Text  title extralight>
                {name}, {age}
              </Text>
              <Text  bold>
                {school}
              </Text>
            </View>
          </View>
          <View style={styles.bio}>
            <Text  med thin>
              {bio}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const result = await Share.share({
                    url: `https://profile.wavetodate/${uuid}`,
                    message: `What do you think about ${name}? `,
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
              <Text >Share {name}'s Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ showReportModal: true })}
            >
              <Text >Report {name}'s Profile</Text>
            </TouchableOpacity>
          </View>
          <ReportModal
            userId={id}
            showModal={this.state.showReportModal}
            onClose={() => {
              this.setState({ showReportModal: false });
            }}
          />
        </View>
      </BottomDrawer>
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
    borderColor: "#000",
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
