import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import Header from '../components/Header';

const ModalScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [is18Plus, setIs18Plus] = useState(false);
  const staticImage = require("../images/Logo.png");
  const auth = getAuth();
  const user = auth.currentUser;

  const incompleteForm = !image || !firstName || !lastName || !gender;

  const handleUpdateProfile = () => {
    if (is18Plus) {
      updateDoc(doc(db, 'users', user.uid), {
        displayName: firstName,
        gender: gender,
        photoURL: image,
        timestamp: serverTimestamp(),
      }).then(() => {
        navigation.navigate('Interests');
      }).catch((error) => {
        alert(error.message);
      });
      console.log('Profile updated!');
    } else {
      Alert.alert('Age Restriction', 'You must be 18+ to create an account.');
    }
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
    picker: {
      height: 50,
      backgroundColor: 'rgba(227, 151, 39, 0.75)',
      borderRadius: 4,
      marginBottom: 8,
      color: '#fff',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    checkbox: {
      width: 24,
      height: 24,
      marginRight: 8,
      backgroundColor: 'rgba(244, 244, 244, 0.9)',
    },
    checkboxText: {
      fontSize: 16,
      color: '#000',
    },
    button: {
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginBottom: 16,
      backgroundColor: incompleteForm ? '#556073' : '#E39727',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    interestsButton: {
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: '#E39727',
    },
    interestsButtonText: {
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
        <TextInput
          style={styles.input}
          placeholder="URL of your profile pic"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setIs18Plus(!is18Plus)}
        >
          {is18Plus && <Ionicons name="checkmark-sharp" size={24} color="#E39727" />}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>I am 18+ years old</Text>
      </View>
      <TouchableOpacity
        disabled={incompleteForm}
        style={styles.button}
        onPress={handleUpdateProfile}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.interestsButton}
        onPress={handleChooseInterests}
      >
        <Text style={styles.interestsButtonText}>Choose Interests</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
