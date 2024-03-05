import React from "react";
import { TouchableOpacity, Image, StyleSheet, View, Platform } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import ChatIcon from "./ChatIcon";

const ExploreCardWrapper = ({
  onConversationPress,
  onEditProfilePress,
  onSwipeStart,
  onSwipe,
  children,
  extra,
  footer,
  notifications,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.profile}
        // onPress={onEditProfilePress}
      >
        {/* <Image
        resizeMode='contain'
          source={require("../images/user-icon.png")}
          style={styles.chatIcon}
        /> */}
      </TouchableOpacity>
      {/* <ChatIcon
        notifications={notifications}
        style={styles.chat}
        onPress={onConversationPress}
      /> */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.chat}
        // onPress={onConversationPress}
      >
        {/* <Image
        resizeMode='contain'
          source={require("../images/chat-icon.png")}
          style={[{height:30,width:30}]}
        /> */}
      </TouchableOpacity>
      <GestureRecognizer
      onSwipeStart={(name,state)=>{onSwipeStart(name,state)}}
        onSwipe={onSwipe}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        style={{
          flex: 1,
        }}
      >
        {children}
      </GestureRecognizer>
      {extra}
      {footer}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  chat: {
    position: "absolute",
    // top: 48,
    top:Platform.OS=='android'?20: 48,

    right: 30,
    zIndex: 99,
  },
  profile: {
    position: "absolute",
    top:Platform.OS=='android'?20: 48,
    left: 30,
    zIndex: 99,
  },
  chatIcon: {
    height:25,width:25
  },
});

export default ExploreCardWrapper;
