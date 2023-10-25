import { ImageBackground, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CTAButton } from "../components/CTAButton";
import { styles } from "../assets/css/styles";
import {updateUser} from "../features/loginSlice";

const backgroundImage = require("../assets/images/duotone.jpg");

import { useDispatch, useSelector } from "react-redux";

export default function EditProfile() {
    const { loggedUser } = useSelector((store) => store.login);
  const [name, setName] = useState(loggedUser.name);
  const [email, setEmail] = useState(loggedUser.email);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(loggedUser.phone);
  const nav = useNavigation();
  const dispatch = useDispatch();

  const updateProfile = async () => {
    if(password){
    const newUserInfo = {
      name:name,
      email:email,
      password:password,
      phone:phone,
    }
      dispatch(updateUser([loggedUser.id,newUserInfo]))
      setName(null);
      setEmail(null);
      setPassword(null);
      setPhone(null);
      nav.push("index");
  }
  else{
    alert("Please fill in all the fields");
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
            <CTAButton title="Save changes" onPress={updateProfile} variant="primary" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
