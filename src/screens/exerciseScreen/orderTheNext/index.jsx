import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import ActivityTemplate from "../template";
import { Globalaudio } from "../../context";
import SimplePlayer from "../../../components/simplePlayer";
import * as Haptics from "expo-haptics";
import PressableSentence from "./PressableSentence";
import {
  PlayPause,
  StopPlay,
  generateExercise,
} from "./orderTheNextController";
import colorSchema from "../../../../colorSchemma/color";
export default function OrderTheNext({ navigation }) {
  const dark = true;
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
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [current, setCurrent] = React.useState();

  const [res, setRes] = React.useState([]);

  React.useEffect(() => {
    if (currentAudio && currentAudio?.subtitle) {
      setData(generateExercise(currentAudio.subtitle).sort());
    }
  }, []);

  React.useEffect(() => {
    if (data.length && page < data.length) {
      setCurrent(data[page]);
    }
  }, [data, page]);

  React.useEffect(() => {
    if (sound && current) {
      if (played >= current.time.to) {
        StopPlay(sound);
        setIsPLaying(false);
      }
    }
  }, [played, sound]);

  React.useEffect(() => {
    if (current && current?.sentences.length == 0 && res.length) {
      StopPlay(sound);
      setIsPLaying(false);
      const response = res
        .map((el) => el.text)
        .reduce((prev, cur) => prev + cur);

      if (response == current.answer) {
        setAnimationStatus(1);
        setFeedBack(true);
        setTimeout(() => {
          setFeedBack(false);
        }, 1000);
      } else {
        setAnimationStatus(0);
        setFeedBack(true);
        setTimeout(() => {
          setFeedBack(false);
        }, 1000);
      }

      setRes([]);
      setPage((prev) => prev + 1);
    }
  }, [res]);

  async function play() {
    await PlayPause(sound, setIsPLaying, current);
  }

  function order(element) {
    setRes((previous) => {
      if (previous.find((el) => el.textId == element.textId)) return previous;
      return [...previous, element];
    });
    setCurrent((prev) => {
      const item = prev;
      item.sentences = prev.sentences.filter(
        (el) => el.textId != element.textId
      );
      return item;
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  function PutitBack(element) {
    setRes((previous) => {
      const items = previous.filter((el) => el.textId != element.textId);
      return items;
    });

    setCurrent((prev) => {
      const item = prev;
      if (prev.sentences.find((el) => el.textId == element.textId)) return item;

      return { ...item, sentences: [...item.sentences, element] };
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  return (
    <ActivityTemplate
      navigation={navigation}
      isDark={colorSchema.dark}
      total={data.length}
      page={page}
      showFeedBack={feedBack}
      statusFeedback={animationsStatus}
    >
      <ScrollView>
        <View style={styles.activityContainer}>
          <Text style={styles.anouncementFont}>Order the sentences</Text>
          <SimplePlayer action={play} isAnimate={isPlaying} isDark={colorSchema.dark} />
          <View
            style={{
              minHeight: 50,
              width: "95%",
              borderWidth: 1,
              marginBottom: 20,
              borderBottomColor: "#fff",
            }}
          >
            {res?.map((sentence, index) => {
              return (
                <View
                  key={index}
                  style={{ maxWidth: "95%", alignSelf: "center", minWidth:"96%" }}
                >
                  <PressableSentence
                    content={sentence}
                    action={PutitBack}
                    boxColor={"#E8A417"}
                    fontColor={"#fff"}
                  />
                </View>
              );
            })}
          </View>

          {current &&
            current.sentences.map((sentence, index) => {
              return (
                <View
                  key={index}
                  style={{ maxWidth: "95%", alignSelf: "center",minWidth:"86%"  }}
                >
                  <PressableSentence
                    content={sentence}
                    action={order}
                    boxColor={"rgb(50, 60, 69)"}
                    fontColor={"#fff"}
                    index={index}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
    </ActivityTemplate>
  );
}
const styles = StyleSheet.create({
  activityContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    paddingTop: "5%",
  },

  anouncementFont: {
    fontSize: 18,
    marginBottom: 10,
    color: "rgb(50, 60, 69)",
  },

  sentenceBox: {
    padding: 30,
    marginVertical: "10%",
  },

  fontSentence: {
    fontSize: 24,
    fontWeight: "500",
  },
});
