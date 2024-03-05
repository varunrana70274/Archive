import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "./Text";
import * as THEME from "../libs/theme";

const SelectItem = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.selectItem}
      onPress={onPress}
    >
      <View style={styles.labelContainer}>
        <Text med>{label}</Text>
      </View>
      <View style={styles.iconContainer}>
        {selected && (
          <Ionicons
            name="ios-checkmark"
            size={25}
            color={THEME.Colors.primary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectList = ({ label, options, onSelectItem, value }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text paragraph medium>
          {label}
        </Text>
      </View>

      <ScrollView style={styles.container}>
        {options.map((option, index) => (
          <SelectItem
            key={index}
            label={option.label}
            selected={option.value == value}
            onPress={() => onSelectItem(option.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: THEME.Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: THEME.Colors.placeholder,
  },
  labelContainer: {
    flex: 5,
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
