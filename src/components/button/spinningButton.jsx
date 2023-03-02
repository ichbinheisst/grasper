import React from "react";
import { TouchableOpacity, Image, View, Text, Pressable } from "react-native";
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
} from "react-native-reanimated";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
export default function MyButton({ action, navigate }) {
  const getIconName = (type) => {
    switch (type) {
      case "playing":
        return "pausecircle";
      case "pausing":
        return "playcircleo";
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  const Opacity = useSharedValue(1);
  const Rotation = useSharedValue(0);
  const Size = useSharedValue(50);
  const Horizontal = useSharedValue(0);
  const Width = useSharedValue(0);
  const Color = useSharedValue(processColor("#fff"));
  const Vertical = useSharedValue(40);
  const styling = useAnimatedStyle(() => {
    return {
      opacity: Opacity.value,
      transform: [
        { rotateZ: `${Rotation.value}deg` },
        { translateY: Horizontal.value },
      ],
      width: Size.value,
      height: Size.value,
    };
  });

  const stylingBar = useAnimatedStyle(() => {
    return {
      width: Width.value,

      transform: [{ translateY: Vertical.value }],
    };
  });

  const stylingIconBox = useAnimatedStyle(() => {
    return {};
  });

  function handleClick() {
    // `worklet`;
    if (Rotation.value == 360) {
      setIsOpen(false);
      Rotation.value = withSpring(0);
      Vertical.value = withSpring(40);
      Width.value = withTiming(0);
      Size.value = withSpring(50);

      return;
    }
    setIsOpen(true);
    Rotation.value = withSpring(360);
    Size.value = withSpring(50);

    Vertical.value = withSpring(0);
    Width.value = withSpring(220);
  }

  //const bar = ["wordfile1", "qrcode", "book"];

  const bar = [
    {
      icon: "wordfile1",
      action: "setting",
    },
    {
      icon: "qrcode",
      action: "",
    },
    {
      icon: "book",
      action: "",
    },
  ];

  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            height: 50,
            borderRadius: 100,
            marginVertical: 10,
            backgroundColor: "#f8b133",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          },
          stylingBar,
        ]}
      >
        {bar.map((el, index) => {
          return (
            <Animated.View
              key={index}
              style={[stylingIconBox, { padding: 1, borderRadius: 100 }]}
            >
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  navigate(el.action);
                }}
              >
            
                  <AntDesign name={el.icon} size={20} color="#ffff" />
               
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.View>
      <Pressable
        onPress={handleClick}
        style={{ padding: 10, borderRadius: 10, marginTop: 10 }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: "#f8b133",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              borderRadius: 10,
              transform: [{ rotateZ: "20deg" }],
              shadowColor: "grey",
              shadowOffset: {
                width: 3,
                height: 1,
              },
              shadowOpacity: 1,
              shadowRadius: 1.2,
              elevation: 6,
            },
            styling,
          ]}
        >
          <AntDesign name={!isOpen ? "plus" : "minus"} size={35} color="#fff" />
        </Animated.View>
      </Pressable>
    </View>
  );
}
//#055CFA
