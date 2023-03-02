import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { searchWebDictionary } from "../../useful/dictionary";
import speakUp from "../../useful/speak";
import {
  checkList,
  StoreList,
  getFavoriteList,
} from "../../useful/favoriteList";
import * as Speech from "expo-speech";

import { AntDesign } from "@expo/vector-icons";
export default function Ballon({
  word,
  squarePosition,
  data,
  isInFavorite,
  StoredFavoriteLists,
  shutdown,
  topColor
}) {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: -14,
          backgroundColor: !topColor ?"#fff":topColor,
          width: "100%",
          minWidth:130,
          borderTopEndRadius: 10,
          borderTopLeftRadius: 10,
          justifyContent:"flex-end",
          padding: 5,
        }}
      >
        <TouchableOpacity style={styles.Button} onPress={ shutdown}>
          <AntDesign name="close" size={25} color={ !topColor? "#rgb(0, 45, 90)":"#fff"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button}
          onPress={async () => !isInFavorite && (await StoredFavoriteLists(word))}
        >
          <AntDesign
            name="star"
            size={25}
            color={isInFavorite ? "#E8A417" : "rgb(0, 45, 90)"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button}
          onPress={async () => await searchWebDictionary(word, data.language)}
        >
          <AntDesign name="search1" size={25} color={!topColor? "#rgb(0, 45, 90)":"#fff"} />
        </TouchableOpacity>
      </View>
      <View style={styles.ballon}>
        <View style={styles.boxWord}>
          <TouchableOpacity
            style={{ marginHorizontal: 10, marginLeft: 12 }}
            onPress={() => speakUp(Speech, word, data.language)}
          >
            <MaterialIcons name="record-voice-over" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.wordfont}> {word} </Text>
        </View>
      </View>

      <View style={{ ...styles.triangle, left: squarePosition }} />
    </View>
  );
}
const styles = StyleSheet.create({
  ballon: {
    minWidth: 180,
    minHeight: 60,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "rgb(0, 165, 255)",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal:3,

    paddingTop: 10,
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgb(0, 165, 255)",
    transform: [{ rotate: "72deg" }],
    position: "absolute",
    bottom: -19,
    alignSelf: "center",
  },
  Button: {
    padding: 5,
    marginHorizontal: 5,
  },
  boxWord: {
    alignSelf: "center",
    marginTop: -10,
    marginLeft: -10,
    paddingHorizontal: 2,
    flexDirection: "row",
  },
  wordfont: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
/*



   <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginRight: -10,
            marginTop: -14,
          }}
        >
          <TouchableOpacity style={styles.Button}>
            <AntDesign
              name="star"
              size={20}
              color={false ? "#E8A417" : "#fff"}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button}>
            <AntDesign name="search1" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>



"#49454535"
*/
