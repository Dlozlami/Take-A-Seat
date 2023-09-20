import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorisation } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
  isLoggedIn: false,
};

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
        //nav.replace("login");
      })
      .catch((error) => alert(error.message));
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
