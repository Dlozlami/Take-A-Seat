import {
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { CTAButton } from "../components/CTAButton";
import { styles } from "../assets/css/styles";
const backgroundImage = require("../assets/images/duotone.jpg");
import { useDispatch } from "react-redux";
import { loginUser, setIsLoggedIn } from "../features/loginSlice";
import { onAuthStateChanged } from "firebase/auth";
import { authorisation } from "../firebaseConfig";
import Preloader from "../components/preloader";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);

  const goToMainFlow = async () => {
    setLoading(true);
    dispatch(loginUser({ email: email, password: password }));
    setEmail(null);
    setPassword(null);
    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authorisation, (authUser) => {
      if (authUser) {
        console.log("_layout line 37 authUser: ", authUser);
        // User is signed in.
        dispatch(setIsLoggedIn(true));
        nav.push("mainFlow");
      } else {
        // User is signed out.
        console.log("_layout line 43 authUser: ", authUser);
        dispatch(setIsLoggedIn(false));
        setLoading(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  });

  return (<>
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
            <Text style={{ ...styles.subtitle, color: "white" }}>Log in </Text>
            <Text style={{ color: "white" }}>
              And set a time to savor your favorite flavors again.
            </Text>
          </View>
          <View style={{ padding: 10 }}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email || ""}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password || ""}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={{ padding: 10 }}>
            <CTAButton title="Login" onPress={goToMainFlow} variant="primary" />
          </View>
          <TouchableOpacity
            onPress={() => nav.push("signup")}
            style={styles.borderlessBTN}
          >
            <Text style={{ color: "#639e79", fontWeight: "bold" }}>
              Don't have an account? Sign up here!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    <Modal visible={loading} transparent style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center"}}>
      <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#3498db"
        />
    </Modal>
    </>
  );
}
