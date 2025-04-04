// src/screens/WishlistScreen.js
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import styles from './WishlistScreenStyles';

const WishlistScreen = ({ navigation }) => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (product, removeAfterAdd = false) => {
    const productToAdd = {
      ...product,
      quantity: 1
    };
    addToCart(productToAdd);
    
    if (removeAfterAdd) {
      removeFromWishlist(product.id);
    }
    alert(`${product.title} added to cart!`);
  };
  
  const renderWishlistItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', item)}
        style={styles.productContainer}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage} 
          resizeMode="contain"
        />
        
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          
          <View style={styles.ratingContainer}>
             <Ionicons name="star" style={styles.starIcon}/>
            <Text style={styles.rating}>
              {item.rating.rate} ({item.rating.count})
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAddToCart(item)}
        >
          <Ionicons name="cart" style={styles.cartIcon} />
          <Text style={styles.actionButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="trash" style={styles.trashIcon} />
          <Text style={[styles.actionButtonText, styles.removeButtonText]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart" size={24} style={styles.emptyHeartIcon} />
      <Text style={styles.emptyText}>Your wishlist is empty</Text>
      <Text style={styles.emptySubtext}>
        Save items you like by tapping the heart icon on products
      </Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.continueButtonText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {wishlistItems.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Wishlist</Text>
          <TouchableOpacity 
            onPress={() => {
              wishlistItems.forEach(item => handleAddToCart(item));
            }}
          >
            <Text style={styles.addAllText}>Add All to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <FlatList
        data={wishlistItems}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.wishlistItemsList}
        ListEmptyComponent={renderEmptyWishlist}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;