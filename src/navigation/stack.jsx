import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/homeScreen";
import Player from "../screens/playerScreen";
import Loading from "../screens/loadingScreen";
import SearchScreen from "../screens/searchScreen";
import UnscrambleScreen from "../screens/exerciseScreen/Unscramble";
import StatisticsScreen from "../screens/statisticsScreen";
import FillouTheGapsScreen from "../screens/exerciseScreen/fillOutTheGaps";
import * as SplashScreen from "expo-splash-screen";
import CompleteThegapsScreen from "../screens/exerciseScreen/completeTheGaps";
import OrderTheNext from "../screens/exerciseScreen/orderTheNext";
import ChooseTheRightAlternativeScreen from "../screens/exerciseScreen/chooseTheRightAlternative";
import SettingScreenScreen from "../screens/settingScreen";
import GlossaryScreen from "../screens/GlossaryScreen";
import FavoriteListScreen from "../screens/favoriteListScreen";
import FlashCardsScreen from "../screens/exerciseScreen/FlashCard";
import { useFonts } from "expo-font";
import DialogReaderScreen from "../screens/dialogReaderScreen";
import VideoScreen from "../screens/videoScreen";
import colorSchema from "../../colorSchemma/color";
import BottomTabs from "./bottom";
import AlbumScreen from "../screens/albumScreen";
import QRCodeReader from "../components/QRcodeReader";

const Stack = createNativeStackNavigator();
const dark = true;

export default function Stacker({ font, navigation }) {
  const header = {
    headerTitleStyle: {
      fontFamily: font,
      fontSize: 25,
      color: colorSchema.dark ? "#fff" : colorSchema.colorFullPallet.mainColor,
    },
    headerStyle: {
      backgroundColor: colorSchema.dark ? "#000000f9" : "#fff", // "#A200E8",
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="bottom"
          component={BottomTabs}
          options={{
            title: "Voicer",
            headerTintColor: !colorSchema.dark
              ? "rgb(0, 45, 90)"
              : "rgb(0, 165, 255)",

            headerStyle: header.headerStyle,
            headerBackTitleStyle: header.headerTitleStyle,
            headerShown: true,
            headerRight: () => {
              return (
                <View
                  style={{
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    marginRight: -10,
                  }}
                >
                  <TouchableOpacity style={{ marginHorizontal: 40 }}>
                    <AntDesign
                      name="bells"
                      size={20}
                      color={
                        !colorSchema.dark
                          ? "rgb(0, 45, 90)"
                          : "rgb(0, 165, 255)"
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesign
                      name="search1"
                      size={23}
                      color={
                        !colorSchema.dark
                          ? "rgb(0, 45, 90)"
                          : "rgb(0, 165, 255)"
                      }
                    />
                  </TouchableOpacity>
                </View>
              );
            },
            headerLeft: () => {
              return (
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => Alert.alert("botão desligado")}
                  >
                    <AntDesign
                      name="bars"
                      size={23}
                      color={
                        !colorSchema.dark
                          ? "rgb(0, 45, 90)"
                          : "rgb(0, 165, 255)"
                      }
                    />
                  </TouchableOpacity>
                </View>
              );
            },
          }}
          headerShown={false}
        />

        <Stack.Screen
          name="dialogue"
          component={DialogReaderScreen}
          options={header}
          headerShown={false}
        />

        <Stack.Screen
          name="video"
          component={VideoScreen}
          options={header}
          headerShown={false}
        />

        <Stack.Screen
          name="QR"
          component={QRCodeReader}
          options={header}
          headerShown={false}
        />

        <Stack.Screen
          name="album"
          component={AlbumScreen}
          options={header}
          headerShown={false}
        />

        <Stack.Screen
          name="favorites"
          component={FavoriteListScreen}
          options={{
            headerTitleStyle: {
              fontFamily: font,
              fontSize: 25,
              color: "#fff",
            },
            headerStyle: {
              backgroundColor: "#000000f9", // "#A200E8",
            },
          }}
        />
        <Stack.Screen
          name="flashCard"
          component={FlashCardsScreen}
          options={header}
          headerShown={false}
        />

        <Stack.Screen name="complete" component={CompleteThegapsScreen} />
        <Stack.Screen name="unscramble" component={UnscrambleScreen} />
        <Stack.Screen name="fill" component={FillouTheGapsScreen} />
        <Stack.Screen name="orderNext" component={OrderTheNext} />
        <Stack.Screen
          name="setting"
          component={SettingScreenScreen}
          options={header}
        />

        <Stack.Screen
          name="glossary"
          component={GlossaryScreen}
          options={header}
        />

        <Stack.Screen
          name="choose"
          component={ChooseTheRightAlternativeScreen}
          options={header}
        />
        <Stack.Screen name="search" component={SearchScreen} options={header} />
        <Stack.Screen
          name="Player"
          component={Player}
          options={header}
          headerShown={false}
        />

        <Stack.Screen
          name="load"
          component={Loading}

          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="statistics"
          component={StatisticsScreen}
          options={header}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*



 <Stack.Screen
          name="home"
          component={Home}
          options={header}
          headerShown={false}
        />
        
        */
