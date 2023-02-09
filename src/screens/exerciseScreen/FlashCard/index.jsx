import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import ActivityTemplate from "../template";
import Reader from "../../../components/reader";
import PressableBox from "../../../components/PressableBox";
import SimplePlayer from "../../../components/simplePlayer";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

export default function FlashCardsScreen({ navigation }) {
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
  ];

  const d = [1, 2];

  const op = ["das", "der"];

  return (
    <ActivityTemplate
      navigation={navigation}
      showSubmitButton={false}
      total={100}
      page={10}
      isDark={true}
    >
      <View
        style={{
          alignSelf: "center",
          padding: 20,
          width: width / 1.1,
          height: height / 1,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          Tanzen
        </Text>

        <Image
          source={require("./dance.jpeg")}
          style={{ height: "50%", width: "94%", borderRadius: 8 }}
        />

        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#fff",
            position: "absolute",
            top: "25%",
            borderRadius: "100%",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            opacity: 0.6,
          }}
        >
          <AntDesign
            name={!false ? "caretright" : "pause"}
            size={40}
            color="#a200e8"
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            margin: 10,
          }}
        >
          {op.map((i) => {
            return (
              <View style={{ marginHorizontal: 10, marginTop: 20 }} key={i}>
                <PressableBox
                  content={{ word: i }}
                  action={() => console.log("teste")}
                  boxColor={"purple"}
                  fontColor={"#fff"}
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
});
