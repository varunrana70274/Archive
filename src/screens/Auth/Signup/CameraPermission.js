import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Camera } from "expo-camera";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import * as THEME from "../../../libs/theme";
class CameraPermission extends Component {
  onClick = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert(
        "In order to use this app we need permissions to access your camera."
      );
    }

    this.props.navigation.reset({
      index: 1,
      routes: [{ name: "RecordIntro" }],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{position:'absolute',top:'20%',right:'5%',height:50,width:50}}
          source={require("../../../v3/heart.png")}
          />
          <Image
          style={{position:'absolute',bottom:'10%',left:'5%',height:50,width:50}}
          source={require("../../../v3/cross.png")}
          />
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={require("../../../images/camera-pin.png")}
          />
          <Text med bold color="#fff" center>
          Please allow access to your Camera
          </Text>
          <Text center body color="#98A2B3" style={{ marginTop:10 }}>
          “Wave” needs your access to make videos and fotos!
          </Text>

        </View>
        <View style={{marginTop:20}}>
          <Button  textColor="#fff" rounded onPress={this.onClick}>
          Allow
          </Button>
          </View>
          <View style={{marginTop:20}}>

          <Button  style={{borderWidth:1,borderColor:'#23242780'}} withOutLinear={true} textColor="#fff"  onPress={()=>{
            // this.props.navigation.reset({
            //   index: 1,
            //   routes: [{ name: "RecordIntro" }],
            // });
          }}>
          Not now
          </Button>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: THEME.Colors.black,
  },
  image: {
    width: 114,
    height: 114,
    marginBottom: 28,
    // tintColor:'#5B76FA'
  },
  innerContainer: {
    paddingHorizontal: 36,
    alignItems: "center",
  },
});

export default CameraPermission;
