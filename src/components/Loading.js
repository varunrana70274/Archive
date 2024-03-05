import React from "react";
import { ActivityIndicator, SafeAreaView,View } from "react-native";
import * as THEME from "../libs/theme";

export default () => (
  <SafeAreaView
    style={{
      height:'100%',width:'100%',
      zIndex:99999,
      position:'absolute',
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#23242780',
    }}
  >
    <View style={{height:100,width:100,alignItems:'center',justifyContent:'center',backgroundColor:'#1B1E29',borderRadius:10}}>

    <ActivityIndicator size="large" color={THEME.Colors.primary} />
    </View>
  </SafeAreaView>
);
