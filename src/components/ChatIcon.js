import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { connect } from "react-redux";
import Text from "./Text";

import * as THEME from "../libs/theme";

const ChatIcon = ({ notifications, style, onPress }) => {
  console.log("Message Notifications", notifications);
  return (
    <TouchableOpacity activeOpacity={0.9} style={style} onPress={onPress}>
      {notifications > 0 && (
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            left: -20,
            top: 10,
            backgroundColor: THEME.Colors.primary,
            justifyContent: "center",
            alignItems: "center",
            width: 20,
            height: 20,
            borderRadius: 10,
          }}
        >
          <Text white size={11}>
            {notifications}
          </Text>
        </View>
      )}
      <Image
      resizeMode='contain'
        source={require("../images/chat-icon.png")}
          style={{height:35,width:35}}
      />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(ChatIcon);
