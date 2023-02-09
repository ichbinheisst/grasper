import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
export default function LoadingScreen({navigation}) {
 

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#000"
  },
});
