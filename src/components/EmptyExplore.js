import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import * as THEME from "../libs/theme";
import Button from "./Button";

import Text from "./Text";

export default ({props,onFilterPress}) => {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={require("../images/noMorePeople.png")}
          />
          <Text style={{marginTop:20}} med bold color="#fff" center>
          Here are no more people... Please invite new people to the app
          </Text>
          <Text center body color="#98A2B3" style={{ marginTop:10 }}>
          Also you can change your filters or go to ‘Likes & Matches’ 
          </Text>

        </View>
       
          <View style={{marginTop:20}}>

          <Button  style={{borderWidth:1,borderColor:'#23242780'}} withOutLinear={true} textColor="#fff"  onPress={()=>{
            onFilterPress()
          }}>
          Change Filters
          </Button>
          </View>
          <View style={{marginTop:20}}>
          <Button  textColor="#fff" rounded onPress={()=>{
            
          }}>
          Go to ‘Likes & Matches’
          </Button>
          </View>
      </View>
    );
  


};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal:20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: THEME.Colors.black,
  },
  image: {
    width: '100%',
    height: Dimensions.get('screen').height*0.2,
    marginBottom: 28,
    // tintColor:'#5B76FA'
  },
  innerContainer: {
    // paddingHorizontal: 36,
    alignItems: "center",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: THEME.Colors.black,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   messageContainer: {},
// });
