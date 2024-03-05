import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
  Easing,
} from "react-native";
import Text from "../../components/Typography";
import Button from "../../components/Button";

import * as THEME from "../../libs/theme";
import LinearGradient from "react-native-linear-gradient";
const width = Dimensions.get("screen").width;
var interval;
export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      startValue: new Animated.Value(0),
      endValue: -30,
      duration: 2000,
      parentYPosition: null,
    };
  }
  componentDidMount() {
    this.spin();
  }
  spin() {
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    this.setState({ endValue: this.state.endValue == 30 ? -30 : 30 });

    interval = setInterval(() => {
      Animated.timing(this.state.startValue, {
        toValue: this.state.endValue,
        duration: 2000,
        useNativeDriver: true,
      }).start();
      this.setState({ endValue: this.state.endValue == 30 ? -30 : 30 });
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(interval);
  }
  render() {
    // const spin = this.spinValue.interpolate({
    //  inputRange: [0, 0.5, 1],
    // outputRange: ['0deg', '180deg', '0deg']
    // })
    return (
      <LinearGradient
        colors={["#2BBFC9", "#8CDFC8", "#EFD2B5"]}
        style={{ flex: 1 }}
        start={{ y: 0.0, x: 0.0 }}
        end={{ y: 0.9, x: 0.0 }}
      >
        <View style={styles.container}>
          <StatusBar  barStyle="light-content" />
          <View style={{ flex: 1.5, justifyContent: "center" }}>
            <Image
              resizeMode="contain"
              style={styles.imageBackground}
              source={require("../../images/v2/splash_logo.png")}
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
                  transform: [{ translateY: this.state.startValue }],
                },
              ]}
              source={require("../../images/v2/wave_image.png")}
            />
          </View>
          <View style={styles.footerContainer}>
            <Button
              style={{ width: width * 0.7 }}
              withOutLinear={true}
              bgColor="white"
              textColor="#2BBFC9"
              rounded
              onPress={() => this.props.navigation.push("Login")}
            >
              Sign In
            </Button>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.newAccountBtn}
              onPress={() => this.props.navigation.push("SignupName")}
            >
              <Text weight="medium" meta color="white">
                Create a New Account
              </Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                activeOpacity={1}
                style={{ alignItems: "center" }}
              >
                {/* <Text weight="light" meta>
                By creating an account you agree to our Terms.
              </Text> */}

                <Text
                  color="#707070"
                  weight="light"
                  style={{ color: "#707070", fontSize: THEME.FontFamily.light }}
                  meta
                >
                  By tapping Sign In or Create a New Account you agree to our{" "}
                  <Text
                    onPress={() => this.props.navigation.push("Terms")}
                    color="#707070"
                    weight="light"
                    style={{
                      textDecorationLine: "underline",
                      color: "#707070",
                      fontSize: THEME.FontFamily.light,
                    }}
                    meta
                  >
                    Terms
                  </Text>
                  . Learn how we process your data in our{" "}
                  <Text
                    onPress={() => {
                      this.props.navigation.push("PrivacyPolicy");
                    }}
                    color="#707070"
                    weight="light"
                    style={{
                      textDecorationLine: "underline",
                      color: "#707070",
                      fontSize: THEME.FontFamily.light,
                    }}
                    meta
                  >
                    Privacy Policy
                  </Text>
                  .
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => this.props.navigation.push("PrivacyPolicy")}
            >
              {/* <Text weight="light" meta>
                Learn how we process your data in our Privacy Policy
              </Text> */}
              {/* </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "20%",
  },
  imageBackground: { alignSelf: "center", width: "40%", height: "40%" },
  imageWave: {
    alignSelf: "center",
    width: "100%",
    height: Platform.OS == "ios" ? "40%" : "100%",
  },
  footerContainer: {
    flex: 1,
    height: "20%",
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
    // paddingTop: 40,
  },
  newAccountBtn: {
    marginTop: 30,
    marginBottom: 58,
  },
});
