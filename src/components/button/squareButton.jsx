import React from "react";
import { View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function SquareButton({action}) {
  return (
    <Pressable
      onPress={action}
      style={{ padding: 10, borderRadius: 10, marginTop: 10 }}
    >
      <View
        style={{
          backgroundColor: "#f8b133",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          borderRadius: 100,
          height:60,
          width:60,
          elevation: 6,
        }}
      >
        <AntDesign name={"qrcode"} size={35} color="#fff" />
      </View>
    </Pressable>
  );
}
