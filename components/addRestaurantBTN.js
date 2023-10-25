import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function AddRestaurantBTN({
  size = 36,
  bgColor = "#5df4a0",
  textColor = "#335930",
  setModalVisible,
}) {
  const nav = useNavigation();
  const { loggedUser } = useSelector((store) => store.login);
  return (
    <>
      {loggedUser.admin ? (
        <TouchableOpacity
          style={{ ...styles.circle, backgroundColor: bgColor }}
          onPress={() => nav.push("addRestaurant")}
        >
          <MaterialCommunityIcons
            name="store-plus"
            size={size}
            color={textColor}
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 100,
    margin: 10,
    position: "absolute",
    bottom: 40,
    right: 40,
    zIndex: 9999,
    padding: 20,
    borderRadius: 100,
  },
});
