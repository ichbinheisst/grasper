import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Stacker from "./src/navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GlobalAudioStorage } from "./src/screens/context";

export default function App() {


  const [fontsLoaded] = useFonts({
    custom: require("./assets/fonts/Lato/Lato-Regular.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <GlobalAudioStorage onLayout={onLayoutRootView}>
      <StatusBar styles="auto" />
      <Stacker font={"custom"} />
    </GlobalAudioStorage>
  );
}

