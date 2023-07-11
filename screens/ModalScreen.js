import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import Header from '../components/Header';

const ModalScreen = () => {
  const navigation = useNavigation();
  const [photoURL, setImage] = useState('')
  const [displayName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setImage(userData.photoURL)
          setFullName(userData.displayName || '');
          setAge(userData.age || '');
          setGender(userData.gender || '');
          setEmail(userData.email || '');
          setCity(userData.city || '');
          setBio(userData.bio || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChooseImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to grant permission to access the media library.');
      return;
    }
  
    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (!imageResult.cancelled) {
      setImage(imageResult.uri);
    }
  };

  const handleUpdateProfile = () => {
    updateDoc(doc(db, 'users', user.uid), {
      photoURL,
      displayName,
      age,
      gender,
      email,
      city,
      bio,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log('Profile updated!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    inputContainer: {
      marginBottom: 16,
      marginTop: 20,
      paddingHorizontal: 16,
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
    picker: {
      height: 50,
      backgroundColor: 'rgba(227, 151, 39, 0.75)',
      borderRadius: 4,
      marginBottom: 8,
      color: '#fff',
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
    circularImageContainer: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: 'rgba(227, 151, 39, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    circularImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      resizeMode: 'cover',
    },
    cameraIconContainer: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(227, 151, 39, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraIcon: {
      fontSize: 24,
      color: '#fff',
    },
    bioInput: {
      height: 150,
      borderWidth: 1,
      borderColor: '#E39727',
      borderRadius: 4,
      padding: 10,
      marginBottom: 8,
      color: '#000',
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150} // Adjust the offset as needed
    >
      <Header title="Profile Details" />
      <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.circularImageContainer} onPress={handleChooseImage}>
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.circularImage} />
          ) : (
            <Image source={require('../images/profileIcon.png')} style={styles.circularImage} />
          )}
          <View style={styles.cameraIconContainer}>
            <Ionicons name="camera" style={styles.cameraIcon} />
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={displayName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={setGender}
        >
          <Picker.Item label="Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.bioInput}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          maxLength={200}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ModalScreen;
