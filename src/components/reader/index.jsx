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
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [soundProps, setSoundProps] = React.useState({});
  const [selected, setSelected] = React.useState();
  const [arrayofWord, setArrayofwords] = React.useState([]);

  async function handleSearch(text, props) {
    setSelectedWord(text);
    await sound.setPositionAsync(props.time.from);
    if (isPlaying) {
      playPause();
    }
    
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
          marginTop: 5,
        },
        textStyles: {
          fontSize: fontSize,
          color: "#ffffffa6",
          fontWeight: "400",
        },
      };
    }

    if (isSelected1(time, data)) {
      return {
        boxStyles: {
          // backgroundColor: "#0074e8",

          marginTop: 5,
          borderRadius: 8,
        },
        textStyles: {
          //color: "#0074e8",

          fontSize: fontSize + 3,
          fontWeight: "700",
          color: "#ffffffc9",
        },
      };
    }
    return {
      boxStyles: {
        marginTop: 5,
      },
      textStyles: {
        fontSize: fontSize,
        color: "#ffffffa6",
        fontWeight: "500",
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
}) {
  function showUpTarget(time, data) {
    let select = false;
    let extra = 5000;
    if (time >= data.time.from - extra + 1000 && time <= data.time.to + extra) {
      return (select = true);
    }
    //
    return select;
  }

  if (showUpTarget(timer, text))
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {text?.text.split(" ").map((txt, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styling(timer, text, active, index).boxStyles}
              onPress={() => handlSearch(txt, text)}
            >
              <Text style={styling(timer, text, active, index).textStyles}>
                {txt}{" "}
              </Text>
            </TouchableOpacity>
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
