import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import AddPostScreen from "../screens/AddPostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const screenStyle = StyleSheet.create({
  paddingBottom: "50px",
});

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      sceneContainerStyle={screenStyle}
      style={{position: "relative"}}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          // tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="addPost"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
