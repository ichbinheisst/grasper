import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  SharedValue,
  withSpring,
  withRepeat,
  withSequence,
  processColor,
  withDelay,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("screen");
export default function BandPlayer({
  nav,
  playPause,
  state,
  setState,
  data,
  close,
  colorSchema,
}) {
  const [isPlaying, setIsPlaying] = React.useState(state);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);
  const opacityContainer = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const discAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}rad` }],
    };
  });
  function Animation() {
    setIsPlaying((x) => !x);
    rotation.value = withTiming(5, { duration: 200 });
    rotation.value = withDelay(200, withTiming(0, { duration: 200 }));
  }
  React.useEffect(() => {
    opacity.value = withTiming(0.8, { duration: 1000 });
  }, []);

  const styles = StyleSheet.create({
    container: {
      //height: 80,
      maxHeight: 60,
      width: "98%",
      flexDirection: "row",
      backgroundColor: colorSchema.colorFullPallet.mainColor,
      justifyContent: "space-around",
      borderRadius: 10,
      padding: 5,
      alignItems: "center",

      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowColor: colorSchema.main,
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 6,
      opacity: 0.1,
    },
    infoBox: {
      height: "80%",
      width: "70%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },

    avatar: {
      height: 43,
      width: 43,
      borderRadius: 50,
    },

    avatarInfo: {
      width: "60%",
    },

    h2: {
      fontSize: 12,
      fontWeight: "800",
      color: colorSchema.fontH3,
    },
    h4: {
      fontSize: 10,
      fontWeight: "800",
      color: colorSchema.fontH3,
    },

    playerBox: {
      height: "80%",
      width: "35%",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
    },
  });

  return (
    <Animated.View style={[styles.container, opacityContainer]}>
      <View style={styles.infoBox}>
        <TouchableOpacity onPress={nav}>
          <Image style={styles.avatar} source={data.thumbnail} />
        </TouchableOpacity>
        <View style={styles.avatarInfo}>
          <Text style={styles.h2}>{data.Track}</Text>
          <Text style={styles.h4}>{data.Artist}</Text>
        </View>
      </View>
      <View style={styles.playerBox}>
        <Animated.View style={[discAnimated, { padding: 5 }]}>
          <Pressable
            onPress={() => {
              playPause();
              Animation();
            }}
          >
            <AntDesign
              name={!state ? "caretright" : "pause"}
              size={25}
              color="#fff"
            />
          </Pressable>
        </Animated.View>

        <TouchableOpacity onPress={close} style={{ padding: 5 }}>
          <AntDesign name={"close"} size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
