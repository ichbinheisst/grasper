import React from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import ActivityTemplate from "../template";
import ReaderFill from "./readerFill";
import SimplePlayer from "../../../components/simplePlayer";
const { width, height } = Dimensions.get("screen");
import {
  generateActivity,
  spellingCheck,
  PlayPause,
  StopPlay,
} from "./fillUpController";
import { song } from "../../../../mockup/album/track/song";
import ModalTip from "../components/modalHelp";
import { Globalaudio } from "../../context";
export default function FillouTheGaps({ navigation }) {
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
    slowDown,
    slowState,
  } = React.useContext(Globalaudio);
  const [activities, setActivities] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentActivity, setCurrentActivity] = React.useState();
  const [feedback, setFeedback] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [statusFeedback, setStatusFeedback] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [isSpellingCorrect, setIsSpellingCorrect] = React.useState("");
  const [useSpelling, setUseSpelling] = React.useState(false);

  /// first data entrance
  React.useEffect(() => {
    if (currentAudio && currentAudio.subtitle.length) {
      setActivities(generateActivity(currentAudio.subtitle).sort().reverse());
    }
    //;
  }, []);
  // set a current activity to be rendered

  React.useEffect(() => {
    if (activities && activities.length) {
      setCurrentActivity(activities[page]);
    }
  }, [activities, page]);

  const keyboard = React.useRef();

  function HideShowButton() {}

  function SpellingcheckerSwitch() {
    setUseSpelling(() => !useSpelling);
  }

  function SpellingStyle() {
    if (!useSpelling || !input.trim() || !currentActivity?.res) {
      return setIsSpellingCorrect("#fff");
    }
    setIsSpellingCorrect(() => {
      if (spellingCheck(currentActivity.res, input.trim())) {
        return "#089C57";
      }
      return "#e60023";
    });
  }

  function TurnFeedback(status) {
    setStatusFeedback(status);
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
    }, 2000);
  }

  async function Correct() {
    if (!input.trim()) {
      return;
    }

    if (currentActivity.res.trim() != input.trim()) {
      console.log(
        "correct:" + currentActivity.res.trim() + "input" + input.trim()
      );

      setInput("");
      setPage((previous) => previous + 1);
      TurnFeedback(0);
      return;
    }

    if (activities.length >= page) {
      setPage((previous) => previous + 1);
      setInput("");
      TurnFeedback(1);
      return;
    }
  }

  function generateFontSize(number) {
    if (number > 7) {
      return 16.5;
    }
    return 18;
  }

  async function closeOpenModal() {
    setModalVisible((prev) => !prev);
  }

  function clue() {
    closeOpenModal();
  }

  async function play() {
    await PlayPause(sound, setIsPLaying, activities, page);
  }

  React.useEffect(() => {
    SpellingStyle();
  }, [input, useSpelling]);
  React.useEffect(() => {
    if (sound && activities && activities.length && activities.length > page) {
      if (played > activities[page].time.to) {
        StopPlay(sound);
        setIsPLaying(false);
      }
    }
  }, [played, page]);

  return (
    <ActivityTemplate
      isDark={dark}
      check={Correct}
      page={page}
      total={activities.length}
      navigation={navigation}
      showFeedBack={feedback}
      statusFeedback={statusFeedback}
      showheaderButtonRight={true}
      headerFunction={clue}
      headerFunction2={SpellingcheckerSwitch}
      buttonState={useSpelling}
      showSubmitButton={true}
      backgroundImage={currentAudio.thumbnail}
    >
      <ModalTip
        info={currentActivity?.res.trim()}
        isvisible={modalVisible}
        action={closeOpenModal}
      />
      <View style={styles.activityContainer}>
        <View style={styles.playerBox}>
          <SimplePlayer
            action={play}
            isAnimate={isPlaying}
            isDark={dark}
            showSlow={true}
            slowdown={slowDown}
            slowState={slowState}
          />

          <View style={styles.boxSentences}>
            {currentActivity?.text.map((txt, index) => {
              return (
                <ReaderFill
                  input={input}
                  setInput={setInput}
                  text={txt}
                  key={index}
                  HideShowButton={HideShowButton}
                  Correct={Correct}
                  keyRef={keyboard}
                  inputTextColor={isSpellingCorrect}
                  isDark={dark}
                  fontSizing={generateFontSize(currentActivity.text.length)}
                />
              );
            })}
          </View>
        </View>
      </View>
    </ActivityTemplate>
  );
}
const styles = StyleSheet.create({
  activityContainer: {
    height: height > 700 ? "81%" : "80%",
    width: "90%",
    //backgroundColor:"blue"
  },
  playerBox: {
    width: 70,
    alignSelf: "center",
  },
  boxSentences: {
    width: width - 20,
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
});
