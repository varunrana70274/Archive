import React from "react";
import { Text, StyleSheet } from "react-native";
import * as Theme from "../libs/theme";

export default ({
  style,
  children,
  paragraph,
  meta,
  xl,
  medium,
  lg,
  sm,
  onPress,
  color,
  weight
}) => {
  const textStyles = [
    style,
    styles.text,
    meta ? styles.meta : {},
    lg ? styles.lg : {},
    xl ? styles.xl : {},
    sm ? styles.sm : {},
    medium ? styles.medium : {},
    paragraph ? styles.paragraph : {},
    color ? styles[color] : {},
    weight ? styles[`weight${weight}`] : {}
  ];
  return <Text onPress={onPress} style={textStyles}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: Theme.FontFamily.regular
  },
  meta: {
    fontSize: Theme.Sizes.meta
  },
  lg: {
    fontSize: Theme.Sizes.lg
  },
  xl: {
    fontSize: Theme.Sizes.xl
  },
  medium: {
    fontSize: Theme.Sizes.medium
  },
  sm: {
    fontSize: Theme.Sizes.sm
  },
  paragraph: {
    fontSize: Theme.Sizes.paragraph
  },
  primary: {
    color: Theme.Colors.primary
  },
  secondary: {
    color: Theme.Colors.secondary
  },
  white: {
    color: Theme.Colors.white
  },
  black: {
    color: Theme.Colors.black
  },
  lightblack: {
    color: Theme.Colors.lightBlack
  },
  gray: {
    color: Theme.Colors.gray
  },
  weightmedium: {
    fontFamily: Theme.FontFamily.medium
  },
  weightlight: {
    fontFamily: Theme.FontFamily.light
  }
});
