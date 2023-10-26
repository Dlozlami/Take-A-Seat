import { ImageBackground, Text, View, TextInput,TouchableOpacity,Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CTAButton } from "../components/CTAButton";
import { styles } from "../assets/css/styles";
const backgroundImage = require("../assets/images/duotone.jpg");
import { useDispatch, useSelector } from "react-redux";
import { addRestaurant } from "../features/restaurantSlice";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddRestaurant() {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { loggedUser } = useSelector((store) => store.login);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [numberOfTables, setNumberOfTables] = useState(0);
  const [images, setImages] = useState(null);
  const storage = getStorage();

  const handleImageUpload = async () => {
    // Check for permissions to access the device's image library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access the image library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    if (!result.canceled) {
      const imageUri = result.uri;

      // Create a reference to Firebase Storage
      const storageRef = ref(storage, `images/${Date.now()}`);

      try {
        // Convert the image file to a Blob
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        setImages(downloadURL);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleAddRestaurant = async () => {
    if (
      email &&
      images &&
      name &&
      description &&
      location &&
      phone &&
      numberOfTables
    ) {
      const newRestaurant = {
        imageURL: images,
        name: name,
        description: description,
        location: location,
        phone: phone,
        email: email,
        numberOfTables: numberOfTables,
        ratings: [0.0],
        owner: loggedUser.email,
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

              <Text style={styles.label}>Image:</Text>
              <View style={styles.imageContainer}>
                {images && (
                  <Image
                    source={{ uri: images }}
                    style={styles.uploadedImage}
                  />
                )}
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleImageUpload}
                >
                  <Text style={styles.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>
              </View>
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
