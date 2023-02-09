import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import BandPlayer from "../../components/playerband";
import TrackCard from "../../components/cards/trackCard";
import Swipper from "../../components/swipper";
import colorSchema from "../../../colorSchemma/color";
import { AntDesign } from "@expo/vector-icons";
import Writter from "../../components/writer";
import { Globalaudio } from "../context";
import OptionBox from "../../components/Options";
import LoadingScreen from "../loadingScreen";
import * as Speech from "expo-speech";
import report from "../../../assets/reportMessages";

export default function HomeScreen({ navigation }) {
  const dark = false;
  const body = React.useRef();
  const [showband, setShowBand] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const level = ["Basic", "Intermediate", "Advanced"];
  const [showBackgroundPicture, setShowBackgroundPicture] =
    React.useState(false);
  const {
    isPlaying,
    playPause,
    currentAudio,
    setAudio,
    selectAlbum,
    albuns,
    currentAlBum,
  } = React.useContext(Globalaudio);

  function selectAlbumTest(index) {
    setShowBackgroundPicture(false);
    setTimeout(() => {
      setShowBackgroundPicture(true);

      body.current.scrollToOffset({ animated: true, offset: 130 });
    }, 1000);

    selectAlbum(index);
  }

  async function closeBand() {
    playPause();
    setShowBand(false);
  }

  function GoToPlayer() {
    navigation.navigate("Player");
  }
  function GoToActivity() {
    navigation.navigate("complete");

    //"orderNext"
    // "fill"
  }

  function goToGlossary() {
    navigation.navigate("glossary");
  }

  async function Player(arg) {
    await setAudio(arg);
    setTimeout(() => {
      navigation.navigate("Player");
    }, 800);
  }
  function Report() {
    Speech.speak(report(), {
      language: "pt-BR",
    });
  }

  // use effect zone

  React.useEffect(() => {
    if (isPlaying) {
      setShowBand(true);
    }
  }, [isPlaying]);

  React.useEffect(() => {
    setShowBackgroundPicture(false);
    setTimeout(() => {
      setShowBackgroundPicture(true);
    }, 1000);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSchema.main,
      alignItems: "center",
      // justifyContent: "center",
    },

    backgroundImage: {
      height: "100%",
      width: "100%",
      opacity: 0.05,
      position: "absolute",
    },

    listHeaderWrapper: {
      width: "100%",
      paddingTop: 10,
      marginTop: 5,

      // backgroundColor:"black"
    },

    bandPlayerBox: {
      // position: "absolute",
      marginVertical: 10,
      marginTop: 40,

      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    swipperContainer: {
      paddingTop: 20,
    },

    trackCardBox: {
      paddingHorizontal: 10,
      width: "99%",
      alignSelf: "center",
    },

    boxMessage: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      width: "90%",
    },
    boxFont: {
      color: "#8d8989",
    },
    writerContainer: {
      height: 55,
      marginLeft: 20,
      marginTop: 0,
      flexDirection: "row",
    },
  });

  if (loading) {
    return <LoadingScreen navigation={navigation} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {currentAlBum?.tracks && (
        <>
          {showBackgroundPicture && colorSchema.dark && (
            <Image
              source={currentAlBum.thumbnail}
              style={styles.backgroundImage}
            />
          )}

          <FlatList
            ref={body}
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
            }}
            ListHeaderComponent={
              <View style={styles.listHeaderWrapper}>
                <OptionBox
                  options={level}
                  action={goToGlossary}
                  dark={colorSchema.dark}
                  color={colorSchema}
                />
                <Swipper
                  colorSchema={colorSchema}
                  data={albuns}
                  action={selectAlbumTest}
                  dark={colorSchema.dark}
                />

                <View style={styles.writerContainer}>
                  {showBackgroundPicture && (
                    <Writter
                      text={currentAlBum.Artist}
                      dark={colorSchema.dark}
                    />
                  )}
                </View>
              </View>
            }
            data={currentAlBum.tracks}
            renderItem={({ item, index }) => (
              <View style={styles.trackCardBox}>
                <TrackCard
                  colorSchema={colorSchema}
                  action={Player}
                  data={item}
                  index={index}
                  state={isPlaying}
                  trackPlayingInfo={currentAudio}
                  action2={GoToActivity}
                />
              </View>
            )}
            keyExtractor={(item, index) => String(item.id)}
          />
        </>
      )}
      {showband && (
        <View style={styles.bandPlayerBox}>
          <BandPlayer
            nav={GoToPlayer}
            playPause={playPause}
            state={isPlaying}
            data={currentAudio}
            close={closeBand}
            isDark={colorSchema.dark}
            colorSchema={colorSchema}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
/*

React.useEffect(() => {
    navigation.setOptions({
      title: "Voicer",
      headerRight: () => {
        return (
          <View style={{ paddingHorizontal: 10, flexDirection:"row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("favorites")}
             style={{marginHorizontal:20}}
            
            >
              <AntDesign name="star" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("search")}  >
              <AntDesign name="search1" size={23} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      },
      headerLeft: () => {
        return (
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={()=> navigation.navigate("setting")}>
              <AntDesign name="bars" size={23} color="#ffff" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);


*/
