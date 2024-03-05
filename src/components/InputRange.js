import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Slider from "@react-native-community/slider";
import Text from "../components/Text";
import * as THEME from "../libs/theme";

export default ({
  label,
  onValueChange,
  placeholder,
  value,
  containerStyle,
  style,
  ...rest
}) => {
  const inputStyles = {
    borderBottomWidth: 1,
    borderColor: THEME.Colors.inputBorder,
    fontFamily: THEME.FontFamily.medium,
    fontSize: THEME.Sizes.paragraph,
    paddingBottom: 3.5,
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text paragraph color="lightblack" weight="medium" style={styles.label}>
          {label} ({value} mi)
        </Text>
      )}
      <Slider
        style={styles.slider}
        minimumValue={5}
        onValueChange={onValueChange}
        maximumValue={150}
        value={value}
        step={5}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor={THEME.Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: { marginBottom: 10 },
  slider: {
    width: "100%",
    height: 40,
  },
});
