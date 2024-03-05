import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import MovToMp4 from "react-native-mov-to-mp4";
import Text from "./Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

import * as THEME from "../libs/theme";
import { Video } from "expo-av";

import API from "../libs/api";
import { updateUser } from "../actions";
import { connect } from "react-redux";

const AddMediaButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: THEME.Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        width: width / 4 - 30,
        height: width / 4 - 30,
        borderRadius: 8,
        marginTop: 15,
      }}
    >
      <MaterialCommunityIcons
        name="camera-plus-outline"
        size={32}
        color={THEME.Colors.white}
      />
    </TouchableOpacity>
  );
};

const EmptyBlock = () => {
  return <View style={styles.additionalMedia} />;
};

class PhotoGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fillers: [{}, {}, {}, {}, {}, {}, {}],
    };

    this.actionSheet = null;
  }

  _generateFiller = () => {
    if (this.props.user.media.length == 8) {
      this.setState({ fillers: [] });
    } else {
      let count = 7 - this.props.user.media.length;
      console.log("Count:", count);
      let fillers = [];

      for (i = 0; i < count; i++) {
        fillers.push({});
      }
      console.log("Fillers:", fillers.length);
      this.setState({ fillers });
    }
  };

  componentDidMount() {
    this._generateFiller();
  }

  removeMediaClick = (media) => {
    Alert.alert(
      "Remove Media",
      "Are you sure you want to remove this profile media?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete Media",
          onPress: () => {
            API.removeProfileMedia(media.id)
              .then((response) => {
                let user = response.data.user;
                this.props.updateUser(user);
              })
              .catch((error) => {
                console.log(error.response.data.error);
              });
          },
        },
      ]
    );
  };

  handleAddMediaClick = (index) => {
    switch (index) {
      case 0:
        this.handleChooseVideoFromLibrary();
        break;
      // case 1:
      //   this.handleChooseImageFromLibrary();
      //   break;
      case 1:
        this.props.onRecordVideo();
        break;
      // case 3:
      //   this.handleTakePhotoFromCamera();
      //   break;
    }
  };

  handleChooseVideoFromLibrary = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      let formData = await this.buildFormData(result);

      await this.handleUpload(formData);
      this._generateFiller();
    }
  };

  handleChooseImageFromLibrary = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      let formData = await this.buildFormData(result);

      await this.handleUpload(formData);
      this._generateFiller();
    }
  };

  handleRecordVideoFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      let formData = await this.buildFormData(result);

      await this.handleUpload(formData);
      this._generateFiller();
    }
  };

  handleTakePhotoFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      let formData = await this.buildFormData(result);

      await this.handleUpload(formData);
      this._generateFiller();
    }
  };

  buildFormData = async (result) => {
    let formData = new FormData();

    const uri = result.uri;
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const mediaType = this._checkMediaType(fileType);

    if (mediaType == "video") {
      if (Platform.OS == "ios") {
        const filename = Date.now().toString();
        let path =
          "file://" +
          (await MovToMp4.convertMovToMp4(
            result.uri.replace("file://", ""),
            filename
          ));
          console.log('pathpathpath3',path,result.uri);
        formData.append("media", {
          uri: path,
          name: `video.mp4`,
          type: `video/mp4`,
        });
      } else {
        formData.append("media", {
          uri: uri,
          type: "video/mp4",
          name: "video.mp4",
        });
      }
    } else {
      formData.append("media", {
        uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });

      console.log({
        uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    return formData;
  };

  _checkMediaType = (fileType) => {
    if (fileType == "mov" || fileType == "quicktime" || fileType == "mp4") {
      return "video";
    } else {
      return "photo";
    }
  };

  handleUpload = (formData) => {
    console.log("Handle Upload Form Data:", formData);
    API.uploadProfileMedia(formData)
      .then((response) => {
        console.log("Media Deleted");
        let user = response.data.user;
        this.props.updateUser(user);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.additionalMediaContainer}>
        <Text caption medium>
          Additional Videos
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          {user.media.map((image, index) => {
            if (image.type == "photo") {
              return (
                <TouchableOpacity
                  onPress={() => this.removeMediaClick(image)}
                  activeOpacity={0.8}
                  key={index}
                  style={styles.additionalMedia}
                >
                  <Image
                    source={{ uri: image.original_path }}
                    resizeMode="cover"
                    style={styles.additionalMediaImage}
                  />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => this.removeMediaClick(image)}
                  activeOpacity={0.8}
                  key={index}
                  style={styles.additionalMedia}
                >
                  <Video
                    source={{ uri: image.original_path }}
                    style={styles.additionalMedia}
                  />
                </TouchableOpacity>
              );
            }
          })}
          {this.props.user.media.length < 8 && (
            <AddMediaButton onPress={() => this.actionSheet.show()} />
          )}
          {this.state.fillers.map((filler) => {
            return <EmptyBlock />;
          })}
        </View>
        <ActionSheet
          ref={(actionSheet) => (this.actionSheet = actionSheet)}
          title="Choose Upload Option"
          options={[
            "Choose Video From Library",
            // "Choose Photo From Library ",
            "Record Video",
            // "Take a photo",
            "Cancel",
          ]}
          cancelButtonIndex={4}
          onPress={this.handleAddMediaClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  additionalMediaContainer: {
    marginBottom: 55,
  },
  additionalMedia: {
    marginTop: 15,
    width: width / 4 - 30,
    height: width / 4 - 30,
  },
  additionalMediaImage: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { updateUser })(PhotoGallery);
