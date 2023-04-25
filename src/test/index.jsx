import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const buttons = [
  {
    name: "nome do button",
    id: 1,
    action: () => {},
  },
  {
    name: "nome do button",
    id: 2,
    action: () => {},
  },
];

export default function Component() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {buttons.map((item) => {
          <TouchableOpacity
            key={item.id}
            onPress={item.action}
            style={styles.button}
          >
            {item.name}
          </TouchableOpacity>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {},
});
