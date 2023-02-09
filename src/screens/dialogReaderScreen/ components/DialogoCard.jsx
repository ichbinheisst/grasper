import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
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

export default function DialogCard({ state, OpacityValue, data }) {
  const opacityMessage = useSharedValue(0);
  let value = OpacityValue ? 0.2 : 1;

  const stylinContainer = useAnimatedStyle(() => {
    return {
      opacity: opacityMessage.value,
    };
  });

  const messageContainerStyling = useAnimatedStyle(() => {
    return {
      opacity: opacityMessage.value,
    };
  });

  React.useEffect(() => {
    Animation(state);
  }, [state]);

  function Animation(state) {
    if (state) {
      opacityMessage.value = withTiming(value, { duration: 100 });
      return;
    }
    opacityMessage.value = withTiming(0.6, { duration: 100 });
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: 30,
    },
    bioBox: {
      marginRight: 5,
      // backgroundColor: "#fff",
      borderRadius: 100,
      padding: 2,
      borderColor: "#A200E8",
      borderWidth: 2,
    },
    bio: {
      width: state ? 40 : 30,
      height: state ? 40 : 30,
      borderRadius: 100,
    },
    messageContainer: {
      backgroundColor: "#A200E8",
      padding: 5,
      borderRadius: 10,
      maxWidth: "80%",
    },
    bioNameFont: {
      fontSize: 11,
      color: "#fff",
      paddingBottom: state ? 10 : 5,
    },
    messageFont: {
      fontSize: state ? 19 : 15,
      color: "#fff",
    },
  });

  const pic1 = require("../assets/per1.jpeg");
  const pic2 = require("../assets/per2.jpeg");

  return (
    <Animated.View style={[styles.container, stylinContainer]}>
      <TouchableOpacity style={styles.bioBox} onPress={Animation}>
        <Image
          style={styles.bio}
          source={data.name == "Tamara:" ? pic2 : pic1}
        />
      </TouchableOpacity>
      <Animated.View style={[styles.messageContainer, messageContainerStyling]}>
        <Text style={styles.bioNameFont}>{data.name}</Text>
        <Text style={styles.messageFont}>{data.text}</Text>
      </Animated.View>
    </Animated.View>
  );
}
