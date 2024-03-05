import React, { Component } from "react";
import { StyleSheet, View,Dimensions, Image, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import Text from "../../components/Text";
import * as THEME from "../../libs/theme";
import LinearGradient from "react-native-linear-gradient";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { connect } from "react-redux";
import FastImage from 'react-native-fast-image'

const width=Dimensions.get('screen').width

const PROFILE_QUERY = gql`
  query {
    me {
      id
      name
      avatar
      school
      age
    }
  }
`;

class ViewProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => this.props.navigation.navigate("Main")}
        >
          <SimpleLineIcons
            name="arrow-down"
            color={THEME.Colors.black}
            size={20}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <TouchableOpacity activeOpacity={0.8}>
            <FastImage
            resizeMode='cover'
              source={{
                uri: user.avatar ? user.avatar : "https://placehold.it/500x500"
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text title extralight>
            {user.name}, {user.age}
          </Text>
          <Text bold body>
            {user.school}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
         
          <View style={styles.settingsOption}>
          <LinearGradient colors={
           
           ['#2BBFC9', '#A3DCC3', '#EFD2B5']}
             style={{borderRadius: 40,}} 
             start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 0.95 }}>
            
                  
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons
                color={THEME.Colors.white}
                name="pencil"
                size={25}
              />
            <Text style={{fontSize:14,marginLeft:10 }} color='#fff' semibold caption>
              EDIT PROFILE
            </Text>
            </TouchableOpacity>
            </LinearGradient>
          </View>
        
          <View style={[styles.settingsOption,{marginTop:20}]}>
          <LinearGradient colors={
           
  ['#2BBFC9', '#A3DCC3', '#EFD2B5']}
    style={{borderRadius: 40,}} 
    start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 0.95 }}>
   
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <FontAwesome color={THEME.Colors.white} name="gear" size={25} />
            <Text style={{ fontSize:14,marginLeft:10 }} color='#fff'  semibold caption>
              SETTINGS
            </Text>
            </TouchableOpacity>
            </LinearGradient>
          </View>
        </View> 
        <Text
        onPress={()=>this.props.navigation.navigate('ReferalAdd')}
         style={{fontSize:14,position:'absolute',bottom:50,marginLeft:10 }} primary semibold caption>
        Add Referral Code
            </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    position: "absolute",
    left: 40,
    top: 52,
  },
  avatar: {
    borderRadius: 192 / 2,
    width: 192,
    height: 192,
    marginBottom: 32,
    borderWidth:1,
    borderColor:'#fff'
  },
  infoContainer: {
    alignItems: "center",
  },
  settingsOption: {
    // flex: 1,
    alignItems: "center",
  },
  button: {
    width: width*0.4,
    height: 52,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row',
    // backgroundColor: THEME.Colors.primary,
  },

  buttonContainer: {
    marginTop: 86,
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ViewProfile);
