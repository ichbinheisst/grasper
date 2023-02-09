import React from "react";
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
import * as Speech from "expo-speech";

export default function SettingScreenScreen({ navigation }) {
  const [status, setStatus] = React.useState();
  const [intro, setintro] = React.useState();

  async function Report() {}

  async function stopSpeech() {
    if (Speech.isSpeakingAsync()) {
      await Speech.stop();
      if (intro) {
        await await intro.stopAsync();
      }
    }
  }

  async function LoadAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/reportMessages/track.mp3"),
      {
        ///positionMillis: 5000,
        // progressUpdateIntervalMillis: 1000,/// gives me controll over the time that it will be played from ,
        rate: 1,
      }
    );
    const timer = await sound.setPositionAsync((current) => {
      setStatus(current.positionMillis);
    });
    const status = sound.getStatusAsync().isPlaying;
    setintro(sound);
  }

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

  return (
    <View style={styles.container}>
      <Image
        style={{ opacity: 0.2, right: "-15%", position: "absolute" }}
        source={require("../../../assets/gibson.jpeg")}
      />

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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
