import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorisation, db } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
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
  userEmail: null,
  isLoggedIn: false,
  allUsers: [],
  loggedUser: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.loggedUser = action.payload;
        state.loggedUser.password = "##########"
      });
  },
});

export const logoutUser = createAsyncThunk(
  "login/logoutUser",
  async (_, thunkAPI) => {
    authorisation
      .signOut()
      .then(() => {
        thunkAPI.dispatch(setIsLoggedIn(false));
      })
      .catch((error) => alert(error.message));
  }
);

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (user, thunkAPI) => {
    signInWithEmailAndPassword(authorisation, user.email, user.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("loginSlice line 27 userCredentials:", user.email);

        thunkAPI.dispatch(setIsLoggedIn(true));
        thunkAPI.dispatch(setUserEmail(user.email));
        //nav.replace("login");
      })
      .catch((error) => alert(error.message));
  }
);

export const getUserByEmail = createAsyncThunk(
  "login/getUserByEmail",
  async (email, thunkAPI) => {
    console.log("usersSlice.js line 65 userEmail: ", email);
    try {
      const usersCollection = collection(db, "users");

      const queryReservations = query(
        usersCollection,
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(queryReservations);

      const users = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const user = {
          id: doc.id, // Extracting the ID
          ...userData, // Rest of the data
        };
        users.push(user);
      });
      console.log("loginSlice.js line 85 user details: ", users);
      return users[0];
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "login/getAllUsers",
  async (_, thunkAPI) => {
    console.log("loginSlice.js line 88 login/getAllUsers: ");
    try {
      const usersCollection = collection(db, "users");

      const users = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const user = {
          id: doc.id, // Extracting the ID
          ...userData, // Rest of the data
        };
        users.push(user);
      });
      //console.log("Reservation list: ", users);
      return users;
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  }
);

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setUserEmail } = loginSlice.actions;

export default loginSlice.reducer;
