import React from "react"
import { Text, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import WelcomeScreen from "../screens/WelcomeScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import FeedScreen from "../screens/FeedScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import CartScreen from "../screens/CartScreen"
import SettingsScreen from "../screens/SettingsScreen"
import ProductScreen from "../screens/ProductScreen"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../utils/colors"

// initialize stack and bottom tab navigator
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Anasayfa"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.inActiveLabel}>
              Anasayfa
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-home-sharp" : "ios-home-outline"}
              size={focused ? 26 : 24}
              color={focused ? Colors.darkGreen : Colors.fadedBlack}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorilerim"
        component={FavoritesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.inActiveLabel}>
              Favorilerim
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart-sharp" : "heart-outline"}
              size={focused ? 26 : 24}
              color={focused ? Colors.darkGreen : Colors.fadedBlack}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sepetim"
        component={CartScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.inActiveLabel}>
              Sepetim
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "cart-sharp" : "cart-outline"}
              size={focused ? 26 : 24}
              color={focused ? Colors.darkGreen : Colors.fadedBlack}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Hesabım"
        component={SettingsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.inActiveLabel}>
              Hesabım
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              size={focused ? 26 : 24}
              color={focused ? Colors.darkGreen : Colors.fadedBlack}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  activeLabel: {
    color: Colors.darkGreen,
    fontSize: 12,
    marginBottom: 3,
    marginTop: -2,
  },
  inActiveLabel: {
    color: "gray",
    fontSize: 10,
    marginBottom: 3,
    marginTop: -2,
  },
})
