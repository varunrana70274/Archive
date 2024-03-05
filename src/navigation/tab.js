import { View, Text, TouchableOpacity, Image } from "react-native";
import { Colors } from "../libs/theme";

export function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#23242780",
        width: "90%",
        alignSelf: "center",
        paddingHorizontal: "4%",
        paddingVertical: "5%",
        borderRadius: 20,
        justifyContent:'space-between'
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if(route.name=='Home'){
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[{ flex: 1,alignItems:'center',  },isFocused?{shadowOpacity:1,shadowOffset:{height:-10,width:-4},shadowColor:Colors.primary}:null]}
          >
            <Image
              resizeMode="contain"
              style={{ height: 20, width: 20,}}
              source={
                route.name==='Home'?
                require("../v3/bottom/swipe.png"):
                route.name==='Like'?
                require("../v3/bottom/heart.png"):
                route.name==='Add'?
                require("../v3/bottom/add.png"):
                route.name==='Chat'?
                require("../v3/bottom/Message.png"):
                require("../v3/bottom/User.png")
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
