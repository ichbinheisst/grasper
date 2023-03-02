import React, { useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
const { width } = Dimensions.get("screen");
import * as WebBrowser from "expo-web-browser";
import * as Speech from "expo-speech";
import { song as script } from "../../../mockup/text";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Ballon from "../ballon";
export default function Reader({
  timer,
  script,
  playPause,
  isPlaying,
  sound,
  fontSize,
  marker,
  colorSchema,
  isSearch,
  selectedWord,
  setSelectedWord,
  currentAudio,
  isInFavorite,
  StoredFavoriteLists,
  setIsPLaying = { setIsPLaying },
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [soundProps, setSoundProps] = React.useState({});
  const [selected, setSelected] = React.useState();
  const [arrayofWord, setArrayofwords] = React.useState([]);

  async function handleSearch(text, props) {
    if (isPlaying) {
      await sound.pauseAsync();
    }

    setIsPLaying(false);
    setSelectedWord(text);
  }

  function shutBallonDown() {
    setSelectedWord(null);
  }

  function isSelected1(time, data) {
    let select = false;
    
    if (time >= data.time.from && time <= data.time.to) {
      return (select = true);
    }
    //
    return select;
  }

  function setStyleBoxState(time, data, isActive, index) {
    if (!isActive) {
      return {
        boxStyles: {
          marginTop: 10,
        },
        textStyles: {
          fontSize: fontSize,
          color:colorSchema.dark?"#fff": "rgb(0, 45, 90)",
          fontWeight: "400",
          fontFamily: "custom",
        },
      };
    }

    if (isSelected1(time, data)) {
      return {
        boxStyles: {
          backgroundColor: "#f8b133",

          marginTop: 10,
        },
        textStyles: {
          //color: "#0074e8",

          fontSize: fontSize + 3,
          fontWeight: "700",
          color: "#ffffffc9",
          fontFamily: "custom",
        },
      };
    }
    return {
      boxStyles: {
        marginTop: 10,
      },
      textStyles: {
        fontSize: fontSize,
        color: colorSchema.dark?"#fff": "rgb(0, 45, 90)",
        fontWeight: "500",
        fontFamily: "custom",
      },
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textBox}>
        {script?.map((text, index) => {
          if (text.text == "</>") {
            return <SpaceComponent key={index} />;
          }
          if (text.isImage) {
            return <PictureRender url={text.url} />;
          }
          return (
            <TextingComponent
              key={index}
              text={text}
              timer={timer}
              handlSearch={handleSearch}
              index={index}
              styling={setStyleBoxState}
              active={true}
              select={isSelected1(timer, text)}
              selectedWord={selectedWord}
              currentAudio={currentAudio}
              isInFavorite={isInFavorite}
              StoredFavoriteLists={StoredFavoriteLists}
              shutBallonDown={shutBallonDown}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}
function SpaceComponent() {
  return <View style={{ width: width }} />;
}

function TextingComponent({
  text,
  timer,
  handlSearch,
  index,
  styling,
  active,
  select,
  selectedWord,
  currentAudio,
  isInFavorite,
  StoredFavoriteLists,
  shutBallonDown,
}) {
  const [teste, setTest] = React.useState();
  const baloonRef = React.useRef();
  const [ballonD, setBallonD] = React.useState(40);

  const [position, setPosition] = React.useState();
  const [move, setMove] = React.useState(false);

  const handleOnLayout = (event) => {
    const { x, y } = event.nativeEvent.layout;
    console.log(` ${x}`);
    setPosition({ x, y });
  };

  const setOpacityTo = React.useCallback((value) => {
    baloonRef.current.setNativeProps({
      opacity: value,
    });
  }, []);

  React.useEffect(() => {
    if (baloonRef && baloonRef.current) {
      setOpacityTo(1);
    }
  }, [teste]);

  const screenWidth = width;
  function showUpTarget(time, data) {
    if (data.time.from == 0 && data.time.to == 0) {
      return false;
    }

    let select = false;
    let extra = 4000;
    if (time >= data.time.from - extra + 1000 && time <= data.time.to + extra) {
      return (select = true);
    }
    //
    return select;
  }

  const handleOnPress = () => {
    if (!move) {
      return;
    }
    setMove(false);
    baloonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setPosition({ x, y, width, height, pageX, pageY });
      const difference = width + pageX - screenWidth;
      if (screenWidth < width + pageX)
        return setBallonD((prev) => prev + difference);
      if (pageX < 0) return setBallonD((prev) => prev + pageX);
    });
  };

  if (showUpTarget(timer, text))
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {text?.text.split(" ").map((txt, index) => {
          return (
            <View key={index}>
              {selectedWord && selectedWord == txt && teste == index && (
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
                    StoredFavoriteLists={StoredFavoriteLists}
                    shutdown={shutBallonDown}
                  />
                </View>
              )}

              <TouchableOpacity
                style={styling(timer, text, active, index).boxStyles}
                onPress={async () => {
                  setBallonD(40);
                  await handlSearch(txt, text);
                  setTest(index);
                  setMove(true);
                  // handleOnPress()
                }}
              >
                <Text style={styling(timer, text, active, index).textStyles}>
                  {txt}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
}

function PictureRender({ url }) {
  return <Image source={url} style={{ width: width, maxHeight: 200 }} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",

    alignSelf: "center",
    width: "100%",
  },
  textBox: {
    flexDirection: "column",
    //flexWrap: "wrap",
    alignContent: "center",
    // alignItems: "center",
    alignSelf: "center",
    marginLeft: 20,
    maxHeight: 300,
    //backgroundColor:"blue"

    // opacity: 0.05,
    //backgroundColor: "#fff",
  },
  fontText: {
    fontSize: 31,
  },
});
/*


  
      console.log("position:" + pageX);

      if (position > screenWidth) {

        const difference = position - screenWidth;
        setBallonD((prev)=>  prev  + difference)
        return;
      }
      if (pageX < 0) {
        console.log("menor que 0 ");

        setBallonD((prev)=>   -90)


        return;
      }

       setBallonD(60)
       */
