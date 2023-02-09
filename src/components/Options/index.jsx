import React from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
export default function OptionBox({ options, action,dark, color }) {

  const styles = StyleSheet.create({
    container: {
      width: "89%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      alignItems: "center",
      alignContent: "center",
      alignSelf: "center",
      flexWrap: "wrap",
    },
    OptionBox: {
      padding: 10,
      borderRadius: 100,
      borderWidth: 1,
      height: 40,
      // width: 80,
      borderColor: "#A200E8",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    fontStyle: {
      fontWeight: "600",
      color: dark? "#c6c6c6":"#A200E8",
    },
  });
  


  return (
    <View style={styles.container}>
      {options.map((el) => {
        return (
          <TouchableOpacity onPress={action} key={el} style={styles.OptionBox}>
            <Text style={styles.fontStyle}> {el}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
