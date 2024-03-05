import React from "react";
import { HeaderHeightContext } from "@react-navigation/stack";
import { KeyboardAvoidingView } from "react-native";

export default ({ children }) => {
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "position" : "height"}
          // you might need sometimes👇
          contentContainerStyle={{ flex: 1 }}
          // chances are you might be using react-navigation
          // if so 👇
          keyboardVerticalOffset={headerHeight + 64}
          // You can import Header Component from react-navigation and it has height attached to it
          // 64 is some extra padding, I feel good, feel free to tweak it
        >
          {children}
        </KeyboardAvoidingView>
      )}
    </HeaderHeightContext.Consumer>
  );
};
