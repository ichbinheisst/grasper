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
  const styles = StyleSheet.create({
    container: {
      height: 280,

      justifyContent: "center",
      alignContent: "center",

      alignItems: "center",
      marginVertical: 10,
    },
    flatlist: {
      height: "80%",

      alignContent: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    fontTitle: {
      color: colorSchema.fonts.h2,
      alignSelf: "flex-start",
      padding: 10,
      marginLeft: 5,
      fontSize: 24,
      fontWeight: "900",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.fontTitle}>Albuns</Text>
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
