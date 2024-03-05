import React from "react";
import { View, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Text from "../components/Typography";
import * as THEME from "../libs/theme";
import FieldWrapper from "./FieldWrapper";

export default ({
  label,
  formikProps,
  formikKey,
  containerStyle,
  style,
  type,
  options,
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
    >
      <TextInputMask
        type={type}
        style={[inputStyles, style]}
        options={options}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};
