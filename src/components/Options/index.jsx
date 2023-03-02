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
      marginTop: 10,
      alignItems: "center",
      alignContent: "center",
      alignSelf: "center",
      flexWrap: "wrap",
    },
    OptionBox: {
      padding: 10,
      borderRadius: 100,
      borderWidth: dark? 1:0,
      height: 40,
      
      borderColor: "rgb(33, 35, 37)",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color.background.darkest
    },
    fontStyle: {
      fontWeight: "600",
      color:color.fonts.h4_light,
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
