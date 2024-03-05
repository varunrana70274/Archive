import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
 
export default () => (
  <View style={styles.chatFooter}>
    <View style={styles.messageInput}>
      <TextInput
        style={[textInputStyle, styles.textInput]}
        placeholder="Your Message "
        placeholderTextColor="#FFFFFF"
        value={this.state.message}
        multiline={true}
        onChangeText={(message) => this.setState({ message })}
        onContentSizeChange={(e) => {
          console.log("Content Size:", e.nativeEvent.contentSize.height);
          this.setState({
            textInputHeight: e.nativeEvent.contentSize.height,
          });
        }}
      />
    </View>
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => this.actionSheet.show()}
        style={styles.sendButton}
      >
        <Ionicons name="ios-camera" color="#FFFFFF" size={25} />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.sendMessage} style={styles.sendButton}>
        <Ionicons
          name="md-send"
          color="#FFFFFF"
          size={25}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({});
