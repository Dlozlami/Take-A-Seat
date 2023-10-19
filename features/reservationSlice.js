// reservationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorisation, db } from "../firebaseConfig";
import { Alert } from "react-native";
import {
  addDoc,
  getDocs,
  collection,
  setDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

const initialState = {
  loading: false,
  error: null,
  reservationsList: [],
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
  extraReducers: (builder) => {
    builder.addCase(getReservationsByUserEmail.fulfilled, (state, action) => {
      state.reservationsList = action.payload; // Update the state with the fetched lists
    });
  },
});

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservationData, thunkAPI) => {
    console.log("New restaurant adding 12..:");
    const reservationsCollection = collection(db, "reservations");

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

export const getReservationsByUserEmail = createAsyncThunk(
  "reservation/getReservationsByUserEmail",
  async (userEmail, thunkAPI) => {
    console.log("reservationsSlice.js line 65 userEmail: ", userEmail);
    try {
      const reservationsCollection = collection(db, "reservations");

      const queryReservations = query(
        reservationsCollection,
        where("userEmail", "==", userEmail)
      );
      const querySnapshot = await getDocs(queryReservations);

      const reservations = [];
      querySnapshot.forEach((doc) => {
        const reservationData = doc.data();
        const reservation = {
          id: doc.id, // Extracting the ID
          ...reservationData, // Rest of the data
        };
        reservations.push(reservation);
      });
      //console.log("Reservation list: ", reservations);
      return reservations;
    } catch (error) {
      console.error("Error getting reservations:", error);
      throw error;
    }
  }
);

export const { addItemToList, removeItemFromList, clearitemsList } =
  reservationSlice.actions;
export default reservationSlice.reducer;
