import { StyleSheet, Modal, View, Image } from "react-native";
import React from "react";
import spinner from "../assets/icons/preloader.gif";

export default function Preloader({ loading }) {
  console.log("Preloader line 6 loading: ",loading)
  return (
    <Modal transparent={true} visible={loading} animationType="fade">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image source={spinner} style={styles.spinner} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 10,
  },
  spinner: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
  },
});
