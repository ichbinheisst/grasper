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
import { color } from "react-native-reanimated";
const { width, height } = Dimensions.get("screen");
export default function TrackCard({
  colorSchema,
  action,
  data,
  index,
  state,
  trackPlayingInfo,
  action2,
}) {
  function checkPlaying() {
    if (state && trackPlayingInfo.id == data.id) {
      return true;
    }
    return false;
  }

  const styles = StyleSheet.create({
    container: {
      height: 65,
      // width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      alignItems: "center",
      borderBottomWidth: 0.3,
      borderColor: colorSchema.colorFullPallet.mainColor,
      marginTop: 5,
    },

    box: {
      flexDirection: "row",
      width: "70%",

      alignItems: "center",
    },

    boxInfo: {},
    player: {
      height: 40,
      width: 40,
      color: colorSchema.fontH3,
      borderRadius: 50,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    h2: {
      fontSize: 17,
      fontWeight: "500",
      color:  colorSchema.fontH3,
      marginRight: 20,
      marginBottom: 7,
    },
    iconBox: {
      flexDirection: "row",
    },
    subFont: {
      fontSize: 11,
      color:  colorSchema.fontH2,
    },
  });

  return (
    <Pressable style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.h2}>{index + 1}</Text>

        <View style={styles.boxInfo}>
          <Text style={styles.h2}>{data.Track}</Text>
          <Text style={styles.subFont}>{data.Artist}</Text>
        </View>
      </View>
      <View style={styles.iconBox}>
       
        <TouchableOpacity style={styles.player} onPress={() => action(index)}>
          <Feather
            name={!checkPlaying() ? "play-circle" : "pause-circle"}
            size={26}
            color="#989393"
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
