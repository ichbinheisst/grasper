import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const reapetedName = [1, 2, 3];
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
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("screen");

export default function Disc({ state, action }) {
  const [isPlaying, setIsplayingAnimated] = React.useState(false);
  const [targetReadLine, setTargetReadLine] = React.useState(0);
  const turn = useSharedValue(0.1);
  const needRotate = useSharedValue(0);
  const needlePositionRight = useSharedValue(65);
  const needlePositionTop = useSharedValue(50);
  const titleAnimatedLeft = useSharedValue(width / 5);

  const discAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${turn.value}rad` }],
      //marginLeft: -50,
    };
  });

  const NeddleAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${needRotate.value}rad` }],
      right: needlePositionRight.value,
      top: needlePositionTop.value,
    };
  });

  function ActivateNeedleAnimation() {
    if (!state) {
      needRotate.value = withTiming(0.1, { duration: 500 });
      needlePositionRight.value = withTiming(65, { duration: 400 });

      needlePositionTop.value = 50;
      turn.value = 0;
      titleAnimatedLeft.value = width / 5;
      titleAnimatedLeft.value = withTiming(width, { duration: 30000 });

      return;
    }
    turn.value = withRepeat(withTiming(50, { duration: 35 * 1000 }));
    needRotate.value = withTiming(0.5, { duration: 500 });
    needlePositionRight.value = withTiming(85, { duration: 500 });
    needlePositionTop.value = 40;
    titleAnimatedLeft.value = width / 5;
    titleAnimatedLeft.value = withTiming(-width, { duration: 30000 });
  }

  const styles = StyleSheet.create({
    backgroundColorImageAlbum: {
      position: "absolute",
      alignSelf: "center",
      opacity: 0,
      width: "90%",
      borderRadius: 10,
    },

    backgroundColorImage: {
      position: "absolute",
      width: 240,
      alignSelf: "center",
      height: 240,
      opacity: 1, // 0.4 default
      borderRadius: 100,
    },

    header: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      marginTop: 30,
      marginBottom: 80,
      alignItems: "center",
      padding: 20,
    },
    discContainer: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width: "100%",
      alignContent: "center",
     // backgroundColor: "#000",
      borderRadius: 10,
      
    },

    discBox: {
      justifyContent: "center",
      alignItems: "center",
      width: 250,
      height: 250,

      borderRadius: 130,

      ///borderRightColor: "#0074e8",
      //borderBottomColor: "#0074e8",
      // backgroundColor: "#fff",
    },

    disc: {
      width: height / 3,
      height: height / 3,

      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    centerDisc: {
      width: 50,
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 100,
      position: "absolute",
      alignSelf: "center",
    },
    timerFont: {
      //color: "#b7afaf",
      fontWeight: "bold",
      fontSize: 15,
      //color:"#fff"
    },
    timerBox: {
      margin: 2,
      marginRight: "10%",
      alignSelf: "flex-end",
    },
    trackNameFont: {
      fontSize: 23,
      fontWeight: "bold",

      margin: 5,
      // color:"#fff"
    },

    trackBookNameFont: {
      fontSize: 18,

      color: "#3230305f",
      // color:"#fff"
    },
    trackContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20%",
    },
    playerBox: {
      marginTop: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: "80%",
      alignSelf: "center",
      paddingHorizontal: 10,
    },
    playerButton: {
      padding: 20,
      //backgroundColor: "#0074e8",
      borderRadius: 100,
      shadowOffset: {
        width: 4,
        height: 5,
      },
      shadowColor: "#8c8585",
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 4,
      borderWidth: 0.8,
      borderColor: "#c7c7c7",
    },
  });

  React.useEffect(() => {
    ActivateNeedleAnimation();
  }, [state]);

  return (
    <View style={styles.discContainer}>
       
      <View style={styles.discBox} colors={["#0074e8", "#d30df1", "#0074e8"]}>
        <Animated.View style={[discAnimated]}>
          <Image
            style={styles.disc}
            source={require("../../../assets/mock/images/vinil.png")}
          />
        </Animated.View>
       
      </View>
    </View>
  );
}
