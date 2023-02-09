import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homeScreen";
import SettingScreenScreen from "../screens/settingScreen";
import colorSchema from "../../colorSchemma/color";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FavoriteListScreen from "../screens/favoriteListScreen";
import { AntDesign } from "@expo/vector-icons";

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

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorSchema.main,
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
                size={20}
                color={focused ? "#ffff" : colorSchema.fontH2}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreenScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign name="bars" size={23} color={focused ? "#ffff" : colorSchema.fontH2}/>
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
                size={20}
                color={focused ? "#ffff" : colorSchema.fontH2}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
