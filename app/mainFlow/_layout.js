import { Tabs } from "expo-router/tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AdminHome from "./adminHome";
import ProfileScreen from "./profile";
import ListScreen from "./list";
import {useSelector } from "react-redux";
import ClientHome from './clientHome'

const Tab = createBottomTabNavigator();

export default function MainFlow() {
  const { loggedUser } = useSelector((store) => store.login);
  return (
    <>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name="home"
          component={loggedUser.admin?AdminHome:ClientHome}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons
                name="home-filled"
                size={24}
                color={focused ? "#2a6a42" : color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="list"
          component={ListScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted-type"
                size={24}
                color={focused ? "#2a6a42" : color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
                name="user-circle-o"
                size={24}
                color={focused ? "#2a6a42" : color}
              />
            ),
          }}
        />
        
      </Tab.Navigator>
      {/* <Tab.Screen
          name="addRestaurant"
          component={AddRestaurant}
          tabBarShowLabel={true}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name="store-plus"
                size={24}
                color={focused ? "#2a6a42" : color}
              />
            ),
          }}
        /><Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide tab labels
        activeTintColor: "#d2ff58",
      }}
    >
      <Tabs.Screen
        name="mainFlow/home"
        component=
        
      />
      <Tabs.Screen
        name="mainFlow/list"
        
      />

      <Tabs.Screen
        name="mainFlow/profile"
        
      />
     <Tabs.Screen
        name="schedule"
        options={{
          title: "Event Programme | The Meet Up",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="calendar"
              style={{ color: focused ? "#2a6a42" : color }}
              size={size}
            />
          ),
        }}
      /> 
    </Tabs>*/}
    </>
  );
}
