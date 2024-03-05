import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Text from "../components/Text";
import * as THEME from "../libs/theme";

export default ({
  label,
  onChangeText,
  onBlur,
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
    color: THEME.Colors.lightBlack,
  };
  return (
    <View style={(styles.container, containerStyle)}>
      {label && (
        <Text paragraph color="lightblack" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        style={[inputStyles, style]}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={THEME.Colors.placeholder}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: { marginBottom: 10 },
});
