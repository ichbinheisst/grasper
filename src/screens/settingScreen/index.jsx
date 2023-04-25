import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Image,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import colorSchema from "../../../colorSchemma/color";
import report from "../../../assets/reportMessages";
import { Audio } from "expo-av";
import ButtonSpinning from "../../components/button/spinningButton";
import * as Speech from "expo-speech";

export default function SettingScreenScreen({ navigation }) {
  const [status, setStatus] = React.useState();
  const [intro, setintro] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState(false);
  async function Report() {
    // Speech.speak(report(), {language:"pt-BR"})
    setIsPlaying(true);
    await intro.playAsync();
  }

  async function stopSpeech() {
    if (intro) {
      await intro.stopAsync();
    }
    if (Speech.isSpeakingAsync()) {
      await Speech.stop();
    }
  }

  async function LoadAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/reportMessages/track.mp3"),
      {
        ///positionMillis: 5000,
        // progressUpdateIntervalMillis: 1000,/// gives me controll over the time that it will be played from ,
        rate: 1,
        volume: 1,
      }
    );

    /*
    const timer = await sound.setPositionAsync((current) => {
      
    });
*/

    const status = await sound.getStatusAsync();

    sound.setOnPlaybackStatusUpdate((current) => {
      setStatus(current.positionMillis);
    });

    setintro(sound);
  }

  React.useEffect(() => {
    LoadAudio();
  }, []);

  React.useEffect(() => {
    async function turnDown(x) {
      await intro.setVolumeAsync(x);
    }

    if (status && intro && isPlaying) {
      if (status == 500 || status == 501) {
        turnDown(1);
      }
      if (status == 4000 || status == 4001) {
        Speech.speak(report(), { language: "en-US" });
        intro.setVolumeAsync(0.3);
      }
      if (status == 5000) {
        intro.setVolumeAsync(0.3);
      }
      if (status > 7000) {
        turnDown(0.1);
      }
      if (status > 15000 && isPlaying) {
        turnDown(0.05);
        setIsPlaying(false);
      }
    }
  }, [status]);

  async function Stop() {
    if (intro) {
      let status = await sound.getStatusAsync();
      if (status?.isPlaying) {
        intro.setOnPlaybackStatusUpdate(async (current) => {
          if (current.positionMillis > 20) {
          }
        });
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorSchema.main,
    },
  });






  return (
    <View style={styles.container}>
     

      <Button
        title="Video Screen"
        onPress={() => navigation.navigate("video")}
      />
      <Button
        title="orderTheSenteces"
        onPress={() => navigation.navigate("orderNext")}
      />
      <Button
        title="flasdCard"
        onPress={() => navigation.navigate("flashCard")}
      />
      <Button title="choose" onPress={() => navigation.navigate("choose")} />
      <Button title="load" onPress={() => navigation.navigate("load")} />
      <Button title="fill" onPress={() => navigation.navigate("fill")} />
      <Button
        title="unscramble"
        onPress={() => navigation.navigate("unscramble")}
      />
      <Button
        title="complete"
        onPress={() => navigation.navigate("complete")}
      />

      <Button title="Report" onPress={() => Report()} />
      <Button title="shutUp" onPress={() => stopSpeech()} />

      <Text style={{ color: "#ffff" }}>{status}</Text>


      <ButtonSpinning action={()=> {}}/>
    </View>
  );
}

