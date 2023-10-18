// reservationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorisation, db } from "../firebaseConfig";
import { Alert } from "react-native";
import { addDoc, getDocs, collection, setDoc, doc } from "firebase/firestore";

const initialState = {
  loading: false,
  error: null,
  reservations: [],
};

const reservationSlice = createSlice({
  name: "reservation",
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
});

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservationData, thunkAPI) => {
    const reservationsCollection = collection(db, "reservations");
    //console.log("New restaurant adding 12..:");

    try {
      const newReservation = await addDoc(
        reservationsCollection,
        reservationData
      );
      Alert.alert("Success", "The reservation has been added successfully.");
      alert("The reservation has been added successfully.");
      console.log("New reservation document ID:", newReservation.id);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  }
);

export const getReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservationData, thunkAPI) => {
    const reservationsCollection = collection(db, "reservations");
    //console.log("New restaurant adding 12..:");

    try {
      const newReservation = await addDoc(
        reservationsCollection,
        reservationData
      );
      Alert.alert("Success", "The reservation has been added successfully.");
      alert("The reservation has been added successfully.");
      console.log("New reservation document ID:", newReservation.id);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  }
);

export const { addItemToList, removeItemFromList, clearitemsList } =
  reservationSlice.actions;
export default reservationSlice.reducer;
