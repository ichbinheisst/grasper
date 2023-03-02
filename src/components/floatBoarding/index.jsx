import React from "react";
import { View, Text, Dimensions } from "react-native";
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

export default function FloatingBoard({ show, value }) {
  const opacity = useSharedValue(0);

  const animatedStyling = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  React.useEffect(() => {
    opacity.value = withTiming(0.8, { duration: 500 });
    opacity.value = withDelay(800, withTiming(0, { duration: 500 }));

  }, [show]);

  

  return (
    <Animated.View style={[animatedStyling]}>
      <Animated.Text
        style={[
          {
            color: "rgb(0, 165, 255)",
            fontSize: 62,
            fontWeight: "bold",
          },
          animatedStyling,
        ]}
      >
        {value}
      </Animated.Text>
    </Animated.View>
  );
}
