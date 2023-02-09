import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ActivityTemplate from "../template";
import { Globalaudio } from "../../context";
import {
  generateActivity,
  PlayPause,
  StopPlay,
} from "./chooseTheRightAlternativeController";
import PressableBox from "../../../components/PressableBox";
import SimplePlayer from "../../../components/simplePlayer";

export default function ChooseTheRightAlternativeScreen({ navigation }) {
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
  } = React.useContext(Globalaudio);

  const [animationsStatus, setAnimationStatus] = React.useState(0);
  const [feedBack, setFeedBack] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [data, setData] = React.useState();
  const [page, setPage] = React.useState(0);
  const [current, setCurrent] = React.useState();
  const [slowState,setSlowState] = React.useState(false)


  const dark = true;

  const styles = StyleSheet.create({
    activityContainer: {
      height: "80%",
      width: "100%",
      alignItems: "center",
      paddingTop: "5%",
    },

    sentenceBox: {
      padding: 30,
      marginVertical: "10%",
    },

    fontSentence: {
      fontSize: 24,
      fontWeight: "500",
      color: dark ? "#fff" : "#000",
    },
    wordContainer: {
      flexDirection: "row",
    },
  });

  React.useEffect(() => {
    if (currentAudio.subtitle) {
      setData(generateActivity(currentAudio.subtitle));
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      if (page >= data.length) {
        navigation.navigate("fill");
        return;
      }
      setCurrent(data[page]);
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



  async function play() {
    await PlayPause(sound, setIsPLaying, current);
  }

  async function Correct({ word }) {
    if (!word) {

      return;
    }
    await StopPlay(sound);
    if (word == current.answer) {
      setPage((prev) => prev + 1);
      setAnimationStatus(1);
      setFeedBack(true);
      setTimeout(() => {
        setFeedBack(false);
      }, 500);

      return;
    }
    setAnimationStatus(0);
    setFeedBack(true);

    setTimeout(() => {
      setFeedBack(false);
    }, 500);
  }
  async function slowDown() {
    let status = await sound.getStatusAsync();
    if (status.rate == 1) {
       setSlowState(true)
      await sound.setRateAsync(0.6, true);
      return;
    }
    setSlowState(false)
    await sound.setRateAsync(1, true);
  }

  return (
    <ActivityTemplate
      isDark={dark}
      navigation={navigation}
      showFeedBack={feedBack}
      statusFeedback={animationsStatus}
      total={data?.length}
      page={page}
    >
      <View style={styles.activityContainer}>
        <SimplePlayer action={play} isAnimate={isPlaying} isDark={dark}   showSlow={true}  slowdown={slowDown} slowState={slowState}/>
        {current && (
          <View style={styles.sentenceBox}>
            <Text style={styles.fontSentence}>{current.sentence}</Text>
          </View>
        )}

        <View style={styles.wordContainer}>
          {current &&
            current.options.map((word, index) => {
      
              return (
                <PressableBox
                  content={{ word }}
                  action={Correct}
                  key={index}
                  boxColor={"#72109C"}
                  fontColor={"#fff"}
                />
              );
            })}
        </View>
      </View>
    </ActivityTemplate>
  );
}
