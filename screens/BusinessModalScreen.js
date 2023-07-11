import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';

const BusinessModalScreen = () => {
  const navigation = useNavigation();
  const [photoURL, setLogoImage] = useState('');
  const [displayName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const businessData = docSnap.data();
          setLogoImage(businessData.photoURL || '');
          setBrandName(businessData.displayName || '');
          setCategory(businessData.category || '');
          setCity(businessData.city || '');
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchBusinessData();
  }, []);

  const handleChooseLogoImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to grant permission to access the media library.');
      return;
    }
  
    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (!imageResult.cancelled) {
      setLogoImage(imageResult.uri);
    }
  };

  const handleUpdateProfile = () => {
    updateDoc(doc(db, 'users', user.uid), {
      photoURL,
      displayName,
      category,
      city,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log('Business profile updated!');
      })
      .catch((error) => {
        console.error('Error updating business profile:', error);
      });
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
    logoContainer: {
      marginBottom: 16,
      alignItems: 'center',
    },
    logoImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      resizeMode: 'cover',
    },
    logoButton: {
      marginTop: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      backgroundColor: '#E39727',
    },
    logoButtonText: {
      color: '#fff',
      fontSize: 14,
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
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Header title="Profile Details" />
      <View style={styles.inputContainer}>
        <View style={styles.logoContainer}>
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.logoImage} />
          ) : (
            <Image source={require('../images/profileIcon.png')} style={styles.logoImage} />
          )}
          <TouchableOpacity style={styles.logoButton} onPress={handleChooseLogoImage}>
            <Text style={styles.logoButtonText}>Choose Logo</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Brand Name"
          value={displayName}
          onChangeText={setBrandName}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BusinessModalScreen;
