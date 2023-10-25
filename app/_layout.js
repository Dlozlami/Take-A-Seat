import React, { useEffect } from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./index";
import SignUp from "./signup";
import Login from "./login";
import MainFlow from "./mainFlow/_layout";
import RestaurantDetails from "./restaurantDetails";
import AddRestaurant from "./addRestaurant";
import EditRestaurant from "./editRestaurant";

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={Welcome}
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{ title: "Log in" }}
        />
        <Stack.Screen
          name="addRestaurant"
          component={AddRestaurant}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="editRestaurant"
          component={EditRestaurant}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: "Log in", headerShown: false }}
        />
        <Stack.Screen
          name="mainFlow"
          component={MainFlow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="restaurantDetails"
          component={RestaurantDetails}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </Provider>
  );
}
