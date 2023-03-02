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

export default function Writter({ render, text, color, subText, propStyle }) {
  const leftBlider = useSharedValue(0);
  const opacityBlider = useSharedValue(1);

 const configStyle = {
  Titlefont:23
 }


  React.useEffect(() => {
    leftBlider.value = withTiming(100, { duration: 600 });
    opacityBlider.value = withTiming(0, { duration: 600 });
  }, [render]);

  const stylingBlinder = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: 100,
      height: 50,
      left: leftBlider.value,
      opacity: opacityBlider.value,
    };
  });

  const styles = StyleSheet.create({
    container: {
      maxWidth:"100%"
      //flexDirection: "row",
    },
    font: {
      fontSize: configStyle.Titlefont,
      fontWeight: "800",
      //fontFamily: "custom",
      color: color.fonts.h2,
     

    },
    block: {
      backgroundColor: color.background.primary,
      height: "100%",
      width: "60%",
    },
    descriptionBox: {
      width: 120,
      marginBottom: 20,
      marginTop: 10,
      height:100

    },
    descriptionBoxfont: {
      fontFamily: "custom",
      color: color.fonts.h3,
     
      
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.font}>{text.trim()}</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionBoxfont}>
        Lorem ipsum dolor sit amet, consectetur adipiscin
        </Text>
      </View>

      <Animated.View
        style={[stylingBlinder, { backgroundColor: color.background.primary }]}
      />
    </View>
  );
}
