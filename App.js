import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import state context & design system theme
import { StateProvider } from './src/context/StateContext';
import { Theme } from './src/styles/theme';

// Import Vector Icons (Lucide wrappers)
import { Home, ClipboardList, Tag, Receipt, User as UserIcon } from 'lucide-react-native';

// Import Screens
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import InvoicesScreen from './src/screens/InvoicesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import BookingConfirmationScreen from './src/screens/BookingConfirmationScreen';
import DispatchTrackingScreen from './src/screens/DispatchTrackingScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import AccountSummaryScreen from './src/screens/AccountSummaryScreen';
import SupportScreen from './src/screens/SupportScreen';
import FAQScreen from './src/screens/FAQScreen';

// Import Fonts Loader
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Navigator Hub
function CustomerTabHub() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconSize = 20;
          if (route.name === 'Home') {
            return <Home size={iconSize} color={color} />;
          } else if (route.name === 'Orders') {
            return <ClipboardList size={iconSize} color={color} />;
          } else if (route.name === 'Brands') {
            return <Tag size={iconSize} color={color} />;
          } else if (route.name === 'Invoices') {
            return <Receipt size={iconSize} color={color} />;
          } else if (route.name === 'Profile') {
            return <UserIcon size={iconSize} color={color} />;
          }
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textLight,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: Theme.colors.white,
          borderTopWidth: 1,
          borderTopColor: Theme.colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Brands" component={CategoriesScreen} />
      <Tab.Screen name="Invoices" component={InvoicesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // Load Google Fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right' // Native clean slide animations
          }}
        >
          {/* Authorization flows */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Main Dashboard App */}
          <Stack.Screen name="CustomerTabs" component={CustomerTabHub} />

          {/* Inner catalog flows */}
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="Invoices" component={InvoicesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ProductList" component={ProductListScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
          <Stack.Screen name="DispatchTracking" component={DispatchTrackingScreen} />
          <Stack.Screen name="Payments" component={PaymentsScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="AccountSummary" component={AccountSummaryScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="FAQ" component={FAQScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
