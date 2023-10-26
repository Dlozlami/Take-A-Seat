import { Alert, ImageBackground, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CTAButton } from "../components/CTAButton";
import { styles } from "../assets/css/styles";
const backgroundImage = require("../assets/images/duotone.jpg");
import { useDispatch } from "react-redux";
import { addRestaurant } from "../features/restaurantSlice";

export default function AddRestaurant() {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { loggedUser } = useSelector((store) => store.login);
  const [imageURL, setImageURL] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [numberOfTables, setNumberOfTables] = useState(0);

  const handleAddRestaurant = async () => {
    if (
      email &&
      imageURL &&
      name &&
      description &&
      location &&
      phone &&
      numberOfTables
    ) {
      const newRestaurant = {
        imageURL: imageURL,
        name: name,
        description: description,
        location: location,
        phone: phone,
        email: email,
        numberOfTables: numberOfTables,
        ratings: [0.0],
        owner:loggedUser.email
      };
      dispatch(addRestaurant(newRestaurant));
      setName(null);
      setEmail(null);
      setLocation(null);
      setDescription(null);
      setImageURL(null);
      setPhone(null);
      setNumberOfTables(null);
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <>
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
                Add a new restaurant
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <TextInput
                style={styles.loginTextField}
                placeholder="Restaurant name"
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
                placeholder="Bio"
                value={description || ""}
                onChangeText={setDescription}
                inputMode="text"
              />
              <TextInput
                style={styles.loginTextField}
                placeholder="Image URL"
                value={imageURL || ""}
                onChangeText={setImageURL}
                autoCapitalize="none"
                inputMode="text"
              />
              <TextInput
                style={styles.loginTextField}
                placeholder="Address"
                value={location || ""}
                onChangeText={setLocation}
                autoCapitalize="none"
                inputMode="text"
              />
              <TextInput
                style={styles.loginTextField}
                placeholder="Number of tables"
                value={numberOfTables || ""}
                onChangeText={setNumberOfTables}
                inputMode="numeric"
              />
            </View>
            <View style={{ padding: 10 }}>
              <CTAButton
                title="Add restaurant"
                onPress={handleAddRestaurant}
                variant="primary"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
