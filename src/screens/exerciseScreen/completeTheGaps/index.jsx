import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import ActivityTemplate from "../template";
import Reader from "../../../components/reader";
import PressableBox from "../../../components/PressableBox";
import SimplePlayer from "../../../components/simplePlayer";
import colorSchema from "../../../../colorSchemma/color";
const { width } = Dimensions.get("screen");

export default function CompleteThegapsScreen({ navigation }) {
  const data = [
    {
      text: "All smiles, I ______ what it takes to fool this town",
      time: {
        from: 10000,
        to: 15000,
      },
      hasDefinition: false,
      selected: false,
      trasnlation: "Bom dia!",
    },
    {
      text: "I'll do it 'til the sun goes _____ all through the night time,",
      time: {
        from: 15000,
        to: 20500,
      },
      hasDefinition: false,
      selected: false,
      trasnlation: "Bom dia!",
    },

    {
      text: `I don't need_______ to play`,
      time: {
        from: 125000,
        to: 127500,
      },
      hasDefinition: false,
      selected: false,
      trasnlation: "Bom dia!",
    },
    {
      text: `I don't need_______ to play`,
      time: {
        from: 125000,
        to: 127500,
      },
      hasDefinition: false,
      selected: false,
      trasnlation: "Bom dia!",
    },
  ];

  return (
    <ActivityTemplate
      navigation={navigation}
      showSubmitButton={false}
      total={100}
      page={10}
      isDark={colorSchema.dark}
    >
      <View style={styles.activityContainer}>
        <View style={{ width: 70, alignSelf: "center" }}>
          <SimplePlayer action={() => console.log("teste")} isDark={true} />
        </View>

        <View style={{ height: "70%", padding: 10 }}>
          {data.map((el, index) => {
            return (
              <View key={index} style={styles.ReaderWrapper}>
                <Text style={styles.ReaderboxFont}> {el.text}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.OptionsContainer}>
          {data.map((el, index) => {
            return (
              <View style={{ maxWidth: "40%" }} key={index}>
                <PressableBox
                  content={{ word: "word" }}
                  action={() => console.log("teste")}
                  fontColor={"#fff"}
                  boxColor={"rgb(0, 165, 255)"}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ActivityTemplate>
  );
}
const styles = StyleSheet.create({
  activityContainer: {
    height: "70%",
    marginTop: "5%",
  },

  OptionsContainer: {
    minWidth: width / 2,

    padding: 20,
    // backgroundColor:'#fff',
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#6D009C",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },

  ReaderWrapper: {
    padding: 12,
  },

  ReaderboxFont: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgb(50, 60, 69)",
  },
});
