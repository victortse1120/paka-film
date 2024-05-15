import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import Main from "./components/Main";
import Order from "./components/Order";
import ProductDetail from "./components/ProductDetail";
import TakePhoto from "./pages/TakePhoto";
import Home from "./components/Home";
import Market from "./components/Market";
import Setting from "./components/Setting";

import HomeSvg from "./assets/svg/homeSvg";
import FilmSvg from "./assets/svg/filmSvg";
import CertSvg from "./assets/svg/certSvg";
import SettingSvg from "./assets/svg/settingSvg";
import PakafilmSvg from "./assets/svg/pakafilmSvg";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Mytheme = {
  colors: {
    primary: "#9a2553",
    text: "black",
    card: "#3C3C3C",
    border: "#646464",
  },
};

export default function App() {
  const navigationRef = useNavigationContainerRef();

  const backButton = () => {
    return (
      <TouchableOpacity onPress={() => navigationRef.current?.goBack()}>
        <Ionicons name="chevron-back" size={40} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
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
            initialRouteName={"MainBottomTab"}
            screenOptions={{
              headerTitle: "",
              headerTransparent: true,
              gestureEnabled: false,
            }}
          >
            <Stack.Screen
              name="MainBottomTab"
              component={MainBottomTab}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{ headerLeft: backButton }}
            />
            <Stack.Screen
              name="TakePhoto"
              component={TakePhoto}
              options={{ headerLeft: backButton }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const MainBottomTab = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 2,
          paddingBottom: 2,
          minHeight: 60 + insets.bottom,
          paddingBottom: insets.bottom,
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
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeSvg name="home" fill={color} />,
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
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
          headerShown: false,
          tabBarIcon: ({ color }) => <CertSvg name="cart-heart" fill={color} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingSvg name="Setting" fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
