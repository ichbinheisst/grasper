import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";
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

export function HeaderRight({
  action,
  actions2,
  buttonState2,
  isShowButtonOne,
  isShowButtonTwo,
}) {
  const Left = useSharedValue(0);

  const stylingButton = useAnimatedStyle(() => {
    return {
      left: Left.value,
    };
  });

  function AnimateButton() {
    Left.value = withSpring(20);
    Left.value = withDelay(300, withSpring(0));
  }

  return (
    <View style={{ flexDirection: "row", right:-10 }}>
      {isShowButtonOne && (
        <Animated.View>
          <TouchableOpacity
            style={styles.boxRight}
            onPress={() => {
              if (actions2) {
                actions2();
              }
            }}
          >
            <FontAwesome5
              name="spell-check"
              size={24}
              color={buttonState2 ? "#37E80C" : "#fff"}
            />
          </TouchableOpacity>
        </Animated.View>
      )}

      {isShowButtonTwo && (
        <Animated.View style={[stylingButton]}>
          <TouchableOpacity
            style={styles.boxRight}
            onPress={() => {
              if (action) {
                action();
                 AnimateButton();
              }

             
            }}
          >
            <AntDesign name="gift" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

export function HeaderLeft({ action }) {
  return (
    <View style={styles.containerLeft}>
      <TouchableOpacity onPress={action}>
        <Ionicons name="chevron-back" size={30} color={"rgb(0, 165, 255)"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  boxRight: {
    width: 40,
    height: 40,
    borderRadius: 29,
    marginRight: 20,
    marginTop: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLeft: {
 
    flexDirection: "row",
    alignItems: "center",
    left:-10
  },
});
