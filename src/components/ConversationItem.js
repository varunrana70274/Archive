import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Text from "./Text";
import moment from "moment";

export default ({ avatar, name, datetime, onPress, read }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image style={styles.avatar} source={{ uri: avatar }} />
    <View style={styles.infoContainer}>
      <Text bold={true} body medium>
        {name}
      </Text>
      {datetime && (
        <Text style={{color:'#CCCCCC'}}>{moment(datetime).fromNow()}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 48,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginRight: 23,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
