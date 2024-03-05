import React from "react";
import { Text, StyleSheet } from "react-native";

import * as THEME from "../libs/theme";

export default (props) => {
  const {
    title,
    body,
    caption,
    option,
    small,
    med,
    large,
    hero,
    size,
    center,
    right,
    transform,
    height,
    spacing,
    regular,
    bold,
    semibold,
    medium,
    lightItalic,
    mediumItalic,
    light,
    extralight,
    thin,
    // Colors
    color,
    white,
    primary,
    secondary,
    black,
    lightBlack,
    style,
    children,
    ...rest
  } = props;

  const textStyles = [
    styles.text,
    title && styles.title,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    option && styles.option,
    med && styles.med,
    large && styles.large,
    size && { fontSize: size },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    hero && styles.hero,
    center && styles.center,
    right && styles.right,
    transform && { textTransform: transform },
    regular && styles.regular,
    medium && styles.medium,
    lightItalic && styles.lightItalic,
    mediumItalic && styles.mediumItalic,
    bold && styles.bold,
    thin && styles.thin,
    semibold && styles.semibold,
    light && styles.light,
    extralight && styles.extralight,
    color && styles[color],
    color && !styles[color] && { color },
    white && styles.white,
    primary && styles.primary,
    secondary && styles.secondary,
    black && styles.black,
    lightBlack && styles.lightBlack,
    style,
  ];

  return (
    <Text style={textStyles} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: THEME.FontFamily.regular,
    color: THEME.Colors.black,
  },
  title: {
    fontSize: THEME.Sizes.title,
  },
  body: {
    fontSize: THEME.Sizes.paragraph,
  },
  caption: {
    fontSize: THEME.Sizes.meta,
  },
  option: {
    fontSize: THEME.Sizes.option,
  },
  small: {
    fontSize: THEME.Sizes.sm,
  },
  med: {
    fontSize: THEME.Sizes.medium,
  },
  large: {
    fontSize: THEME.Sizes.lg,
  },
  hero: {
    fontSize: THEME.Sizes.xl,
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  regular: {
    fontFamily: THEME.FontFamily.regular,
  },
  bold: {
    fontFamily: THEME.FontFamily.bold,
  },
  thin: {
    fontFamily: THEME.FontFamily.thin,
  },
  medium: {
    fontFamily: THEME.FontFamily.medium,
  },
  lightItalic: {
    fontFamily: THEME.FontFamily.lightItalic,
  },
  mediumItalic: {
    fontFamily: THEME.FontFamily.mediumItalic,
  },
  semibold: {
    fontFamily: THEME.FontFamily.semibold,
  },
  light: {
    fontFamily: THEME.FontFamily.light,
  },
  extralight: {
    fontFamily: THEME.FontFamily.extralight,
  },
  primary: {
    color: THEME.Colors.primary,
  },
  secondary: {
    color: THEME.Colors.secondary,
  },
  black: {
    color: THEME.Colors.black,
  },
  lightBlack: {
    color: THEME.Colors.lightBlack,
  },
  white: {
    color: THEME.Colors.white,
  },
});
