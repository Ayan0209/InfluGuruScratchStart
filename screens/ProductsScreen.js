import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDoc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import Header from '../components/Header';

const ProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState([]);
  const [promotionTypes, setPromotionTypes] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const product = route.params?.product;

  //console.log("This is the product: ", product);

  useEffect(() => {
    if (product) {
      setProductName(product.productName || '');
      setProductCategory(product.productCategory || '');
      setPromotionTypes(product.promotionTypes || []);
    } else {
      setProductName('');
      setProductCategory('');
      setPromotionTypes([]);
    }
  }, []);

  const handlePromotionTypeToggle = (type) => {
    if (promotionTypes.includes(type)) {
      setPromotionTypes(promotionTypes.filter((item) => item !== type));
    } else {
      setPromotionTypes([...promotionTypes, type]);
    }
  };

  const handleUpdateProduct = () => {
    const updatedProduct = {
      id: product ? product.id : generateRandomId(), // Use existing product id or generate a new one
      productName,
      productCategory,
      promotionTypes,
    };
  
    // Update the user's document in the database
    const userDocRef = doc(db, 'users', user.uid);
    getDoc(userDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const userProducts = userData.products || [];
  
          if (product) {
            // Update an existing product in the array
            const updatedProducts = userProducts.map((p) =>
              p.id === product.id ? updatedProduct : p
            );
  
            updateDoc(userDocRef, { products: updatedProducts })
              .then(() => {
                console.log('Product updated!');
              })
              .catch((error) => {
                console.error('Error updating product:', error);
              });
          } else {
            // Add a new product to the array
            const newProducts = [...userProducts, updatedProduct];
  
            updateDoc(userDocRef, { products: newProducts })
              .then(() => {
                console.log('New product added!');
              })
              .catch((error) => {
                console.error('Error adding new product:', error);
              });
          }
        }
      })
      .catch((error) => {
        console.error('Error retrieving user data:', error);
      });
  };
  
  // Helper function to generate a random id
  const generateRandomId = () => {
    return Math.random().toString(36).substring(7);
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: '#fff',
    },
    inputContainer: {
      marginBottom: 16,
      marginTop: 20,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#E39727',
      borderRadius: 4,
      padding: 10,
      marginBottom: 8,
      color: '#000',
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    icon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: '#E39727',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedIcon: {
      backgroundColor: '#E39727',
      borderColor: '#fff',
    },
    iconText: {
      marginTop: 5,
      marginLeft: 4,
      marginBottom: 5,
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    iconTextWithin: {
      color: '#000',
      fontSize: 12,
    },
    button: {
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginBottom: 16,
      backgroundColor: '#E39727',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Header title="Products" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
            style={styles.input}
            placeholder="Product Category"
            value={productCategory.join(', ')} // Join the array elements with a comma and space
            onChangeText={(text) => setProductCategory(text.split(',').map((category) => category.trim()))} // Split the text by comma and trim whitespace from each category
        />
      </View>
      <Text style={styles.iconText}>Types of Promotions</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[
            styles.icon,
            promotionTypes.includes('post') && styles.selectedIcon,
          ]}
          onPress={() => handlePromotionTypeToggle('post')}
        >
          <Ionicons name="paper-plane-outline" size={40} color="#E39727" />
          <Text style={styles.iconTextWithin}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.icon,
            promotionTypes.includes('story') && styles.selectedIcon,
          ]}
          onPress={() => handlePromotionTypeToggle('story')}
        >
          <Ionicons name="play-outline" size={40} color="#E39727" />
          <Text style={styles.iconTextWithin}>Story</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.icon,
            promotionTypes.includes('reels') && styles.selectedIcon,
          ]}
          onPress={() => handlePromotionTypeToggle('reels')}
        >
          <Ionicons name="film-outline" size={40} color="#E39727" />
          <Text style={styles.iconTextWithin}>Reels</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
        <Text style={styles.buttonText}>Update Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductsScreen;
