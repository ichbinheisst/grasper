import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { searchWebDictionary } from "../../../../useful/dictionary";
const { width, height } = Dimensions.get("screen");
export default function WordCard({ colorSchema, action, data, index, state }) {
  const styles = StyleSheet.create({
    container: {
      height: 65,
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      alignSelf: "center",

      alignItems: "center",
      borderBottomWidth: 0.3,
      borderColor: "rgb(0, 165, 255)",
      marginTop: 5,
    },

    box: {
      flexDirection: "row",
      width: "60%",
      alignContent: "center",

      alignItems: "center",
    },

    boxInfo: {},
    player: {
      height: 40,
      width: 40,
      color: colorSchema.fontH2,
      borderRadius: 50,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    h2: {
      fontSize: 19,
      fontWeight: "500",
      color: "rgb(0, 45, 90)",
      marginRight: 10,
    },
    iconBox: {
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.h2}>{index + 1}</Text>
       <Text style={styles.h2}> {data?.body?.word} </Text>
      

      </View>
      <View style={styles.iconBox}>
        <TouchableOpacity
          style={{ marginHorizontal: 20, padding: 5 }}
          onPress={() => action(data)}
        >
          <AntDesign name="notification" size={20} color={"rgb(0, 45, 90)"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            if (data?.body?.word && data?.header?.language) {
              await searchWebDictionary(data.body.word, data.header.language);
            }
          }}
          style={{ padding: 5 }}
        >
          <AntDesign name="search1" size={20} color={"rgb(0, 45, 90)"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
