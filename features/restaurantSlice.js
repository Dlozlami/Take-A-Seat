// restaurantlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorisation, db } from "../firebaseConfig";
import { Alert } from "react-native";
import { addDoc, getDocs, collection, updateDoc, doc,query,where } from "firebase/firestore";

const initialState = {
  loading: false,
  error: null,
  restaurantsList: [],
  myRestaurants:[],
  itemsLength: 0,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    addItemToList(state, action) {},

    removeItemFromList(state, action) {},

    clearitemsList(state) {
      state.itemsList = [];
      state.itemsLength = state.itemsList.length;
      updateSubtotalAndTotal(state);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getRestaurants.fulfilled, (state, action) => {
      state.restaurantsList = action.payload; // Update the state with the fetched lists
    })
    .addCase(getRestaurantsByOwner.fulfilled, (state, action) => {
      state.myRestaurants = action.payload; // Update the state with the fetched lists
    });
  },
});

export const addRestaurant = createAsyncThunk(
  "restaurant/addRestaurant",
  async (restaurantData, thunkAPI) => {
    const restaurantsCollection = collection(db, "restaurants");
    //console.log("New restaurant adding 12..:");

    try {
      const newRestaurant = await addDoc(restaurantsCollection, restaurantData);
      Alert.alert("Success", "The restaurant has been added successfully.");
      alert("The restaurant has been added successfully.");
      console.log("New restaurant document ID:", newRestaurant.id);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  }
);

export const getRestaurants = createAsyncThunk(
  "restaurant/getRestaurants",
  async (_, thunkAPI) => {
    try {
      const restaurantsCollection = collection(db, "restaurants");
      const querySnapshot = await getDocs(restaurantsCollection);

      const restaurants = [];
      querySnapshot.forEach((doc) => {
        const restaurantData = doc.data();
        const restaurant = {
          id: doc.id, // Extracting the ID
          ...restaurantData, // Rest of the data
        };
        //console.log("restaurantSlice LINE 41 restaurant: ", restaurant);
        restaurants.push(restaurant);
      });

      return restaurants;
    } catch (error) {
      console.error("Error getting restaurants:", error);
      throw error;
    }
  }
);



export const getRestaurantByID = createAsyncThunk(
  "restaurant/getRestaurantByID",
  async (restaurantID, thunkAPI) => {
    console.log("restaurantsSlice.js line 83 restaurantID: ", restaurantID);
    try {

      const restaurantsCollection = doc(db, "restaurants", restaurantID);

      const querySnapshot = await getDocs(restaurantsCollection);

      const restaurants = [];
      querySnapshot.forEach((doc) => {
        const restaurantData = doc.data();
        const restaurant = {
          id: doc.id, // Extracting the ID
          ...restaurantData, // Rest of the data
        };
        restaurants.push(restaurant);
      });
      //console.log("Restaurant list: ", restaurants);
      restaurants.sort((a, b) => a.restaurantDate - b.restaurantDate);
      return restaurants;
    } catch (error) {
      console.error("Error getting restaurants:", error);
      throw error;
    }
  }
);

export const getRestaurantsByOwner = createAsyncThunk(
  "restaurant/getRestaurantsByOwner",
  async (ownerEmail, thunkAPI) => {
    try {
      const restaurantsCollection = collection(db, "restaurants");

      const queryRestaurants = query(
        restaurantsCollection,
        where("owner", "==", ownerEmail)
      );
      const querySnapshot = await getDocs(queryRestaurants);

      const restaurants = [];
      querySnapshot.forEach((doc) => {
        const restaurantData = doc.data();
        const restaurant = {
          id: doc.id, // Extracting the ID
          ...restaurantData, // Rest of the data
        };
        //console.log("restaurantSlice LINE 41 restaurant: ", restaurant);
        restaurants.push(restaurant);
      });

      return restaurants;
    } catch (error) {
      console.error("Error getting restaurants:", error);
      throw error;
    }
  }
);


export const deleteRestaurant = createAsyncThunk(
  "restaurant/deleteRestaurant",
  async (restaurantID, thunkAPI) => {
    console.log("restaurantsSlice.js line 138 restaurantID: ", restaurantID);
    try {
        deleteDoc(doc(db,"restaurants",restaurantID));
        Alert.alert("Success", "The restaurant has been deleted successfully.");
        alert("The restaurant has been deleted successfully.");
        console.log('Deleted: ', restaurantID);
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      throw error;
    }
  }
);

export const updateRestaurant = createAsyncThunk(
  "restaurant/updateRestaurant",
  async (restaurantData, thunkAPI) => {
    console.log("restaurantsSlice.js line 153 restaurantID: ", restaurantData[0]);
    try {
        updateDoc(doc(db,"restaurants",restaurantData[0]),restaurantData[1]);
        Alert.alert("Success", "The restaurant has been updated successfully.");
        alert("The restaurant has been updated successfully.");
        console.log('updated: ', restaurantData[0]);
    } catch (error) {
      console.error("Error updating restaurant:", error);
      throw error;
    }
  }
);

export const { addItemToList, removeItemFromList, clearitemsList } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
