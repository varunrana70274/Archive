import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Modal,
} from "react-native";
import Button from "./Button";
import Text from "./Text";

export default ({ onClose, visible }) => {
  return (
    <Modal style={{ margin: 0 }} visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={{ flex: 5, justifyContent: "center" }}>
          <Text color="#FFFFFF" hero>
            You're now ready to ride the wave!
          </Text>
          <Image
            resizeMode="contain"
            style={styles.imageWave}
            source={require("../images/v2/wave_image.png")}
          />
          <View style={{ flexGrow: 0, marginTop: 166, alignItems: "center" }}>
            <Button
              // style={{width: width*0.70,}}
              withOutLinear={true}
              bgColor="white"
              textColor="#2BBFC9"
              rounded
              onPress={onClose}
              // style={{ width: "100%" }}
            >
              Continue
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 36,
    backgroundColor: "rgba(0,0,0,0.8)",
    // position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWave: {
    alignSelf: "center",
    width: Dimensions.get("screen").width,
    height: Platform.OS == "ios" ? "20%" : "25%",
  },
});
