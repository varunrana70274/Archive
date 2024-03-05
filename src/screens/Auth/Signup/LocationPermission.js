import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

import Text from "../../../components/Text";
import Button from "../../../components/Button";
import * as THEME from "../../../libs/theme";
import * as Location from "expo-location";
class LocationPermission extends Component {
  onClick = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert(
          "In order to use this app we need permissions to access your location."
        );
      }
    }
    this.props.navigation.navigate("CameraPermission");
  };
  render() {
    return (
      <View style={styles.container}>
          <Image
          style={{position:'absolute',top:'20%',left:'5%',height:50,width:50}}
          source={require("../../../v3/cross.png")}
          />
          <Image
          style={{position:'absolute',bottom:'10%',right:'5%',height:50,width:50}}
          source={require("../../../v3/heart.png")}
          />
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={require("../../../images/location-pin.png")}
          />
          <Text med bold color="#fff" center>
          Please allow access to your GPS location
          </Text>
          <Text center body color="#98A2B3" style={{ marginTop:10 }}>
          “Wave” needs your location to show people around you and optimize search
          </Text>

          {/* <Button textColor="#fff" rounded onPress={this.onClick}>
            Continue
          </Button> */}
        </View>
        <View style={{marginTop:20}}>
          <Button  textColor="#fff" rounded onPress={this.onClick}>
          Allow
          </Button>
          </View>
          <View style={{marginTop:20}}>

          <Button  style={{borderWidth:1,borderColor:'#23242780'}} withOutLinear={true} textColor="#fff"  onPress={()=>{
            this.props.navigation.navigate("CameraPermission");
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
  },
  innerContainer: {
    paddingHorizontal: 36,
    alignItems: "center",
  },
});

export default LocationPermission;
