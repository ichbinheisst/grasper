import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function CardAlbum2({ colorSchema, data, action, index, dark }) {
  const [selected] = React.useState(data.selected);
  const animationTiming = 1000;

  const heightContainer = useSharedValue(160);
  const widthContainer = useSharedValue(140);
  const topPositon = useSharedValue(0);

  const [size, setSize] = React.useState({
    height: 120,
    width: 110,
  });

  const stylesAnimatedContainer = useAnimatedStyle(() => {
    return {
      top: topPositon.value,
      height: heightContainer.value,
      width: widthContainer.value,
    };
  });

  React.useEffect(() => {
    if (data.selected) {
      heightContainer.value = withTiming(180, { duration: animationTiming });
      widthContainer.value = withTiming(155, { duration: animationTiming });
      topPositon.value = withTiming(-20, { duration: animationTiming });
      return;
    }
    heightContainer.value = withTiming(140, { duration: animationTiming });
    widthContainer.value = withTiming(120, { duration: animationTiming });
    topPositon.value = withTiming(0, { duration: animationTiming });
  }, [selected, action]);

  const styles = StyleSheet.create({
    container: {},
    cardContainer: {
      top: selected ? -20 : 0,
      borderRadius: 6,
      marginHorizontal: 10,
      paddingTop: 5,

      alignItems: "center",
    },
    cardCoverThumb: {
      height: "80%",
      width: "95%",
      borderRadius: 5,
    },
    cardTextBox: {
      marginTop: "5%",
    },
    cardTitleText: {
      fontWeight: "600",
      fontSize: selected ? 17 : 14,
      color: colorSchema.font.h3,
    },
    cardPlayerButton: {
      height: size.height / 2,
      width: size.height / 2,
      position: "absolute",
      alignSelf: "center",
      top: size.height / 5,
      backgroundColor: colorSchema.background.primary,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.8,
    },
    CardPosition: {
      backgroundColor: colorSchema.triade.primary,
      opacity: 0.8,
      height: 30,
      width: 30,
      alignItems: "center",
      justifyContent: "center",
      borderBottomRightRadius: 10,
      bordertopRightRadius: 10,
      position: "absolute",
      top: data.selected ? -20 : -4,
      left: 10,
    },
    CardPositionFont: {
      fontWeight: "800",
      color: "#fff",
      fontSize: 11,
    },
  });

  return (
    <View>
      <Animated.View>
        <Animated.View style={[styles.cardContainer, stylesAnimatedContainer]}>
          <Image source={data.thumbnail} style={styles.cardCoverThumb} />

        
        
        </Animated.View>

        <View style={styles.CardPosition}>
          <Text style={styles.CardPositionFont}>{index + 1}</Text>
        </View>
      </Animated.View>
    </View>
  );
}
