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
import Writter from "../../components/writer";
import { Globalaudio } from "../context";
import OptionBox from "../../components/Options";
import LoadingScreen from "../loadingScreen";
import { stylesHome } from "./styles";

export default function HomeScreen({ navigation }) {
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

  function selectAlbumTransition(index) {
    setShowBackgroundPicture(false);
    body.current.scrollToOffset({ animated: true, offset: 130 });

    navigation.navigate("album");

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
    }, 300);
  }

  React.useEffect(() => {
    if (isPlaying) {
      setShowBand(true);
    }
  }, [isPlaying]);

  React.useEffect(() => {
    if (!loading) {
      //selectAlbumTransition(0)
    }
  }, []);

  const styles = StyleSheet.create(stylesHome);

  if (loading) {
    return <LoadingScreen navigation={navigation} color={colorSchema} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {currentAlBum?.tracks && (
        <>
          <FlatList
            ref={body}
            ListHeaderComponent={
              <View style={styles.listHeaderWrapper}>
                <OptionBox
                  options={level}
                  action={goToGlossary}
                  dark={colorSchema.dark}
                  color={colorSchema}
                />

                <View style={styles.writerContainer}>
                  {showBackgroundPicture && (
                    <Writter text={currentAlBum.Artist} color={colorSchema} />
                  )}
                </View>
              </View>
            }
            data={[
              { id: "2", language: "english" },
              { id: "3", language: "German" },
            ]}
            renderItem={({ item, index }) => (
              <View style={styles.trackCardBox}>
                <Swipper
                  colorSchema={colorSchema}
                  data={albuns}
                  action={selectAlbumTransition}
                  dark={colorSchema.dark}
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
            color={colorSchema}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
