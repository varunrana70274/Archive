import React from "react";
import { View, TextInput,TouchableOpacity } from "react-native";
import Text from "../components/Typography";
import * as THEME from "../libs/theme";
import FieldWrapper from "./FieldWrapper";
import { TextInputMask } from "react-native-masked-text";

export default ({
  label,
  formikProps,
  formikKey,
  containerStyle,
  style,
  editable,
  value,
  press,
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

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = "red";
  }

  return (
    <FieldWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}
      containerStyle={containerStyle}
      press={()=>press()}
    >
      <TouchableOpacity  onPress={()=>press()}>
      <TextInput
      editable={editable}
      value={value}
      pointerEvents='none'
        autoCapitalize="none"
        placeholder="MM/DD/YYYY"
        style={[inputStyles, style]}
        {...rest}
      />
      </TouchableOpacity>
    </FieldWrapper>
  );
};
