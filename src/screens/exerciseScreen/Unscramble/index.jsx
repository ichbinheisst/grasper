import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import SimplePlayer from "../../../components/simplePlayer";
import { Globalaudio } from "../../context";
import ActivityTemplate from "../template";
const { width, height } = Dimensions.get("screen");
import PressableBox from "../../../components/PressableBox";
import * as Speech from "expo-speech";
import * as Haptics from "expo-haptics";
import speakUp from "../../../useful/speak";
import {
  Pagination,
  assembleExercise,
  unsScramble,
  Correct,
  PlayPause,
  stopAudio,
  StopPlay,
} from "./unscrambleController";
import colorSchema from "../../../../colorSchemma/color";
const dark = true;
export default function UnscrambleScreen({ navigation }) {
  const {
    sound,
    audioProps,
    audioLength,
    isPlaying,
    played,
    convertTime,

    ReadingLine,

    currentAudio,
    setAudio,
    setSound,
    setIsPLaying,
    currentAlBum,
    slowState,
    slowDown,
  } = React.useContext(Globalaudio);

  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [sentenceCurrent, setSentenceCurrent] = React.useState([]);
  const [animationsStatus, setAnimationStatus] = React.useState(0);
  const [feedBack, setFeedBack] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [res, setRes] = React.useState([]);

  function unsScrambleSetence(word) {
    //console.log(word.word)
    speakUp(Speech, word.word, currentAudio.language);
    unsScramble(word, setSentenceCurrent, setRes);
  }
  function putThewordBack(word) {
    unsScramble(word, setRes, setSentenceCurrent);
  }
  async function Player() {
    await PlayPause(sound, setIsPLaying, data, page);
  }

  function CorrectActivity() {
    if (!res.length) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    Correct(
      res,
      setRes,
      data,
      page,
      setPage,
      setAnimationStatus,
      setFeedBack,
      feedBack
    );
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  React.useEffect(() => {
    setData(assembleExercise(currentAudio.subtitle));
  }, []);

  React.useEffect(() => {
    if (data && data.length && page == data.length) {
      navigation.navigate("choose");
    }
  }, [page]);

  React.useEffect(() => {
    if (data && page < data.length) {
      Pagination(data, page, setSentenceCurrent);
      setTotal(data.length);
    }
  }, [data, page]);

  React.useEffect(() => {
    if (sound && data && data.length && data.length > page) {
      if (played > data[page].time.to) {
        StopPlay(sound);
        setIsPLaying(false);
      }
    }
  }, [played, page]);

  const styles = StyleSheet.create({
    activityContainer: {
      height: height > 700 ? "76%" : "76%",
      width: "90%",
      //backgroundColor:"blue"
    },
    title: {
      fontSize: 20,
      color: colorSchema.dark ? "#fff" : "#000",
    },
    playerBox: {
      width: 70,
      alignSelf: "center",
    },
    containerWord: {
      flexDirection: "row",
      flexWrap: "wrap",
      minHeight: 100,

      marginBottom: 2,
      width: width - 20,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "blue",
    },
    resBox: {
      marginTop: -20,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: 2,
    },
  });

  return (
    <ActivityTemplate
      navigation={navigation}
      check={CorrectActivity}
      total={total}
      page={page}
      showFeedBack={feedBack}
      statusFeedback={animationsStatus}
      showSubmitButton={true}
      isDark={colorSchema.dark}
      backgroundImage={currentAudio.thumbnail}
    >
      <Text style={styles.title}>Listen and order the sentences:</Text>
      <View style={styles.activityContainer}>
        <View style={styles.playerBox}>
          <SimplePlayer
            action={Player}
            isAnimate={isPlaying}
            isDark={colorSchema.dark}
            showSlow={true}
            slowState={slowState}
            slowdown={slowDown}
          />
        </View>

        <View style={styles.containerWord}>
          {sentenceCurrent?.map((wrd, index) => {
            return (
              <PressableBox
                key={index * Math.random() * 100}
                content={wrd}
                action={unsScrambleSetence}
                fontColor={ "#fff"}
                boxColor={"rgb(0, 165, 255)"}
              />
            );
          })}
        </View>

        <View style={styles.resBox}>
          {res?.map((wrd, index) => {
            return (
              <PressableBox
                key={index * Math.random() * 100}
                content={wrd}
                action={putThewordBack}
                fontColor={"#fff"}
                boxColor={"#E8A417"}
              />
            );
          })}
        </View>
      </View>
    </ActivityTemplate>
  );
}
