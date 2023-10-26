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
  deleteDoc,
  updateDoc
} from "firebase/firestore";

const initialState = {
  loading: false,
  error: null,
  reservationsList: [],
  restaurantReservations: [],
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
    builder
      .addCase(getReservationsByUserEmail.fulfilled, (state, action) => {
        state.reservationsList = action.payload;
      })
      .addCase(getReservationsByRestaurantID.fulfilled, (state, action) => {
        state.restaurantReservations = action.payload;
      });
  },
});

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservationData, thunkAPI) => {
    //console.log("New restaurant adding :",reservationData);
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
    //console.log("reservationsSlice.js line 73 userEmail: ", userEmail);
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
      reservations.sort((a, b) => a.reservationDate - b.reservationDate);
      return reservations;
    } catch (error) {
      console.error("Error getting reservations:", error);
      throw error;
    }
  }
);

export const getReservationsByRestaurantID = createAsyncThunk(
  "reservation/getReservationsByRestaurantID",
  async (restaurantIDList, thunkAPI) => {
    //console.log("reservationsSlice.js line 104 restaurantIDList: ", restaurantIDList);
    try {
      const reservationsCollection = collection(db, "reservations");
      const reservationPromises = restaurantIDList.map(async (restaurantID) => {
        const queryReservations = query(
          reservationsCollection,
          where("restaurantID", "==", restaurantID)
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

        return reservations;
      });

      const allReservations = await Promise.all(reservationPromises);
      const reservations = allReservations.flat(); // Flatten the array of arrays

      reservations.sort((a, b) => a.reservationDate - b.reservationDate);
      return reservations;
    } catch (error) {
      console.error("Error getting reservations:", error);
      throw error;
    }
  }
);


export const deleteReservation = createAsyncThunk(
  "reservation/deleteReservation",
  async (reservationID, thunkAPI) => {
    //console.log("reservationsSlice.js line 138 reservationID: ", reservationID);
    try {
        deleteDoc(doc(db,"reservations",reservationID));
        Alert.alert("Success", "The reservation has been deleted successfully.");
        alert("The reservation has been deleted successfully.");
        console.log('Deleted: ', reservationID);
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  }
);



export const updateReservation = createAsyncThunk(
  "reservation/updateReservation",
  async (reservationData, thunkAPI) => {
    //console.log("reservationsSlice.js line 153 reservationID: ", reservationData[0]);
    try {
        updateDoc(doc(db,"reservations",reservationData[0]),reservationData[1]);
        Alert.alert("Success", "The reservation has been updated successfully.");
        alert("The reservation has been updated successfully.");
        console.log('updated: ', reservationData[0]);
    } catch (error) {
      console.error("Error updating reservation:", error);
      throw error;
    }
  }
);

export const { addItemToList, removeItemFromList, clearitemsList } =
  reservationSlice.actions;
export default reservationSlice.reducer;
