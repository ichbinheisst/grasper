import React, { Children } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import AnimatedButton from "../../../components/button/animatedButton";
import ProgressBar from "../../../components/progressBar";
import { HeaderLeft, HeaderRight } from "../header";
import FeedbBackAnimation from "../components/feedBack";
const { width, height } = Dimensions.get("screen");

export default function ActivityTemplate({
  navigation,
  showSubmitButton,
  children,
  check,
  page,
  total,
  showFeedBack,
  statusFeedback,
  showheaderButtonRight,
  headerFunction,
  headerFunction2,
  buttonState,
  isDark,
  backgroundImage,
}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      paddingTop: 0,
      backgroundColor: isDark ? "#000" : "#fff",
    },

    backgroundImage: {
      height: "100%",
      width: "100%",
      opacity: 0.1,
      position: "absolute",
    },

    progressBarBox: {
      padding: "2%",
    },
    activityContainer: {
      height: height > 700 ? "70%" : "67%",
      width: "90%",
    },
    ButtoBox: {
      marginTop: "2%",
    },
    containerFeedBack: {
      alignContent: "center",
      justifyContent: "center",
      marginTop: 100,
      height: height,
      width: width,
      borderRadius: 10,
      position: "absolute",
      alignSelf: "center",
      bottom: 0,

      opacity: 0.6,
    },
  });

  React.useEffect(() => {
    navigation.setOptions({
      title: "",

      headerStyle: {
        backgroundColor: "#000", //"#A200E8",
      },
      headerRight: () => (
        <HeaderRight
          isShowButtonOne={showheaderButtonRight}
          isShowButtonTwo={showheaderButtonRight}
          action={headerFunction}
          actions2={headerFunction2}
          buttonState2={buttonState}
        />
      ),
      headerLeft: () => <HeaderLeft action={() => navigation.goBack()} />,
    });
  }, [headerFunction]);

  return (
    <View style={styles.container}>
      <Image
        source={
          backgroundImage
            ? backgroundImage
            : require("../../../../mockup/album/taylor.png")
        }
        style={styles.backgroundImage}
      />

      <View style={styles.progressBarBox}>
        <ProgressBar
          total={total}
          concluded={page}
          progressColor={"#A200E8"}
          showIcon={true}
          isDark={isDark}
        />
      </View>
      {children}
      {showSubmitButton && (
        <View style={styles.ButtoBox}>
          <AnimatedButton action={check} isAnimated={true} />
        </View>
      )}

      {showFeedBack && (
        <View style={styles.containerFeedBack}>
          <FeedbBackAnimation status={statusFeedback} show={true} />
        </View>
      )}
    </View>
  );
}
