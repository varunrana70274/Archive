import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Typography";
import * as THEME from "../libs/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({
  children,
  label,
  formikProps,
  formikKey,
  press,
  textStyle,
  containerStyle
}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={press} style={(styles.container, containerStyle)}>
      {label && (
        <Text paragraph color="white" weight="medium" style={[styles.label,textStyle]}>
          {label}
        </Text>
      )}
      {children}
      {formikProps?.touched?.[formikKey] && formikProps?.errors?.[formikKey] && (
        <Text style={{color:'#E63232',marginTop:20,fontFamily:THEME.FontFamily.medium,fontSize:12}}>
          {formikProps?.touched?.[formikKey] && formikProps?.errors?.[formikKey]}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: { marginBottom: 10 }
});
