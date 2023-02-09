import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Slider from "@react-native-community/slider";
const { width, height } = Dimensions.get("screen");
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SimplePlayer({ action, isAnimate, isDark, slowdown,showSlow ,slowState}) {
  const styles = StyleSheet.create({
    container: {
      marginVertical: 20,
      padding: 10,
      backgroundColor: !isDark ? "#fff" : "#060606dc",
      borderRadius: 8,
      shadowColor: "#A200E8",
      shadowOffset: {
        width: 0.2,
        height: 0.1,
      },
      shadowOpacity: 2,
      shadowRadius: 2,
      elevation: 2,
    },
    animation: {
      width: 50,
      alignSelf: "center",
    },
    dashFont: {
      color: "#fff",
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={action}>
        {isAnimate ? (
          <LottieView
            autoPlay
            style={styles.animation}
            source={require("../../../assets/lottiesJson/play.json")}
          />
        ) : (
          <MaterialIcons name="audiotrack" size={50} color="#fff" />
        )}
      </TouchableOpacity>
      {
        showSlow && 
   

      <TouchableOpacity
        style={{
          position: "absolute",

          right: -100,
          top: 20,
          //height:50,
          padding: 4,
          justifyContent: "center",
          alignItems: "center",
          //width:40
        }}
        onPress={slowdown}
      >
        <MaterialCommunityIcons
          name="speedometer-slow"
          size={35}
          color=  {!slowState?"#fff":"#E8A417"}
        />
        <Text style={styles.dashFont}> Slow</Text>
      </TouchableOpacity>  
       }
    </View>
  );
}
