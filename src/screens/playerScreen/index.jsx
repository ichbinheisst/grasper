import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DiscContainer from "../../components/disc";
import colorSchema from "../../../colorSchemma/color";
import PlayerComponent from "../../components/player";
const { width, height } = Dimensions.get("screen");
import Reader from "../../components/reader";
import { Globalaudio } from "../context";

import { HeaderLeft } from "../exerciseScreen/header";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import * as Speech from "expo-speech";
import speakUp from "../../useful/speak";
import { searchWebDictionary } from "../../useful/dictionary";
import { checkList, StoreList } from "../../useful/favoriteList";
export default function PlayerScreen({ navigation }) {
  const dark = true;
  const [displayText, setDisplayText] = React.useState(false);
  const [isSearch, setISearch] = React.useState(false);
  const [selectedWord, setSelectedWord] = React.useState(false);
  const [fontSizeSub, SetFontSizeSub] = React.useState(16);
  const [isInFavorite, SetInFavorite] = React.useState(false);
  const {
    sound,
    audioProps,
    audioLength,
    isPlaying,
    played,
    convertTime,
    playPause,
    ReadingLine,
    data,
    currentAudio,
    setAudio,
    setSound,
    setIsPLaying,
    currentAlBum,
    slowDown,
    slowState,
  } = React.useContext(Globalaudio);

  function DisplayText() {
    setDisplayText((prev) => !prev);
  }
  function SizeTheFonts() {
    if (fontSizeSub > 24) {
      SetFontSizeSub((prev) => prev - 10);
      return;
    }
    SetFontSizeSub((prev) => prev + 2);
  }
  async function LaunchActivity() {
    if (!sound) {
      return;
    }
    let status = await sound.getStatusAsync();
    if (status?.isPlaying) {
      await playPause();
    }
    navigation.navigate("unscramble");
  }

  async function handleSearch() {
    if (selectedWord) {
      await searchWebDictionary(selectedWord, currentAudio.language);
      return;
    }
  }

  async function StoredFavoriteLists(vocabulary) {
    const response = await StoreList(vocabulary, currentAlBum.language);
    if (response) {
      SetInFavorite(true);
    }
  }

  React.useEffect(() => {
    if (selectedWord) {
      speakUp(Speech, selectedWord, currentAudio.language);
    }
  }, [selectedWord]);

  React.useEffect(() => {
    if (selectedWord) {
      const checkWord = async () => {
        SetInFavorite(await checkList(selectedWord));
      };
      checkWord();
    }
  }, [selectedWord, StoredFavoriteLists]);

  React.useEffect(() => {
    if (currentAudio.isDialogue) {
      navigation.navigate("dialogue");
    }
    // gambiarra teste
  }, []);
  const styles = StyleSheet.create({
    backgroundImage: {
      height: "100%",
      width: "100%",
      opacity: displayText ? 0.05 : 0.2,
      position: "absolute",
    },
    container: {
      flex: 1,
      backgroundColor: dark
        ? "#000"
        : colorSchema.colorFullPallet.mainSuperDark,
      alignItems: "center",
    },
    ButtonBar: {
      height: 40,
      width: 40,
    },
    ButtonBarText: {
      height: 40,
      width: 40,
      marginTop: 10,
    },
    barWrapper: {
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: 10,
      alignItems: "center",
      width: "100%",
    },
    containerBar: {
      flexDirection: "row",
      width: "30%",
      justifyContent: "space-around",
      alignSelf: "flex-end",
    },
    playerbox: {
      position: "absolute",
      bottom: "6%",
    },

    switchBox: {
      top: "2%",
      alignSelf: "flex-end",
      paddingHorizontal: 20,
    },
    switchTitle: {
      marginTop: 10,
    },
    dashFont: {
      color: "#fff",
      fontSize: 8,
    },

    topDashBoardContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignSelf: "flex-end",
      alignItems: "center",
      width: "34%",
      marginTop: -10,
    },
    selectedWordContainer: {
      position: "absolute",
      bottom: "28%",
      flexDirection: "row",
      alignSelf: "center",
      left:70,
      borderRadius: 10,
    },
    selectedWordBoxColor: {
      flexDirection: "row",
      backgroundColor: "#A200E8",
      borderRadius: 10,
      flexWrap: "wrap",
    },
    selectedWordButton: {
      alignSelf: "center",
      padding: selectedWord ? 17 : 0,
      alignItems: "center",
      marginRight: 10,
    },
    selectedWordFont: {
      fontSize: selectedWord
        ? selectedWord?.split("").length > 9
          ? 15
          : 18
        : 10,
      color: "#fff",
    },
    slowDownButton: {
      justifyContent: "center",
      alignItems: "center",
    },
    starButton: {
      padding: 17,
      marginHorizontal: 10,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={currentAudio.thumbnail} style={styles.backgroundImage} />

     
      <View style={styles.topDashBoardContainer}>
        <TouchableOpacity style={styles.slowDownButton} onPress={slowDown}>
          <MaterialCommunityIcons
            name="speedometer-slow"
            size={25}
            color={slowState ? "#E8A417" : "#c6c6c6"}
          />
          <Text style={styles.dashFont}> Slow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "flex-end", padding: 20 }}
          onPress={LaunchActivity}
        >
          <AntDesign name="Trophy" size={25} color={"#E8A417"} />
        </TouchableOpacity>
      </View>

      <SelectComponent
        isReader={true}
        styles={styles}
        stylesParent={styles}
        state={isPlaying}
        timer={played}
        script={currentAudio.subtitle}
        playPause={playPause}
        isPlaying={isPlaying}
        sound={sound}
        navigation={navigation}
        colorSchema={colorSchema}
        isSearch={isSearch}
        selectedWord={selectedWord}
        setSelectedWord={setSelectedWord}
        fontSizeSub={fontSizeSub}
      />
      {selectedWord && (
        <View style={styles.selectedWordContainer}>
          <View style={styles.selectedWordBoxColor}>
            <TouchableOpacity
              style={styles.selectedWordButton}
              onPress={() =>
                speakUp(Speech, selectedWord, currentAudio.language)
              }
            >
              <Text style={styles.selectedWordFont}>{selectedWord}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.starButton}
              onPress={async () => await StoredFavoriteLists(selectedWord)}
            >
              <AntDesign
                name="star"
                size={22}
                color={isInFavorite ? "#E8A417" : "#c6c6c6"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 17 }} onPress={handleSearch}>
              <AntDesign name="search1" size={22} color={"#c6c6c6"} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ padding: 17 }}
            onPress={() => setSelectedWord(false)}
          >
            <AntDesign name="close" size={22} color={"#c6c6c6"} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.playerbox}>
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
    </SafeAreaView>
  );
}

function SelectComponent({
  isReader,
  stylesParent,
  state,
  timer,
  script,
  playPause,
  isPlaying,
  sound,
  navigation,
  colorSchema,
  isSearch,
  selectedWord,
  setSelectedWord,
  fontSizeSub,
}) {
  const styles = StyleSheet.create({
    container: {
      height: height < 700 ? "27%" : "35%",
      marginTop: 10,
    },

    barWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      alignItems: "center",
    },
    containerBar: {
      flexDirection: "row",
      width: "60%",
      justifyContent: "space-around",
      alignSelf: "flex-end",
    },

    discBox: {
      top: height < 700 ? "18%" : "28%",
    },
    ButtonBar: {
      height: 40,
      width: 40,
    },
    readerContainer: {
      marginTop: height < 700 ? "12%" : "26%",
    },
  });

  if (isReader) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.readerContainer}>
            <Reader
              fontSize={fontSizeSub}
              timer={timer}
              script={script}
              playPause={playPause}
              isPlaying={isPlaying}
              sound={sound}
              colorSchema={colorSchema}
              isSearch={isSearch}
              selectedWord={selectedWord}
              setSelectedWord={setSelectedWord}
            />
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.discBox}></View>
    </View>
  );
}
/*

 <Text style={{color:"#fff", fontSize:40}}> 
        {played}
      </Text>

*/