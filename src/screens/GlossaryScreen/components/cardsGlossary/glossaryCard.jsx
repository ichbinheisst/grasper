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
const { width, height } = Dimensions.get("screen");
export default function TrackCard({
  colorSchema,
  action,
  data,
  index,
  state,
  trackPlayingInfo,

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
      borderColor: "#A200E8",
      marginTop: 5,
    },

    box: {
      flexDirection: "row",
      width: "90%",

      alignItems: "center",
    },

    boxInfo: {

    },
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
      fontSize: 17,
      fontWeight: "500",
      color: "#fff",
      marginRight: 10,
      marginBottom:7

    },
    iconBox: {
      flexDirection: "row",
    },
  });


   
  


  return (
    <Pressable style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.h2}>{index  +1}</Text>

        <View style={styles.boxInfo}>
          <Text style={styles.h2}> {data.name} </Text>
          <Text style={{fontSize:11, color:"#787373"}}>I,you,he,she,it... </Text>
        </View>
      </View>
      <View style={styles.iconBox}>
       
        <TouchableOpacity>
        <AntDesign name="checksquareo" size={24} color= {index == 2 ?"#fff":"#787373"} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
