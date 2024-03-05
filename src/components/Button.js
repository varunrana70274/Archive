import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Text from "./Text";
import * as THEME from "../libs/theme";
import LinearGradient from "react-native-linear-gradient";
const width = Dimensions.get("screen").width;
export default ({
  children,
  onPress,
  bgColor,
  textColor,
  rounded,
  style,
  withOutLinear,
  size,
  chatNow,
  primary,
  secondary,
  buttonContainer
}) => {
  const buttonStyles = [
    styles.button,
    style,
    bgColor ? styles[bgColor] : {},
    textColor && styles[textColor],
    textColor && !styles[textColor] && { color: textColor },
    rounded ? styles.rounded : {},
    primary ? styles.primary : {},
    secondary ? styles.secondary : {},
  ];
  const sizes = size;

  return (
    <LinearGradient
      colors={
       withOutLinear
          ? ["#23242780", "#23242780", "#23242780"]
          : [THEME.Colors.primary, THEME.Colors.primary]
      }
      style={[{ borderRadius: 10 },buttonContainer]}
      start={{ y: 0.0, x: 0.0 }}
      end={{ y: 0.0, x: 0.95 }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={buttonStyles}
      >
        <Text size={sizes} medium body color={textColor}>
          {children}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 0,
    flexGrow: 0,
    paddingVertical: 14,
    alignItems: "center",
    width: '100%',
  },
  rounded: {
    borderRadius: THEME.Radius,
  },
  primary: {
    backgroundColor: THEME.Colors.primary,
  },
  secondary: {
    backgroundColor: THEME.Colors.secondary,
  },
});
