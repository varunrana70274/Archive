import React from "react";
import { StyleSheet, View, TextInput, Picker } from "react-native";
import Text from "../components/Text";
import * as THEME from "../libs/theme";

export default ({
  label,
  onValueChange,
  onBlur,
  placeholder,
  value,
  containerStyle,
  options,
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
    <View style={(styles.container, containerStyle)}>
      {label && (
        <Text paragraph color="lightblack" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      <Picker selectedValue={value} onValueChange={onValueChange}>
        {options.map((option, index) => (
          <Picker.Item label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: { marginBottom: 10 },
});
