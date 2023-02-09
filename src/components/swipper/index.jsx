import React from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CardAlbum from "../cards/albumCard";

export default function Swipper({ colorSchema, data, action, dark }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#fff",
          alignSelf: "flex-start",
          padding: 10,
          marginLeft: 5,
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        Albuns
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        horizontal={true}
        data={data}
        renderItem={({ item, index }) => (
          <CardAlbum
            selected={item.select}
            colorSchema={colorSchema}
            data={item}
            action={action}
            index={index}
            dark={dark}
          />
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,

    justifyContent: "center",
    alignContent: "center",

    alignItems: "center",
    marginVertical: 20,
  },
  flatlist: {
    height: "80%",

    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
