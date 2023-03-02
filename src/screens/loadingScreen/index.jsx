import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
export default function LoadingScreen({navigation, color}) {
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:color.background.primary
  },
});


  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        source={require("../../../assets/lottiesJson/Loading.json")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}
