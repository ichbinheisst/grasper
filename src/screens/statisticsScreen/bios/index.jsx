import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function Bios() {
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <AntDesign name="left" size={33} />
        <AntDesign name="down-square-o" size={33} />
      </View>
      <Image
        style={styles.bioThumb}
        source={require("../../../../assets/mock/images/bighead.png")}
      />
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "700" }}>Main info</Text>
        <Text>sub Info</Text>
      </View>

      <View style={styles.bottomBarBox}>
        <View>
          <AntDesign name="HTML" size={24} />
          <Text>info</Text>
        </View>
        <View>
          <AntDesign name="HTML" size={24} />
          <Text>info</Text>
        </View>
        <View>
          <AntDesign name="HTML" size={24} />
          <Text>info</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "98%",

    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  bioThumb: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: "black",
  },
  bottomBarBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginTop: 30,
  },
});
