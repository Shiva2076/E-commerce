import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ProductDetailStyles';

const ProductDetailScreen = ({ route, navigation }) => {
  const product = route.params;
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [quantity, setQuantity] = useState(1);
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity
    };
    
    addToCart(productToAdd);
    
    alert(`${product.title} added to cart!`);
  };
  
  const adjustQuantity = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.productImage} 
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={toggleWishlist}
          >
            <Ionicons
              name={isInWishlist(product.id) ? 'heart' : 'heart-outline'}
              size={24}
              color={isInWishlist(product.id) ? '#ff6b6b' : '#333'}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.rating}>
                {product.rating.rate} ({product.rating.count} reviews)
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => adjustQuantity(-1)}
            disabled={quantity <= 1}
          >
            <Text 
              style={[
                styles.quantityButtonText,
                quantity <= 1 && styles.quantityButtonDisabled
              ]}
            >
              −
            </Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => adjustQuantity(1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        ><Ionicons name="cart" size={24} style={styles.cartIcon} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;