import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homeScreen";
import SettingScreenScreen from "../screens/settingScreen";
import colorSchema from "../../colorSchemma/color";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FavoriteListScreen from "../screens/favoriteListScreen";
import { AntDesign } from "@expo/vector-icons";
import MyButton from "../components/button/spinningButton";
import AlbumScreen from "../screens/albumScreen";
import SquareButton from "../components/button/squareButton";
const Tab = createBottomTabNavigator();

export default function BottomTabs({ navigation }) {
  const header = {
    headerTitleStyle: {
      fontSize: 25,
      color: colorSchema.dark ? "#fff" : colorSchema.colorFullPallet.mainColor,
    },
    headerStyle: {
      backgroundColor: colorSchema.dark ? "#000000f9" : "#fff", // "#A200E8",
    },
  };

  function navigate(address) {
    if (!address) return;
    navigation.navigate(address);
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorSchema.background.primary,
          //paddingVertical: 10,
          //height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        headerShown={false}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign
                name="home"
                size={25}
                color={
                  !focused
                    ? colorSchema.fonts.h2
                    : !colorSchema.dark
                    ? "#c6c6c6"
                    : colorSchema.triade.primary
                }
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="x"
        component={FavoriteListScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: "center",
                top: -15,
                alignSelf: "center",
              }}
            >
              <SquareButton  action={()=>navigation.navigate("setting") }/>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={FavoriteListScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign
                name="star"
                size={25}
                color={
                  !focused
                    ? colorSchema.fonts.h2
                    : !colorSchema.dark
                    ? "#c6c6c6"
                    : colorSchema.triade.primary
                }
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
/*


   <Tab.Screen
        name="Settings"
        component={SettingScreenScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign
                name="bars"
                size={23}
                color={
                  focused
                    ? "#f8b133"
                    : !colorSchema.dark
                    ? "rgb(0, 45, 90)"
                    : "rgb(0, 165, 255)"
                }
              />
            </View>
          ),
        }}
      />

*/
