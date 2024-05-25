import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StatusBar, TouchableOpacity } from "react-native";
import Main from "./components/Main";
import Order from "./components/Order";
import Home from "./components/Home";
import Market from "./components/Market";
import Setting from "./components/Setting";
import ProductDetail from "./components/ProductDetail";
import ReviewList from "./components/ReviewList";
import LogIn from "./pages/LogIn";
import ReviewDetail from "./pages/ReviewDetail";
import TakePhoto from "./pages/TakePhoto";
import WriteReview from "./pages/WriteReview";

import HomeSvg from "./assets/svg/homeSvg";
import FilmSvg from "./assets/svg/filmSvg";
import CertSvg from "./assets/svg/certSvg";
import SettingSvg from "./assets/svg/settingSvg";
import PakafilmSvg from "./assets/svg/pakafilmSvg";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Mytheme = {
  colors: {
    primary: "#9a2553",
    text: "black",
    card: "#3C3C3C",
    border: "#646464",
  },
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const navigationRef = useNavigationContainerRef();

  const backButton = () => {
    return (
      <TouchableOpacity onPress={() => navigationRef.current?.goBack()}>
        <Ionicons name="chevron-back" size={40} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider style={{ backgroundColor: "#000" }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#000",
          }}
          edges={["left", "right"]}
        >
          <StatusBar barStyle={"light-content"} />
          <NavigationContainer theme={Mytheme} ref={navigationRef}>
            <Stack.Navigator
              screenOptions={{
                headerTitle: "",
                headerTransparent: true,
                gestureEnabled: false,
              }}
            >
              {currentUser ? (
                <Stack.Screen
                  name="Tabs"
                  component={TabNavigator}
                  options={{ headerShown: false }}
                />
              ) : (
                <Stack.Screen
                  name="LogIn"
                  component={LogIn}
                  options={{ headerShown: false }}
                />
              )}
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{ headerLeft: backButton }}
              />
              <Stack.Screen
                name="ReviewList"
                component={ReviewList}
                options={{ headerLeft: backButton }}
              />
              <Stack.Screen
                name="ReviewDetail"
                component={ReviewDetail}
                options={{ headerLeft: backButton }}
              />
              <Stack.Screen
                name="TakePhoto"
                component={TakePhoto}
                options={{ headerLeft: backButton }}
              />
              <Stack.Screen
                name="WriteReview"
                component={WriteReview}
                options={{ headerLeft: backButton }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 16,
          paddingBottom: 16,
          height: 80,
        },
        headerShown: false,
        tabBarActiveTintColor: "#FFC800",
        tabBarInactiveTintColor: "#A0A0A0",
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: "Film",
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeSvg name="home" fill={color} />,
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarLabel: "Review",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FilmSvg name="food-variant" size={30} fill={color} />
          ),
        }}
      />

      <Tab.Screen
        name="5 day Forecast"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: "absolute",
                bottom: 0, // space from bottombar
                marginBottom: 13,
              }}
            >
              <PakafilmSvg
                name="weather-cloudy-clock"
                size={50}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: "Favourite",
          headerShown: false,
          tabBarIcon: ({ color }) => <CertSvg name="cart-heart" fill={color} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: "Setting",
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingSvg name="Setting" fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
