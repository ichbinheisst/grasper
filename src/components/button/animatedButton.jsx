import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
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
import LottieView from "lottie-react-native";
export default function AnimatedButton({ action, isAnimated }) {
  function animateButton() {
    buttonWidth.value = withSpring(width - 120);
    buttonTop.value = withSpring(-20);
    buttonWidth.value = withDelay(150, withSpring(width - 100));
    buttonTop.value = withDelay(150, withSpring(0));
  }

  const buttonWidth = useSharedValue(width - 100);
  const buttonHeight = useSharedValue(50);
  const buttonTop = useSharedValue(0);

  const stylingButton = useAnimatedStyle(() => {
    return {
      height: buttonHeight.value,
      width: buttonWidth.value,
      top: buttonTop.value,
    };
  });

  return (
    <Pressable
      onPress={() => {
        if (isAnimated) {
          animateButton();
        }

        action();
      }}
    >
      <Animated.View style={[styles.checkButton, stylingButton]}>
        <Text style={styles.checkButtonFont}>Check</Text>
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  checkButton: {
    backgroundColor: "#A200E8",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0000",
    shadowOffset: {
      width: 3,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 4.2,
    elevation: 6,
  },

  checkButtonFont: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});
