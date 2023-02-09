import React from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
export default function OptionBox({ options, action }) {
  const styles = StyleSheet.create({
    container: {
      width: "93%",
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20,
      alignItems: "center",
      alignContent: "center",
      alignSelf: "center",
      flexWrap: "wrap",
      marginBottom: 20,
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
      color: "#c6c6c6",
    },
  });

  return (
    <View style={styles.container}>
      {options.map((el, index) => {
        return (
          <Pressable
            onPress={() => action(index)}
            key={index}
            style={{
              ...styles.OptionBox,
              borderColor: el.select ? "#A200E8" : "#c6c6c6",
            }}
          >
            <Text style={styles.fontStyle}>{el.language}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
