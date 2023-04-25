import * as React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Video, AVPlaybackStatus } from "expo-av";
import speakUp from "../../useful/speak";
import { searchWebDictionary } from "../../useful/dictionary";
import * as Speech from "expo-speech";
import txt from "./mockData/TheLastOfUs";
import PlayerComponent from "../../components/player";
import colorSchema from "../../../colorSchemma/color";

export default function VideoScreen() {
  const video = React.useRef(null);
  const [selectedWord, setSelectedWord] = React.useState(false);
  const [currentPosition, setCurrentPosition] = React.useState();

  const [status, setStatus] = React.useState({});
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
      paddingTop:20
    },
    backgroundImage: {
      height: "100%",
      width: "100%",
      opacity: 0,
      position: "absolute",
    },
    video: {
      height: "100%",
      width: "99%",
    },
    subtitlesContainer: {
      marginTop: 0,
      height: "35%",

      flexDirection: "row",
    },
    selectedWordContainer: {
      flexDirection: "row",
      alignSelf: "center",
      right: -20,
      borderRadius: 10,
    },
    selectedWordBoxColor: {
      flexDirection: "row",
      backgroundColor: colorSchema.triade.primary,
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
          ? 16
          : 20
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

  React.useEffect(() => {
    if (selectedWord) {
      video.current.pauseAsync();
      speakUp(Speech, selectedWord, "en-US");
    }
  }, [selectedWord]);

  React.useEffect(() => {
    RightTime();
  }, [video]);

  function RightTime() {
    if (!video) false;
    video.current.setOnPlaybackStatusUpdate((current) => {
      setCurrentPosition(current.positionMillis);
    });

    // UpdateTimer(current.positionMillis);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("./mockData/boov.jpeg")}
        style={styles.backgroundImage}
      />

      <View>
        <Text style={{ fontSize: 20, color: "#ffff", fontWeight: "600" }}>
          The Last of Us
        </Text>
      </View>

      <View
        style={{
          padding: 2,
          borderColor: colorSchema.colorFullPallet.mainColor,
          width: "96%",
          height: "40%",
          backgroundColor: "#262525",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Video
          ref={video}
          style={styles.video}
          source={require("./mockData/theLast.mp4")}
          useNativeControls={true}
          resizeMode="contain"
          shouldPlay={true}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>

      <View style={styles.subtitlesContainer}>
        {txt.map((ele, index) => {
          if (
            currentPosition &&
            currentPosition > ele.time.from &&
            currentPosition < ele.time.to
          )
            return (
              <View key={index * 1000}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    Width: "5%",
                  }}
                >
                  {ele.text.split(" ").map((word, indexWord) => {
                    return (
                      <Pressable
                        onPress={() => setSelectedWord(word)}
                        style={{ padding: 4 }}
                        key={indexWord * Math.random() * 500}
                      >
                        <Text
                          style={{ fontSize: 20, color: "#fff", marginTop: 10 }}
                        >
                          {word}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
        })}
      </View>

      {selectedWord && (
        <View style={styles.selectedWordContainer}>
          <View style={styles.selectedWordBoxColor}>
            <TouchableOpacity
              style={styles.selectedWordButton}
              onPress={() => speakUp(Speech, selectedWord, "en-Us")}
            >
              <Text style={styles.selectedWordFont}>{selectedWord}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.starButton}
              // onPress={async () => await StoredFavoriteLists(selectedWord)}
            >
              <AntDesign
                name="star"
                size={22}
                color={true ? "#E8A417" : "#c6c6c6"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 17 }}
              onPress={() =>
                selectedWord && searchWebDictionary(selectedWord, "en-US")
              }
            >
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
    </View>
  );
}

/*

<Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
 <Text style={{fontSize:30, color:"#fff"}}> 
        {currentPosition}
      </Text>
*/
