import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  View,
  Dimensions,
  Easing,
  Modal,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";

import Text from "../components/Text";
import Button from "../components/Button";
import * as THEME from "../libs/theme";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
class Vibe extends Component {
  constructor() {
    super();
    this.state = {
      startValue: new Animated.Value(0),
      endValue: 20,
      duration: 1200,
      parentYPosition: null,
      secondEndValue: 0,
      secondStartValue: new Animated.Value(30),
    };
    this.spiniValue = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.timing(this.spiniValue, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
    this.spin();
  }
  spin() {
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: 1200,
    }).start();
    Animated.timing(this.state.secondStartValue, {
      toValue: this.state.secondEndValue,
      duration: 1200,
    }).start();
    setTimeout(() => {
      this.setState({ endValue: this.state.endValue == 30 ? -30 : 30 });
    }, 1200);

    // interval=  setInterval(() => {
    //     Animated.timing(this.state.startValue, {
    //       toValue: this.state.endValue,
    //       duration:2000

    //     }).start();
    //     Animated.timing(this.state.secondStartValue, {
    //       toValue: this.state.secondEndValue,
    //       duration:2000

    //     }).start();
    //     this.setState({endValue:this.state.endValue==30?-30:30,secondEndValue:this.state.secondEndValue==30?-30:30})
    //   }, 2000);
  }

  render() {
    const spin = this.spiniValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["5deg", "2deg"],
    });

    return (
      <Modal
        style={{ margin: 0 }}
        visible={this.props.showMatch}
        transparent={true}
      >
        <LinearGradient
          colors={["#2BBFC9", "#8CDFC8", "#EFD2B5"]}
          style={{ flex: 1 }}
          start={{ y: 0.0, x: 0.0 }}
          end={{ y: 0.9, x: 0.0 }}
        >
          <View style={styles.container}>
            {/* <TouchableOpacity
            style={{
              position: "absolute",
              top: 30,
              right: 30,
              zIndex: 999,
              padding: 20,
            }}
            onPress={this.props.onClose}
          >
            <Ionicons name="ios-close" size={32} color="#000000" />
          </TouchableOpacity> */}
            <View style={styles.innerContainer}>
              <Text
                size={25}
                mediumItalic
                center
                style={{ marginBottom: 70 }}
                white
              >
                It's a Vibe!
              </Text>
              <Animated.Image
                onLayout={(event) => {
                  const { y } = event.nativeEvent.layout;
                  this.setState({ parentYPosition: y });
                }}
                resizeMode="contain"
                style={[
                  styles.imageWave,
                  //   {
                  //   scaleX: this.spiniValue.interpolate({
                  //     inputRange: [0, 1],
                  //     outputRange: [1, 1.4]
                  // })

                  // transform: [{translateY: this.state.secondStartValue}]
                  // }
                  // transform: [{translateY: this.state.startValue}]
                  // }
                  {
                    transform: [
                      {
                        scaleX: this.spiniValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.3],
                        }),
                      },
                    ],
                    // transform: [{translateY: this.state.secondStartValue}]
                  },
                ]}
                source={require("../images/v2/wave_image.png")}
              />
              <Animated.Image
                onLayout={(event) => {
                  const { y } = event.nativeEvent.layout;
                  this.setState({ parentYPosition: y });
                }}
                style={[
                  styles.avatar,
                  {
                    position: "absolute",
                    bottom: "40%",
                    zIndex: 999999,
                    transform: [{ translateY: this.state.startValue }],
                  },
                ]}
                // source={require('../images/headshot.png')}

                source={{ uri: this.props.user.avatar }}
              />

              <Animated.Image
                onLayout={(event) => {
                  const { y } = event.nativeEvent.layout;
                  this.setState({ parentYPosition: y });
                }}
                resizeMode="contain"
                style={[
                  styles.imageWave,
                  {
                    transform: [
                      {
                        scaleX: this.spiniValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.3],
                        }),
                      },
                    ],
                    // transform: [{translateY: this.state.secondStartValue}]
                  },
                ]}
                source={require("../images/v2/wave_image.png")}
              />
              <Animated.Image
                onLayout={(event) => {
                  const { y } = event.nativeEvent.layout;
                  this.setState({ parentYPosition: y });
                }}
                style={[
                  styles.avatar,
                  {
                    position: "absolute",
                    bottom: 10,
                    transform: [{ translateY: this.state.secondStartValue }],
                  },
                ]}
                // style={[styles.avatar,{position:'absolute',bottom:10}]}
                // source={require('../images/headshot.png')}
                source={{ uri: this.props.avatar }}
              />
            </View>
            <View style={{ marginTop: 50 }}>
              {this.state.endValue == 30 && (
                <Button
                  style={{ width: width * 0.6 }}
                  chatNow={["#2BBFC9", "#2BBFC9", "#2BBFC9"]}
                  textColor="white"
                  bgColor="#2BBFC9"
                  // style={styles.button}
                  // secondary
                  rounded
                  // textColor={THEME.Colors.white}
                  onPress={this.props.onPress}
                >
                  Chat Now
                </Button>
              )}
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: THEME.Colors.primary,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 180,
    height: 180,
    borderWidth: 3,
    borderColor: THEME.Colors.white,
    borderRadius: 170 / 2,
    zIndex: 99999,
  },
  imageWave: {
    alignSelf: "center",
    width: width,
    height: Platform.OS == "ios" ? height * 0.2 : "100%",
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Vibe);
