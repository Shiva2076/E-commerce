import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import styles from './HomeScreenStyles';
import { API_URL } from '@env';

const HomeScreen = ({ navigation }) => {
  const { cartItems } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const apiUrl = process.env.API_URL || 'https://fakestoreapi.com';

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(['all', ...data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchProducts();
    fetchCategories();
  }, []);
  
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);
  
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', item)}
    >
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => toggleWishlist(item)}
      >
        <Ionicons
          name={isInWishlist(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={isInWishlist(item.id) ? '#ff6b6b' : '#333'}
        />
      </TouchableOpacity>
      
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage} 
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.selectedCategoryButtonText
        ]}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>
    </TouchableOpacity>
  );
  
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
       
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShopEasy</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Wishlist')}
          >
            <Ionicons name="heart" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="cart" size={24} color="#333" />
            {cartItems.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>
      
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => renderCategoryButton(item)}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResults}>
          <Ionicons name="search-outline" size={50} color="#ccc" />
          <Text style={styles.noResultsText}>No products found</Text>
          <Text style={styles.noResultsSubtext}>
            Try adjusting your search or filter criteria
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;