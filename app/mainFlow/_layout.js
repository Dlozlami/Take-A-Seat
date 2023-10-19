import { Tabs } from "expo-router/tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HomeScreen from "./home";
import ProfileScreen from "./profile";
import ListScreen from "./list";
import AddRestaurant from "./addRestaurant";

const Tab = createBottomTabNavigator();

export default function MainFlow() {
  return (
    <>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name="home"
          component={HomeScreen}
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
        <Tab.Screen
          name="addRestaurant"
          component={AddRestaurant}
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
      {/* <Tabs
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
