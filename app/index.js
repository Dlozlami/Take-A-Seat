import React, { useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CTAButton } from "../components/CTAButton";
import { styles } from "../assets/css/styles";
import { onAuthStateChanged } from "firebase/auth";
import { authorisation } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUserEmail } from "../features/loginSlice";
const backgroundImage = require("../assets/images/pexels-lina-kivaka-1813502.jpg"); // Update with your actual image path

export default function Welcome() {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const goToLogin = () => {
    nav.push("login");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authorisation, (authUser) => {
      if (authUser) {
        // User is signed in.
        console.log("index.js line 23 authUser: ", authUser);
        dispatch(setIsLoggedIn(true));
        dispatch(setUserEmail(authUser.email));
        nav.push("mainFlow");
      } else {
        // User is signed out.
        console.log("index.js line 28 authUser: ", authUser);
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
      <View style={styles.main}>
        <View style={{ ...styles.content, width: "80%" }}>
          <Text style={styles.title}>Take-A-Seat</Text>
          <Text style={styles.heading}>
            Reserve Your Flavorful Experience with Take-A-Seat: Where Every Bite
            Begins with a Booking!
          </Text>
          <View>
            <CTAButton
              title="Let's get started"
              onPress={goToLogin}
              variant="primary"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
