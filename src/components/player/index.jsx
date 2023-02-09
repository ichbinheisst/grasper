import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";

export default function PlayerComponent({
  PlayPause,
  state,
  audioProps,
  audioLength,
  convertTime,
  played,
  sound,
  info,
  colorSchema,
}) {
  const styles = StyleSheet.create({
    timerFont: {
      //color: "#b7afaf",
      fontWeight: "bold",
      fontSize: 15,
      color: "#fff",
      margin: 10,
      right: 20,
    },
    timerBox: {
      margin: 0,
      marginRight: "13%",
      alignSelf: "flex-end",
    },
    trackNameFont: {
      fontSize: 23,
      fontWeight: "bold",
      color: colorSchema.font,
      margin: 5,
      //color:"#fff"
    },

    trackBookNameFont: {
      fontSize: 18,

      color: colorSchema.font,
      //color:"#fff"
    },
    trackContainer: {
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
      marginBottom: 13,
    },
    playerBox: {
      marginTop: -20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "110%",
      alignSelf: "center",
      paddingHorizontal: 10,
    },
    playerButton: {
      padding: 25,
      backgroundColor: "#fff",
      borderRadius: 100,
    },
    timerBack: {
      position: "absolute",
      fontWeight: "800",
      color: "#ffff",
      alignItems: "center",
      top: "40%",
      left: "26%",
      fontSize: 10,
      transform: [{ rotateZ: `-180rad` }],
    },
    timerOn: {
      position: "absolute",
      fontWeight: "800",
      color: "#ffff",
      alignItems: "center",
      top: "40%",
      left: "26%",
      fontSize: 10,
    },
    slider: {
      width: "75%",
      height: 20,
      alignSelf: "center",
    },
  });

  return (
    <View style={{ bottom: "0%", alignSelf: "center" }}>
      <View
        style={{
          height: "130%",
          backgroundColor: "#c6c6c6",
          width: "90%",
          position: "absolute",
          opacity: 0.05,
          alignSelf:"center"
        }}
      />

      <View style={styles.trackContainer}>
        <Text style={styles.trackNameFont}>{info?.title}</Text>
        <Text style={styles.trackBookNameFont}>{info?.artist}</Text>
      </View>

      <View style={{ ...styles.playerBox }}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={audioLength ? audioLength : 100}
          thumbTintColor={"#fff"}
          minimumTrackTintColor={"#fff"}
          maximumTrackTintColor={"#c6c6c6"}
          value={played}
          onSlidingComplete={(value) => {
            if (sound) {
              sound.setPositionAsync(value);
            }
          }}
        />
      </View>
      <View style={styles.timerBox}>
        <Text style={styles.timerFont}>{convertTime(played)}</Text>
      </View>

      <View style={{ ...styles.playerBox, width: "70%" }}>
        <TouchableOpacity>
          <View style={{ transform: [{ rotateZ: `180rad` }] }}>
            <Text style={styles.timerBack}> 15</Text>

            <AntDesign name="reload1" size={34} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={PlayPause}>
          <View style={styles.playerButton}>
            <AntDesign
              name={!state ? "caretright" : "pause"}
              size={20}
              color="#a200e8"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text style={styles.timerOn}> 15</Text>
            <AntDesign name="reload1" size={34} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//"caretright"
