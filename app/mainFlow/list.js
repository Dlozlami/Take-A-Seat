import {
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { CTAButton } from "../../components/CTAButton";
import { styles } from "../../assets/css/styles";
const backgroundImage = require("../../assets/images/duotone.jpg");
import { useDispatch, useSelector } from "react-redux";
import { getReservationsByUserEmail } from "../../features/reservationSlice";

export default function List() {
  const dispatch = useDispatch();
  const { reservationsList } = useSelector((store) => store.reservation);
  const { userEmail } = useSelector((store) => store.login);

  useEffect(() => {
    dispatch(getReservationsByUserEmail(userEmail));
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={{ width: "100%", height: "100%" }}
    ></ImageBackground>
  );
}
