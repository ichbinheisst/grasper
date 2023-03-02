import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
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
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import colorSchema from "../../../../colorSchemma/color";
import ActivityTemplate from "../template";
import Reader from "../../../components/reader";
import PressableBox from "../../../components/PressableBox";
import SimplePlayer from "../../../components/simplePlayer";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import FlipCard from "../../../components/flipCard";
import {
  GestureDetector,
  Gesture,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { data } from "./dumbDat";
import PlayerB from "../../../components/player/player2";
import OptionBox from "../../../components/Options";

const { width, height } = Dimensions.get("screen");

export default function FlashCardsScreen({ navigation }) {
  const types = ["noun", "verbs", "adjective", "adverbs"];

  const [current, setCurrent] = React.useState(0);

  const LEFT = useSharedValue(-(width / 1.2) * current);

  const styleSlider = useAnimatedStyle(() => {
    return {
      left: LEFT.value,
    };
  });

  React.useEffect(() => {
    if (current >= 0) {
      LEFT.value = withTiming(-(width / 1.1) * current, { duration: 500 });
    }
  }, [current]);

  function next() {
    let copy = current;
    if (data.length == copy + 1) return;
    setCurrent((value) => value + 1);
  }

  function prev() {
    if (current == 0) return;
    setCurrent((value) => value - 1);
  }

  return (
    <ActivityTemplate
      navigation={navigation}
      isDark={true}
      page={current}
      total={data.length}
    >
      <View
        style={{
          width: "100%",
          marginTop: 5,
          height: 100,
        }}
      >
        <OptionBox
          color={colorSchema}
          dark={colorSchema.dark}
          options={types}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          width: width / 1.1,
          overflow: "hidden",

          justifyContent: "flex-start",
          alignContent: "center",
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        {data.map((el, index) => {
          return (
            <Animated.View key={index} style={[styleSlider]}>
              <FlipCard index={index} data={el} prev={prev} next={next} />
            </Animated.View>
          );
        })}
      </View>
    </ActivityTemplate>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
/*


#E8A417
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

<View style={{ position: "absolute", bottom: 10 }}>
        <PlayerB convertTime={() => "0:00"} colorSchema={colorSchema} />
      </View>
*/
