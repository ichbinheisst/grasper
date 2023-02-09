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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export default function SearchScreen({ navigation }) {
   const screen  = React.useRef()

React.useEffect(()=> {
 screen.current.focus()
 
})

  const list = [1, 2, 3];

  return (
    <View style={styles.container} >
      <View style={styles.searchBox}>
        <TouchableOpacity
          style={styles.buttonGoback}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={20} color={"#fff"} />
        </TouchableOpacity>
        <TextInput placeholder="search" style={styles.input} ref={screen} />
      </View>

      <FlatList
        data={list}
        keyExtractor={(index) => String(index)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultBox}>
            <Text style={styles.resultFont}> Option {item} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  searchBox: {
    //  width: "100%",
    // justifyContent: "space-around",
    flexDirection: "row",
    justifyContent: "center",
    padding: "10%",
    marginTop: 0,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#7c787a71",
    padding: 10,
    fontSize: 18,
    borderRadius: 20,
    width: "100%",
    color:"#fff"
  },
  resultBox: {
    height: 40,
    backgroundColor: "#7c787a71",
    width: width / 1.4,
    marginLeft: 40,
    opacity: 0.6,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop:5
  },
  resultFont: {
    fontSize: 17,
    color: "#fff",
  },
  buttonGoback: {
    height: 50,
    width: 40,
    marginHorizontal: 10,

    alignItems: "center",
    justifyContent: "center",
  },
});
