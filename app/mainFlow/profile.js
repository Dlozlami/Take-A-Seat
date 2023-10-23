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

export default function Profile() {
  const { isLoggedIn, loggedUser } = useSelector((store) => store.login);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nav = useNavigation();

  const handleSignOut = () => {
    dispatch(logoutUser());
    nav.push("login");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authorisation, (authUser) => {
      if (authUser) {
        // User is signed in.
        dispatch(setIsLoggedIn(true));
      } else {
        // User is signed out.
        dispatch(setIsLoggedIn(false));
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.mainCenter}>
        <View style={styles.panelColumn}>
          <View
            style={{
              padding: 10,
              backgroundColor: "#639e79",
            }}
          >
            <Text style={{ ...styles.subtitle, color: "white" }}>
              Welcome, {loggedUser.name}
            </Text>
            <Text style={{ color: "white" }}>This is your dashboard.</Text>
          </View>
          <View style={{ padding: 10 }}>
            <CTAButton
              title="Home"
              onPress={() => nav.push("mainFlow")}
              variant="primary"
            />
          </View>
          <View style={{ padding: 10 }}>
            <CTAButton
              title="Edit Profile"
              onPress={() => nav.push("mainFlow")}
              variant="primary"
            />
          </View>
          <View style={{ padding: 10 }}>
            <CTAButton
              title="Log out"
              onPress={handleSignOut}
              variant="primary"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
