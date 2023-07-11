import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

const Socials = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [username, setUsername] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleSubmit = () => {
    updateDoc(doc(db, 'users', user.uid), {
      instaUserName: username,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Error updating username:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Header title="Socials" />
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Ionicons name="logo-instagram" size={32} color="black" style={styles.icon} />
          <Text style={styles.heading}>Instagram Username</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor="rgba(227, 151, 39, 0.7)"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    marginRight: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(227, 151, 39, 0.7)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    color: 'black',
  },
  button: {
    backgroundColor: 'rgba(227, 151, 39, 0.7)',
    borderRadius: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Socials;
