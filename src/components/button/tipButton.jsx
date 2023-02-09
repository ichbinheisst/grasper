import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  SharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  processColor,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

export default function TipButton({ data, response, setAssistant }) {
  const Opacity = useSharedValue(0);
  const stylingHint = useAnimatedStyle(() => {
    return {
      opacity: Opacity.value,
    };
  });

  function help() {
    if (!response) {
      return;
    }
    Opacity.value = withSpring(1);
    //Opacity.value=withDelay(3000,withSpring(0))
    const numberOfLetters = response.length;
    const initialLetter = response.split("")[0];
    setAssistant({
      numberOfLetter: numberOfLetters,
      starts: initialLetter,
      finishes: "",
    });
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.tipBox, stylingHint]}>
        <Text style={styles.tipBoxfont}>
          {data.numberOfLetter > 0 && "letters: " + data.numberOfLetter + "  "}

          {data.starts && "starts: " + data.starts}
        </Text>
      </Animated.View>
      <TouchableOpacity onPress={help} style={styles.helpButton}>
        <AntDesign name="infocirlce" size={45} color={"#0074e8"} />
        <Text>help</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  tipBox: {
    width: 220,
    height: 50,
    backgroundColor: "#01c1a2",
    borderRadius: 39,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  tipBoxfont: {
    fontSize: 22,
    color: "#fff",
  },
  helpButton: {
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginHorizontal: 30,
  },
});
