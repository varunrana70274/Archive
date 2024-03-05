import React, { Component, createRef } from "react";
import { StyleSheet, View, ScrollView, Dimensions, Text } from "react-native";
import TouchBar from "./TouchBar";

import ProfileCard from "./ProfileCard";

import * as THEME from "../libs/theme";

const DEVICE_WIDTH = Dimensions.get("window").width;

export default class MediaSlideShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      items: this.props.items,
    };

    this.scrollView = createRef();
  }

  nextMediaItem = () => {
    this.setState(
      (prevState) => ({
        selectedIndex:
          prevState.selectedIndex === this.props.items.length - 1
            ? this.props.items.length - 1
            : prevState.selectedIndex + 1,
      }),
      () => {
        this.scrollView.current.scrollTo({
          animated: true,
          y: 0,
          x: DEVICE_WIDTH * this.state.selectedIndex,
        });
      }
    );
  };

  prevMediaItem = () => {
    this.setState(
      (prevState) => ({
        selectedIndex:
          prevState.selectedIndex === 0
            ? prevState.selectedIndex
            : prevState.selectedIndex - 1,
      }),
      () => {
        this.scrollView.current.scrollTo({
          animated: true,
          y: 0,
          x: DEVICE_WIDTH * this.state.selectedIndex,
        });
      }
    );
  };

  render() {
    const { selectedIndex } = this.state;
    const { items } = this.props;
    return (
      <View style={styles.container}>
        <TouchBar left onPress={this.prevMediaItem} />
        <TouchBar right onPress={this.nextMediaItem} />
        <View style={styles.indicatorContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {items.map((indicator, index) => {
              return (
                <View
                  key={`indicator-${index}`}
                  style={[
                    styles.indicator,
                    selectedIndex == index && styles.indicatorSelected,
                  ]}
                ></View>
              );
            })}
          </View>
        </View>
        <ScrollView
          ref={this.scrollView}
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {items.map((media, index) => (
            <ProfileCard
              showPrompt={this.props.showPrompt ? true : false}
              key={`video-${media.id}`}
              media={media}
              shouldPlay={selectedIndex === index && media.type == "video"}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  indicatorContainer: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,

    zIndex: 999,
    alignItems: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: THEME.Colors.white,
    borderRadius: 5,
  },
  indicatorSelected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.Colors.primary,
  },
});
