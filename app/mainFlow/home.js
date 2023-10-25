import {
  ImageBackground,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,Text
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../assets/css/styles";
const backgroundImage = require("../../assets/images/duotone.jpg");
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../features/restaurantSlice";
import Search from "../../components/search";
import FilterBTN from "../../components/filterBTN";
import RestaurantCard from "../../components/restaurantCard";
import AddRestaurantBTN from "../../components/addRestaurantBTN";

export default function Home() {
  const {loggedUser } = useSelector((store) => store.login);
  const { restaurantsList } = useSelector((store) => store.restaurant);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getRestaurants());
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
          {loggedUser.admin?
          <Text style={{fontSize:20,fontWeight:700,paddingVertical:20,color:"#335930"}}>My Restaurants</Text>
          :
          <ScrollView
            horizontal
            contentContainerStyle={myStyles.horizonalScroll} showsHorizontalScrollIndicator={false}
          >
            <FilterBTN title="Sushi" />
            <FilterBTN title="7 colours" />
            <FilterBTN title="Burgers" />
            <FilterBTN title="Seafood" />
            <FilterBTN title="Chinese" />
            <FilterBTN title="Thai" />
            <FilterBTN title="Italian" />
          </ScrollView>
          }
        </View>
        {/*console.log(restaurantsList)*/}
        <ScrollView contentContainerStyle={myStyles.cardContainer}>
          {restaurantsList.map((restaurant, index) => (
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
