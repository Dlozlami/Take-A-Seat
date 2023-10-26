import {
  ImageBackground,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Text,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../assets/css/styles";
const backgroundImage = require("../../assets/images/duotone.jpg");
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantsByOwner,
} from "../../features/restaurantSlice";
import Search from "../../components/search";
import RestaurantCard from "../../components/restaurantCard";
import AddRestaurantBTN from "../../components/addRestaurantBTN";
import { useNavigation } from "@react-navigation/native";

export default function AdminHome() {
  const { loggedUser } = useSelector((store) => store.login);
  const { myRestaurants } = useSelector((store) => store.restaurant);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getRestaurantsByOwner(loggedUser.email));
    setLoading(true);
    console.log("Render");
    setLoading(false);
  }, []);

  return (
    <>
      <ImageBackground
        source={backgroundImage}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.header}>
          <Search />

          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              paddingVertical: 20,
              color: "#335930",
            }}
          >
            My Restaurants
          </Text>
        </View>

        <ScrollView contentContainerStyle={myStyles.cardContainer}>
          {myRestaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </ScrollView>
      </ImageBackground>
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#3498db"
        />
      )}
      <AddRestaurantBTN />
      <Modal
        visible={loading}
        transparent
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#3498db"
        />
      </Modal>
    </>
  );
}

const myStyles = StyleSheet.create({
  horizonalScroll: {
    display: "flex",
    flexDirection: "row", // Arrange items horizontally
    paddingVertical: 10,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
