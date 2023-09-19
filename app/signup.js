import { Alert, ImageBackground, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CTAButton } from "../components/CTAButton";
import { styles } from "../assets/css/styles";
import { addDoc, getDoc, collection, setDoc, doc } from "firebase/firestore";
const backgroundImage = require("../assets/images/duotone.jpg");
import { authorisation, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const nav = useNavigation();

  const goToSignUp = async () => {
    if (email && password && name) {
      const usersCollection = collection(db, "users");

      try {
        const response = await createUserWithEmailAndPassword(
          authorisation,
          email,
          password
        );
        const newUserDocRef = await addDoc(usersCollection, {
          name: name,
          email: email,
          password: password,
          phone: phone,
        });
        Alert.alert("Success", "The user has been added successfully.");
        console.log("New user document ID:", newUserDocRef.id);
      } catch (error) {
        console.error("Error creating user:", error);
      }

      setName(null);
      setEmail(null);
      setPassword(null);
      setPhone(null);
      nav.push("login");
    } else {
      Alert.alert("Opps...", "Please fill in all the fields.");
    }
  };

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
            <Text style={{ ...styles.subtitle, color: "white" }}>Sign up </Text>
            <Text style={{ color: "white" }}>
              Join us and explore a world of culinary delights. Your table
              awaits!
            </Text>
          </View>
          <View style={{ padding: 10 }}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Full name"
              value={name || ""}
              onChangeText={setName}
              inputMode="text"
            />
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
              placeholder="Phone number"
              value={phone || ""}
              onChangeText={setPhone}
              autoCapitalize="none"
              inputMode="text"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password || ""}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>
          <View style={{ padding: 10 }}>
            <CTAButton title="Sign up" onPress={goToSignUp} variant="primary" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
