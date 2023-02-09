import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function PressableSentence({
  content,
  action,
  fontFamily,
  fontColor,
  boxColor
}) {
  return (
    <Pressable
      style={{
        ...styles.boxWord,
        backgroundColor: boxColor ? boxColor : "#fff",
      }}
      onPress={() => action(content)}
    >
      <Text
        style={{
          ...styles.fontWord,
          color: fontColor,
          fontFamily: fontFamily,
          flexWrap:'wrap'
        }}
      >
        {content.text}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  boxWord: {
    margin: 5,
    padding: 8,
    borderRadius: 5,
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
   minHeight: 40,
   shadowColor: "#000",
   shadowOpacity: 0.5,
   shadowRadius: 5,
   elevation: 6,
  },
  fontWord: {
    fontSize: 16,
    color: "#fff",
  },
});
