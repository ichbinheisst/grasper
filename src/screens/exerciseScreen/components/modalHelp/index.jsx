import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Audio } from "expo-av";

async function ButtonTrack() {
  const { sound } = await Audio.Sound.createAsync(
    require("../../../../../assets/tracks/click.wav")
  );
  sound.playAsync();
}

const ModalTip = ({ info, isvisible, action }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isvisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ position: "absolute", top: -40, right: -20 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={async () => {
                await ButtonTrack();
                action();
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
          <Text style={styles.modalText}>Letters: {info?.length}</Text>
          <Text style={styles.modalText}>First: {info?.split("")[0]}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    paddingHorizontal: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 100,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#e60023", //"#4197ed",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
  },
});

export default ModalTip;
