import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { useRef, useEffect } from "react";
import { Player, defineAnimations } from "./feedbackController";

export default function FeedbBackAnimation({ status }) {
  const animation = useRef(null);

 

 

  React.useEffect(() => {
    Player(status)
    animation.current?.play();
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <LottieView
        autoPlay
        style={{ ...styles.lottie, marginTop: -20 }}
        source={defineAnimations(status)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },

  titleBox: {
    padding: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#AEC5E9",
  },
  loadingText: {},
});
