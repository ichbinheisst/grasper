import React from "react";
import { View, Text, StyleSheet } from "react-native";

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

export default function Writter({ render, text, dark }) {

  const leftBlider = useSharedValue(0);
  const opacityBlider= useSharedValue(1);

  React.useEffect(()=> {
    leftBlider.value = withTiming(100,{duration:600})
    opacityBlider.value = withTiming(0,{duration:600})

  },[render])

    

  const stylingBlinder = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: 100,
      height: 50,
      left:leftBlider.value,
      opacity:opacityBlider.value
    };
  });



  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    font: {
      fontSize: 18,
      fontWeight: "400",
      //fontFamily: "custom",
      color: dark? "#fff":"#000",
    },
    block: {
      backgroundColor: "#fff",
      height: "100%",
      width: "50%",
    },
  });
  

  return (
    <View style={styles.container}>
      <Text style={styles.font}>{text}</Text>
      <Animated.View style={[stylingBlinder, { backgroundColor: dark? "#000":"#fff" }]} />
    </View>
  );
}
