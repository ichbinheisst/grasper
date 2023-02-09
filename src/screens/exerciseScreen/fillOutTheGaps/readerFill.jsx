import React, { useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
export default function ReaderFill({
  text,
  HideShowButton,
  input,
  setInput,
  Correct,
  keyRef,
  inputTextColor,
  isDark,
  fontSizing


}) {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

 

  return (
    <SafeAreaView style={styles.container}>

    
      <View>
        {text == "*" ? (
          <Input
            HideShowButton={HideShowButton}
            text={text}
            input={input}
            setInput={setInput}
            Correct={Correct}
            keyRef={keyRef}
            inputTextColor={inputTextColor}
            isDark={isDark}
            fontSize={fontSizing}
            
          />
        ) : (
          <TextingComponent text={text} isDark={isDark} fontSize={fontSizing} />
        )}
      </View>
    </SafeAreaView>
  );
}

function Input({ text, input, setInput, Correct, inputTextColor, isDark,fontSize }) {
  const keyboard = React.useRef();

  React.useEffect(() => {
    if (keyboard.current) {
      keyboard.current.focus();
    }
  }, [text]);

  React.useEffect(() => {
    if (keyboard.current) {
      keyboard.current.focus();
    }
  }, [Correct]);

  return (
    <TextInput
      placeholder="type"
      ref={keyboard}
      value={input}
      onChangeText={(txt) => setInput(txt)}
      onSubmitEditing={() => {
        Correct();
      }}
      style={{ ...styles.input, color: inputTextColor, fontSize: fontSize }}
      autoCapitalize={false}
      autoCorrect={false}
    />
  );
}

function TextingComponent({ text, font, isDark,fontSize }) {
  return (
    <Pressable>
      <Text
        style={{
          fontSize: fontSize,
          fontFamily: font,
          color: !isDark ? "#000" : "#fff",
        }}
      >
        {text}{" "}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
  },
  textBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 50,
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 0,

    // opacity: 0.05,
    //backgroundColor: "#fff",
  },
  fontText: {
    fontSize: 20,
  },
  input: {
    backgroundColor: "#100f0fc5",
    marginHorizontal: 15,
    minWidth: 130,
    fontSize: 17,

    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    minHeight: 34,
  },
});
