import React from "react";
import { TouchableOpacity } from "react-native";

import Text from "./Text";

export default ({ title, placeholder, primary, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        style,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text color='#707070' body primary={primary ? true : false}>
        {title}
      </Text>
      <Text body thin>
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
};
