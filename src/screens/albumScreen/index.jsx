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
import CardAlbum from "../../components/cards/albumCard";
import { stylesHome } from "./styles";
import CardAlbum2 from "./components/albumCard2";

export default function AlbumScreen({ navigation }) {
  const body = React.useRef();
  const [showband, setShowBand] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const level = ["Basic", "Intermediate", "Advanced"];

  const [showTitle, setShowTitle] = React.useState(false);
  const {
    isPlaying,
    playPause,
    currentAudio,
    setAudio,
    selectAlbum,
    albuns,
    currentAlBum,
  } = React.useContext(Globalaudio);

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
    setTimeout(() => {
      setShowTitle(true);
    }, 1000);
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
                <View style={{ flexDirection: "row", marginVertical: 20 , alignContent:"center", alignItems:"center"}}>
                  <CardAlbum2 data={currentAlBum} colorSchema={colorSchema} />

                  <View style={styles.writerContainer}>
                    {showTitle && (
                      <Writter text={currentAlBum.Artist} color={colorSchema} />
                    )}
                  </View>
                </View>

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
                  dark={colorSchema.dark}
                />
              </View>
            )}
            keyExtractor={(item, index) => String(item.id)}
          />
        </>
      )}
    </SafeAreaView>
  );
}
