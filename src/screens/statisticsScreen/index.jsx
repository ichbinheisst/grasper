import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Bios from "./bios";
export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
    <Bios/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: "center",
    alignItems: "center",
    paddingTop:40
  },
});
