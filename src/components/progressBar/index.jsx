import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function ProgressBar({
  isDark,
  total,
  concluded,
  progressColor,
  fontColor,
  barwidth,
  showIcon,
}) {
  function CalculateBar(total, concluded) {
    if (!total || !concluded) {
      return 0;
    }
    let n1 = concluded * 10;
    return Math.round((n1 / total) * 10);
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    statusBox: {
      flexDirection: "row",
    },
    fullBar: {
      height: 10,
      width: width / 1.6,
      backgroundColor: !isDark? "#fff":"#c6c6c6",
      borderRadius: 20,
      margin: 10,
    },
    progress: {
      backgroundColor: "#4197ed",
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      height: "100%",
    },
  });


  return (
    <View style={styles.container}>
      {showIcon && (
        <View style={styles.statusBox}>
          <AntDesign name="heart" size={20} color="#e60023" />
          <Text style={{ color:isDark ?"#fff":"#000" }}>
            {" "}
            {total}/{concluded}
          </Text>
        </View>
      )}

      <View
        style={{
          ...styles.fullBar,
          width: barwidth ? barwidth : width / 1.6,
        }}
      >
        <View
          style={{
            ...styles.progress,
            backgroundColor: progressColor ? progressColor : "#4197ed",
            width: `${CalculateBar(total, concluded)}%`,
          }}
        />
      </View>
    </View>
  );
}


