import React, { useState } from "react";
import { View, TextInput,Image } from "react-native";
import Text from "../components/Typography";
import * as THEME from "../libs/theme";
import FieldWrapper from "./FieldWrapper";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
export default ({
  label,
  formikProps,
  formikKey,
  containerStyle,
  style,
  keyboardType,
  refs,
  secure,
  ...rest
}) => {
  const [secureData,setSecureData]=useState(true)
  const [focused,setFocused]=useState(false)
  const inputStyles = {
    // borderWidth: 0,
    // borderColor: THEME.Colors.inputBorder,
    fontFamily: THEME.FontFamily.medium,
    fontSize: THEME.Sizes.paragraph,
    // paddingHorizontal: 8,
    // paddingVertical: 10,
    // borderRadius: 10,
    color: THEME.Colors.white,
    width:'90%',
    // height:'100%',
    // backgroundColor: 'red',
  };
  const inputContainerStyles = {
    borderWidth: 0,
    borderColor: THEME.Colors.inputBorder,
    fontFamily: THEME.FontFamily.medium,
    fontSize: THEME.Sizes.paragraph,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 10,
    color: THEME.Colors.white,
    backgroundColor: THEME.Colors.inputBoxColor,
  };
  const tintColor={
    tintColor:'white'
  }

  if ( formikProps?.errors?.[formikKey]) {
    inputContainerStyles.borderColor = "red";
    
  }
  if ( (formikProps?.errors?.[formikKey]&&formikProps?.values?.[formikKey].length)||focused) {
    inputContainerStyles.borderWidth = 1;
  }

  
  return (
    <FieldWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}
      containerStyle={[containerStyle]}
    >
      <View
        style={[
          inputContainerStyles,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal:10
          },
        ]}
      >
        <TextInput
        onFocus={()=>{
          setFocused(true)
        }}
        selectionColor='white'
          ref={refs}
          keyboardType={keyboardType}
          placeholderTextColor="#888993"
          autoCapitalize="none"
          style={[inputStyles, style]}
          onChangeText={formikProps?.handleChange?.(formikKey)}
          onBlur={()=>{
            setFocused(false)
            formikProps?.handleBlur?.(formikKey)}}
          secureTextEntry={secure?secureData:false}
          {...rest}
        />
        {
          secure?
          <TouchableOpacity
          onPress={()=>{
            setSecureData(!secureData)
          }}
          style={{height:20,width:20,alignItems:'center',justifyContent:'center'}}>
            <Image
            style={[{height:15,width:15,},tintColor]}
            source={secureData?require('../v3/eye.png'):require('../v3/eyeOff.png')}
            />
          {/* <Ionicons 
          onPress={()=>{
            setSecureData(!secureData)
          }}
          name={!secureData?'eye-off-outline': "eye-outline" }size={15} color={THEME.Colors.white} /> */}
        </TouchableOpacity>
          :null}
      </View>
    </FieldWrapper>
  );
};
