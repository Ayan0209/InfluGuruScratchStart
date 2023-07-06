import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import Header from '../components/Header';

const BusinessModalScreen = () => {
  const navigation = useNavigation();
  const [brandName, setBrandName] = useState('');
  const [productName, setProductName] = useState('');
  const [productImgUrl, setProductImgUrl] = useState('');
  const [promotionTypes, setPromotionTypes] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const handlePromotionTypeToggle = (type) => {
    if (promotionTypes.includes(type)) {
      setPromotionTypes(promotionTypes.filter((item) => item !== type));
    } else {
      setPromotionTypes([...promotionTypes, type]);
    }
  };

  const handleUpdateProfile = () => {
    updateDoc(doc(db, 'users', user.uid), {
      displayName: brandName,
      gender: productName,
      photoURL: productImgUrl,
      promotionTypes: promotionTypes,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate('Interests');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleChooseInterests = () => {
    navigation.navigate('Interests');
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
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    button: {
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginBottom: 16,
      backgroundColor: '#E39727',
    },
  });

  return (
    <View style={styles.container}>
      <Header title="Profile Details" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Brand Name"
          value={brandName}
          onChangeText={setBrandName}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Image URL"
          value={productImgUrl}
          onChangeText={setProductImgUrl}
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[
            styles.icon,
            promotionTypes.includes('post') && styles.selectedIcon,
          ]}
          onPress={() => handlePromotionTypeToggle('post')}
        >
          <Ionicons name="paper-plane-outline" size={40} color="#E39727" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.icon,
            promotionTypes.includes('story') && styles.selectedIcon,
          ]}
          onPress={() => handlePromotionTypeToggle('story')}
        >
          <Ionicons name="play-outline" size={40} color="#E39727" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.icon,
            promotionTypes.includes('reels') && styles.selectedIcon,
          ]}
          onPress={() => handlePromotionTypeToggle('reels')}
        >
          <Ionicons name="film-outline" size={40} color="#E39727" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleChooseInterests}
      >
        <Text style={styles.buttonText}>Choose Interests</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BusinessModalScreen;
