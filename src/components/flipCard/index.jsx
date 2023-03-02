import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  SharedValue,
  withSpring,
  withRepeat,
  withSequence,
  processColor,
  withDelay,
} from "react-native-reanimated";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
const { width, height } = Dimensions.get("screen");
import speakUp from "../../useful/speak";
import Ballon from "../ballon";
import { StoreList, checkList } from "../../useful/favoriteList";

export default function FlipCard({ index, data, prev, next }) {
  const baloonRef = React.useRef();
  const [ballonD, setBallonD] = React.useState(50);
  const [selectedWord, setSelectedWord] = React.useState("");
  const [isInFavorite, SetInFavorite] = React.useState(false);

  React.useEffect(() => {
    if (selectedWord) {
      const checkWord = async () => {
        SetInFavorite(await checkList(selectedWord));
      };
      checkWord();
    }
  }, [selectedWord, StoredFavoriteLists]);

  async function StoredFavoriteLists(vocabulary) {
    const response = await StoreList(vocabulary, "de-DE");
    if (response) {
      SetInFavorite(true);
    }
  }

  const [position, setPosition] = React.useState();
  const [move, setMove] = React.useState(false);
  const screenWidth = width / 1.1;

  const handleOnPress = () => {
    if (!move) {
      return;
    }
    setMove(false);
    baloonRef.current.measure((x, y, width, height, pageX, pageY) => {
      console.log(pageX);

      setPosition({ x, y, width, height, pageX, pageY });
      const difference = width + pageX - screenWidth;
      if (screenWidth < width + pageX)
        return setBallonD((prev) => prev + difference);

      if (pageX < 0) {
        console.log("menor que o valor");
        return setBallonD((prev) => prev + pageX - 20);
      }
    });
  };

  /*



    <View
                  ref={baloonRef}
                  onLayout={handleOnPress}
                  style={{
                    position: "absolute",
                    top: -100,
                    alignContent: "flex-start",
                    left: -ballonD,
                  }}
                >
                  <Ballon
                    word={txt}
                    squarePosition={"50%"}
                    data={currentAudio}
                    isInFavorite={isInFavorite}
                    StoredFavoriteLists= {StoredFavoriteLists}
                    shutdown={shutBallonDown}
                  />
                </View>

*/

  function SearchWord(word) {
    setSelectedWord(word);
  }

  return (
    <View
      style={{
        alignSelf: "center",
        width: width / 1.1,
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          minHeight: 80,
          borderRadius: 8,
          //backgroundColor: "#000",
          width: width / 1.14,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            padding: 5,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "#A200E8",
            width: "105%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View>
              <TouchableOpacity style={{ padding: 10 }} onPress={prev}>
                <AntDesign name="left" color={"#fff"} size={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 240,
                justifyContent: "center",
                alignContent: "center",
                alignItems:"center"
              }}
            >
              <Text
                style={{
                  fontSize: data.vocabulary.split("").length > 8 ? "23%":"25%",
                  fontFamily: "custom",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                {data.article} {data.vocabulary}
              </Text>
            </View>

            <TouchableOpacity style={{ padding: 10 }} onPress={next}>
              <AntDesign name="right" color={"#fff"} size={30} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              // flexDirection: "row",
              //width: "90%",
              // justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              style={{ marginVertical: 10, marginTop: 10 }}
              onPress={() =>
                speakUp(Speech, `${data.article} ${data.vocabulary} `, "de-DE")
              }
            >
              <MaterialIcons name="record-voice-over" size={34} color="#fff" />
            </TouchableOpacity>
            <View style={{}}></View>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingBottom: 10,
            justifyContent: "center",
            alignSelf: "center",
            width: "80%",
            alignContent: "center",
          }}
        >
          {data.translation && (
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 23, color: "#fff" }}>
                {data.translation}
              </Text>
            </View>
          )}

          <View style={{ marginTop: 20, marginLeft: -20 }}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "custom",
                color: "#fff",
              }}
            >
              Example:
            </Text>

            <TouchableOpacity
              style={{ marginVertical: 10, marginTop: 10, marginRight: 10 }}
              onPress={() => speakUp(Speech, data.example, "de-DE")}
            >
              <MaterialIcons
                name="record-voice-over"
                size={24}
                color="#A200E8"
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                width: "112%",

                flexWrap: "wrap",
              }}
            >
              {data.example.split(" ").map((word, index) => {
                return (
                  <View key={index}>
                    {selectedWord == word && (
                      <View
                        ref={baloonRef}
                        onLayout={handleOnPress}
                        style={{
                          position: "absolute",
                          top: -100,
                          alignContent: "flex-start",
                          left: -ballonD,
                        }}
                      >
                        <Ballon
                          word={word}
                          squarePosition={"50%"}
                          data={{ language: "de-DE" }}
                          isInFavorite={isInFavorite}
                          StoredFavoriteLists={StoredFavoriteLists}
                          shutdown={() => setSelectedWord("")}
                          // topColor="#A200E8"
                        />
                      </View>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        setMove(true);
                        setBallonD(50);

                        SearchWord(word);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: "custom",
                          color: "#fff",
                          marginTop: 10,
                        }}
                      >
                        {word}{"  "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
/*

 <TouchableOpacity style={{ marginVertical: 10, marginLeft: 13, alignSelf:"flex-end" }}>
              <MaterialIcons name="edit" size={24} color="#fff" />
            </TouchableOpacity>





            <View style={{ alignSelf: "flex-end", marginTop: 0, padding: 10 }}>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontFamily: "custom",
                color: "#c6c6c6",
                marginRight: 20,
              }}
            >
              Search
            </Text>

            <AntDesign name="search1" size={24} color="#E8A417" />
          </TouchableOpacity>
        </View>

*/
