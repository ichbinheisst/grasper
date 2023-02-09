import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import GlossaryCard from "./components/cardsGlossary/glossaryCard";
const { width, height } = Dimensions.get("screen");
import colorSchema from "../../../colorSchemma/color";
import * as WebBrowser from "expo-web-browser";


export default function GlossaryScreen({ navigation }) {
  const data   =  [
    { name: "personal pronouns", id: 1 },
    { name: "objective pronouns", id: 2 },
    { name: "adjective possessive pronouns", id: 3 },
    { name: "to be", id: 4 },
    { name: "can", id: 5 },
    { name: "preposition of place", id: 6 },
    { name: "preposition of time", id: 7 },
    { name: "adverbs of frequency", id: 8 },

]

  return (
    <View style={styles.container} >
     <Image  style={{opacity:0.2, right:"-15%",position:'absolute'}} source={require("../../../assets/gibson.jpeg")}/>
    <FlatList
     data={data}
     renderItem={({item,index})=> <GlossaryCard colorSchema={colorSchema} data={item}  index={index}/>}
     keyExtractor={(item, index) => String(item.id)}
    
    />
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  
});
