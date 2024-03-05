import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { REPORT_USER_MUTATION } from "../graphql";
import { useMutation } from "react-apollo";
import API from "../libs/api";
import Text from "./Text";
import * as THEME from "../libs/theme";

export default class ReportModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: "",
    };
  }

  componentDidMount() {
    console.log("Mounted Prop:", this.props.userId);
  }

  sendReport = () => {
    console.log(this.state.reason, this.props.userId);
    API.reportUser(this.props.userId, this.state.reason)
      .then((res) => {
        this.props.onClose();
      })
      .catch((error) => {
        console.log(error);
        this.props.onClose();
      });
  };

  render() {
    return (
      <Modal visible={this.props.showModal} transparent={true}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 10, right: 30, zIndex: 999 }}
            onPress={this.props.onClose}
          >
            <Ionicons name="ios-close" size={32} color="#000000" />
          </TouchableOpacity>
          <View>
            <Text>Report Reason</Text>

            <TextInput
              style={styles.textbox}
              placeholder="Why are you reporting this profile?"
              onChangeText={(text) => this.setState({ reason: text })}
              multiline
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.reportButton}
              onPress={this.sendReport}
            >
              <Text>Report User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    flexDirection: "column",
  },
  textBoxContainer: {},
  textbox: {
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    height: 100,
    borderColor: THEME.Colors.inputBorder,
    borderWidth: 1,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  reportButton: {},
});
