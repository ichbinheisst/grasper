import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getFavoriteList } from "../../useful/favoriteList";
import WordCard from "./components/cardsGlossary/WordCard";
import * as Speech from "expo-speech";
import speakUp from "../../useful/speak";
import colorSchema from "../../../colorSchemma/color";
import OptionBox from "./components/Options";
import LoadingScreen from "../loadingScreen";

export default function FavoriteListScreen({navigation}) {
  const [list, setList] = React.useState([]);
  const [options, setOption] = React.useState([
    {
      language: "Deutsch",
      short: ["de-DE"],
      select: true,
    },
    {
      language: "English",
      short: ["en-Uk", "en-US"],
      select: false,
    },
    {
      language: "Spanish",
      short: ["es-ES"],
      select: false,
    },
  ]);

  async function selectRender() {
    const fulllist = await getFavoriteList();
    const language = options.find((item) => {
      return item.select;
    });
    if (!language || !fulllist.length) return;

    if (language.language != "English") {
      const lIST = fulllist.filter((item) => {
        return item?.header?.language == language.short;
      });

      setList(lIST);
      return;
    }

    const lIST = fulllist.filter((item) => {
      return (
        item?.header?.language == "en-US" || item?.header?.language == "en-UK"
      );
    });
    setList(lIST);
    return;
  }

  function selectLanguage(index) {

    console.log(index)

    setOption((prev) => {
      const newList = prev.map((item) => {
        return { ...item,select: false };
      });
      newList[index].select =  true;

      return newList;
    });
  }

  React.useEffect(() => {
    const search = async () => {
      await selectRender();
    };

    search();
  }, [selectLanguage]);

  function Speaking(data) {
    if (data.header.language == "en-US" || data.header.language == "en-UK") {
      speakUp(Speech, data.body.word, "en-US");
      return;
    }
    speakUp(Speech, data.body.word, data.header.language);
  }
  

  return (
    <View style={styles.container}>
      <OptionBox options={options} action={selectLanguage} />
      <FlatList
        data={list}
        renderItem={({ index, item }) => (
          <WordCard
            colorSchema={colorSchema}
            action={Speaking}
            state={true}
            index={index}
            data={item}
          />
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f1f3f5",
  },
});
