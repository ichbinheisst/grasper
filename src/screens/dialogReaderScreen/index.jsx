import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";
import PlayerComponent from "../../components/player/index";
import colorSchema from "../../../colorSchemma/color";
import DialogCard from "./ components/DialogoCard";
import { Globalaudio } from "../context";
import txt from "../../../mockup/british/tracks/a1/dialongueMovie";
const { width, height } = Dimensions.get("screen");

export default function DialogReaderScreen() {
  const {
    sound,
    audioProps,
    audioLength,
    isPlaying,
    played,
    convertTime,
    playPause,
    ReadingLine,
    // data,
    currentAudio,
    setAudio,
    setSound,
    setIsPLaying,
    currentAlBum,
    slowDown,
    slowState,
  } = React.useContext(Globalaudio);

  const [data, setData] = React.useState(currentAudio.subtitle);
  const [showAll, setShowAll] = React.useState(true);

  function showUpTarget(time, dataItem, index) {
    if (showAll) {
      return true;
    }
    let select = false;
    let extra = 5000;

    if (
      time >= dataItem.time.from - extra + 1000 &&
      time <= dataItem.time.to + extra
    ) {
      return (select = true);
    }
    //
    return select;
  }

  return (
    <View View style={styles.container}>
      <Button
        title={showAll ? "hide" : "see"}
        onPress={() => setShowAll((prev) => !prev)}
      />

      <View style={styles.subtitleContainer}>
        <View style={{ alignItems: "flex-start", width: width / 1.1 }}>
          <ScrollView style={{ height: "100%" }}>
            {data.map((item, index) => {
              if (showUpTarget(played, item, index))
                return (
                  <DialogCard
                    state={played > item.time.from && played < item.time.to}
                    data={item}
                    key={index}
                  />
                );
            })}
          </ScrollView>
        </View>
      </View>
      <PlayerComponent
        PlayPause={playPause}
        state={isPlaying}
        audioProps={audioProps}
        audioLength={audioLength}
        convertTime={convertTime}
        played={played}
        sound={sound}
        info={currentAudio}
        colorSchema={colorSchema}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#000",
  },
  subtitleContainer: {
    height: "65%",
  },
});
