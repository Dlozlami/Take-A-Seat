import {
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { authorisation } from "../../firebaseConfig";
const backgroundImage = require("../../assets/images/duotone.jpg");
import { useDispatch, useSelector } from "react-redux";
import { getReservationsByUserEmail,getReservationsByRestaurantID } from "../../features/reservationSlice";
import ReservationCard from "../../components/reservationCard";
import Constants from "expo-constants";

export default function List() {
  const dispatch = useDispatch();
  const { reservationsList,restaurantReservations } = useSelector((store) => store.reservation);
  const {loggedUser } = useSelector((store) => store.login);
  const { myRestaurants } = useSelector((store) => store.restaurant);

  useEffect(() => {
    const restaurantIDList = myRestaurants.map(restaurant => restaurant.id);
    const user = authorisation.currentUser;
    console.log("list.js line 22 userEmail: ", user.email);
    !loggedUser.admin?dispatch(getReservationsByUserEmail(user.email)):
    dispatch(getReservationsByRestaurantID(restaurantIDList));
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView style={{paddingTop:Constants.statusBarHeight}}>
        {loggedUser.admin?restaurantReservations.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      )):reservationsList.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
      </ScrollView>
      
    </ImageBackground>
  );
}
