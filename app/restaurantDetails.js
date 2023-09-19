import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native-web";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RestaurantDetails = ({ restaurant }) => {
  const [openModal, setOpenodal] = useState(false);
  const nav = useNavigation();
  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setOpenodal(true);
          console.log("restCard line 12 openModal: ", openModal);
        }}
      >
        <Image
          source={restaurant.imageURL}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ display: "flex" }}>
          <View style={styles.details}>
            <Text style={styles.name}>{restaurant.name}</Text>

            <Text style={styles.location}>{restaurant.location}</Text>
            <Text style={styles.contact}>{restaurant.phone}</Text>
            <Text style={styles.ratings}>Ratings: {restaurant.ratings}</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              name="table-chair"
              size={24}
              color="black"
            />
          </View>
        </View>
      </TouchableOpacity>

      <Modal>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={restaurant.imageURL}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.details}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.description}>{restaurant.description}</Text>
              <Text style={styles.location}>{restaurant.location}</Text>
              <Text style={styles.contact}>
                {restaurant.phone} • {restaurant.email}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setOpenodal(false)}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    zIndex: 5,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,

    alignItems: "center",
    elevation: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  location: {
    color: "#555",
    marginBottom: 5,
  },
  contact: {
    color: "#555",
    marginBottom: 5,
  },
  ratings: {
    color: "#639e79",
  },
});

export default RestaurantDetails;
