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
import Slider from "@react-native-community/slider";
const { width, height } = Dimensions.get("screen");
export default function PlayerB({
  nav,
  playPause,
  state,
  colorSchema,
  audioProps,
  audioLength,
  convertTime,
  played,
  sound,
  info,
  goAhead,
  goBack,
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
      height: 63,
      width: "94%",
      flexDirection: "row",
      backgroundColor:colorSchema.triade.thirdary,
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
      alignSelf: "center",
    },
    infoBox: {
      height: "80%",
      width: "60%",
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
      width: "45%",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
    },
  });

  return (
    <Animated.View style={[styles.container, opacityContainer]}>
      <View style={styles.infoBox}>
        <Text style={{ fontSize: 16, color: "#fff" }}>
          {convertTime(played)}
        </Text>
        <View style={styles.avatarInfo}>
          <Slider
            style={{
              slider: {
                width: "75%",
                height: 50,
                alignSelf: "center",
              },
            }}
            minimumValue={0}
            maximumValue={audioLength ? audioLength : 100}
            thumbTintColor={"#fff"}
            minimumTrackTintColor={"#fff"}
            maximumTrackTintColor={"#c6c6c6"}
            value={played}
            onSlidingComplete={(value) => {
              if (sound) {
                sound.setPositionAsync(value);
              }
            }}
          />
        </View>
      </View>
      <View style={styles.playerBox}>
        <TouchableOpacity style={{ padding: 5 }} onPress={goBack}>
          <AntDesign name="stepbackward" size={20} color="#fff" />
        </TouchableOpacity>

        <Animated.View style={[discAnimated, { padding: 5 }]}>
          <Pressable
            style={{
              height: 55,
              width: 55,
              backgroundColor: "#fff",
              borderRadius: 100,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              playPause();
              Animation();
            }}
          >
            <AntDesign
              name={!state ? "caretright" : "pause"}
              size={15}
              color={colorSchema.triade.thirdary}
            />
          </Pressable>
        </Animated.View>

        <TouchableOpacity style={{ padding: 5 }} onPress={goAhead}>
          <AntDesign name="stepforward" size={20} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
