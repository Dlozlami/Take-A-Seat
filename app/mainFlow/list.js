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
import {
  loginUser,
  logoutUser,
  setIsLoggedIn,
} from "../../features/loginSlice";
import { onAuthStateChanged } from "firebase/auth";
import { authorisation } from "../../firebaseConfig";

export default function List() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={{ width: "100%", height: "100%" }}
    ></ImageBackground>
  );
}
