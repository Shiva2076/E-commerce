import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import WishlistScreen from './src/screens/WishlistScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen} 
              options={({ route }) => ({ title: route.params.title })} 
            />
            <Stack.Screen 
              name="Cart" 
              component={CartScreen} 
              options={{ title: 'Shopping Cart' }} 
              
            />
            <Stack.Screen 
              name="Wishlist" 
              component={WishlistScreen} 
              options={{ title: 'My Wishlist' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;