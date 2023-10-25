import { Alert, ImageBackground, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CTAButton } from "../components/CTAButton";
import { styles } from "../assets/css/styles";
import { addDoc, getDoc, collection, setDoc, doc } from "firebase/firestore";
const backgroundImage = require("../assets/images/duotone.jpg");
import { authorisation, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

export default function EditProfile() {
    const { loggedUser } = useSelector((store) => store.login);
  const [name, setName] = useState(loggedUser.name);
  const [email, setEmail] = useState(loggedUser.email);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(loggedUser.phone);
  const nav = useNavigation();

  const updateProfile = async () => {

      setName(null);
      setEmail(null);
      setPassword(null);
      setPhone(null);
      nav.push("profile");
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
            <Text style={{ ...styles.subtitle, color: "white" }}>Edit your profile </Text>
            <Text style={{ color: "white" }}>
              Make changes to your personal details
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
            <CTAButton title="Save changes" onPress={goToSignUp} variant="primary" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
