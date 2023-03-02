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
import Ballon from "../../components/ballon";
import { Ionicons } from "@expo/vector-icons";
import DiscContainer from "../../components/disc";
import colorSchema from "../../../colorSchemma/color";
import PlayerComponent from "../../components/player";
const { width, height } = Dimensions.get("screen");
import Reader from "../../components/reader";
import { Globalaudio } from "../context";
import PlayerB from "../../components/player/player2";
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
import FloatingBoard from "../../components/floatBoarding";
export default function PlayerScreen({ navigation }) {
  const dark = true;
  const [displayText, setDisplayText] = React.useState(false);
  const [isSearch, setISearch] = React.useState(false);
  const [selectedWord, setSelectedWord] = React.useState(false);
  const [fontSizeSub, SetFontSizeSub] = React.useState(19);
  const [isInFavorite, SetInFavorite] = React.useState(false);

  const [floatBoardValue, setFloatBoardValue] = React.useState(0);
  const [isFloatingChanging, setFloatingIsChanging] = React.useState(false);

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
    if (isFloatingChanging) {
      setTimeout(() => {
        setFloatingIsChanging(false);
      }, 1000);
    }
  }, [isFloatingChanging]);

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
      opacity: displayText ? 0.05 : 0.1,
      position: "absolute",
    },
    container: {
      flex: 1,
      backgroundColor: !colorSchema.dark
        ? "#f1f3f5"
        : colorSchema.background.primary,
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
      bottom: "2%",
      alignSelf: "center",
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

      alignItems: "center",
      marginRight: -19,

      marginTop: -13,
    },
    selectedWordContainer: {
      position: "absolute",
      bottom: "28%",
      flexDirection: "row",
      alignSelf: "center",
      left: 70,
      borderRadius: 10,
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
      padding: 20,
    },
    starButton: {
      padding: 17,
      marginHorizontal: 10,
    },
  });

  React.useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTintColor:colorSchema.fonts.h2,
      headerStyle: { backgroundColor: colorSchema.dark?colorSchema.background.primary: "rgb(255, 255, 255)" },

      headerRight: () => (
        <View style={styles.topDashBoardContainer}>
          <TouchableOpacity style={styles.slowDownButton} onPress={slowDown}>
            <MaterialCommunityIcons
              name="speedometer-slow"
              size={23}
              color={slowState ? "#E8A417" : colorSchema.dark? "#fff":  "rgb(0, 45, 90)"}
            />
            <Text style={styles.dashFont}> Slow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "flex-end", padding: 20, top: -3 }}
            onPress={LaunchActivity}
          >
            <AntDesign name="Trophy" size={25} color={"#E8A417"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [slowDown]);

  async function goAhead() {
    if (isFloatingChanging) {
      return;
    }
    setFloatBoardValue("+10");
    setFloatingIsChanging(true);

    await sound.setPositionAsync(played + 10000);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  async function goBack() {
    if (isFloatingChanging) {
      return;
    }
    setFloatBoardValue("-10");
    setFloatingIsChanging(true);
    // Haptics.NotificationFeedbackType()
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await sound.setPositionAsync(played - 10000);
  }

  async function GoToFlashCard() {
    if (currentAudio.glossary && currentAudio.glossary.length) {
      await sound.pauseAsync();
      navigation.navigate("flashCard");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
     
    
      <View
        style={{
          width: "90%",
          height: 90,
          

          alignSelf: "center",
          marginHorizontal: 20,
          marginTop: 10,
          borderRadius: 8,
          paddingHorizontal: 10,

          flexDirection: "row",
          alignContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            width: "98%",
            height: 90,

            alignSelf: "center",
            marginHorizontal: 20,
            marginTop: 10,
          

            backgroundColor: "rgb(50, 60, 69)",
            position: "absolute",
            opacity: colorSchema.dark? 0.3:0.1,
            borderRadius:5
          }}
        />

        <Image
          source={currentAudio.thumbnail}
          style={{
            width: 80,
            height: 80,
            alignSelf: "flex-start",
            marginHorizontal: 20,

            borderRadius: 8,
            marginLeft: 10,
            marginTop: 5,
          }}
        />

        <View style={{ padding: 10, maxWidth: "70%" }}>
          <Text style={{ color: colorSchema.dark? "#fff":  "rgb(0, 45, 90)", fontWeight: "600", fontSize: 16 }}>
            {currentAudio.Track}
          </Text>
          <Text style={{ color: colorSchema.dark? "#fff":  "rgb(0, 45, 90)", fontSize: 12 }}>
            {currentAudio.Artist}
          </Text>

          <Text style={{ color: colorSchema.dark? "#fff":  "rgb(0, 45, 90)", fontSize: 12 }}>
            {currentAudio.language}
          </Text>
        </View>

        {currentAudio.glossary && currentAudio.glossary.length && (
          <TouchableOpacity
            onPress={GoToFlashCard}
            style={{
              height: 40,
              width: 40,
              position: "absolute",
              right: 10,
              top: 40,
            }}
          >
            <Ionicons name="flash-outline" size={34} color="#E8A417" />
          </TouchableOpacity>
        )}
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
        currentAudio={currentAudio}
        isInFavorite={isInFavorite}
        StoredFavoriteLists={StoredFavoriteLists}
        setIsPLaying={setIsPLaying}
      />

      <View style={styles.playerbox}>
        <PlayerB
          colorSchema={colorSchema}
          playPause={() => {
            setSelectedWord("");
            playPause();
          }}
          state={isPlaying}
          audioProps={audioProps}
          audioLength={audioLength}
          convertTime={convertTime}
          played={played}
          sound={sound}
          info={currentAudio}
          goAhead={goAhead}
          goBack={goBack}
        />
      </View>
      {isFloatingChanging && (
        <FloatingBoard value={floatBoardValue} show={isFloatingChanging} />
      )}
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
  currentAudio,
  isInFavorite,
  StoredFavoriteLists,
  setIsPLaying,
}) {
  const styles = StyleSheet.create({
    container: {
      height: height < 700 ? "27%" : "35%",
      marginTop: 0,
      width: "98%",
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
              currentAudio={currentAudio}
              isInFavorite={isInFavorite}
              StoredFavoriteLists={StoredFavoriteLists}
              setIsPLaying={setIsPLaying}
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

<Text style={{color:"#fff", fontSize:40}}> 
        {played}
      </Text>

 <Image source={currentAudio.thumbnail} style={styles.backgroundImage} />

  

*/

const name = [
  {
    vocabulario: "",
    article: "",
    translation: "",
    sentencesExample: [""],
  },
];

/*






 */
