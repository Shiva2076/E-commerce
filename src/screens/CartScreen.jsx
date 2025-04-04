import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import styles from './CartScreenStyles';

const CartScreen = ({ navigation }) => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage} 
        resizeMode="contain"
      />
      
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Text 
              style={[
                styles.quantityButtonText,
                item.quantity <= 1 && styles.quantityButtonDisabled
              ]}
            >
              −
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemTotal}>
        <Text style={styles.itemTotalText}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Ionicons name="trash" style={styles.trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart"  style={styles.emptyCartIcon} />
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <Text style={styles.emptySubtext}>
        Looks like you haven't added any products to your cart yet
      </Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.continueButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {cartItems.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearCartText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartItemsList}
        ListEmptyComponent={renderEmptyCart}
      />
      
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;