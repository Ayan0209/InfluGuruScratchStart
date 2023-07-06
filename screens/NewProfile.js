import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';

const NewProfile = () => {
  const [selectedType, setSelectedType] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    // Update the user's "type" attribute in Firestore with the selectedType
    // Perform any necessary actions upon pressing continue
    const type = selectedType;
  
    if (user) {
      setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        type: type,
        createdAt: serverTimestamp(),
      })
        .then(() => {
            if(type==="brand"){
                navigation.navigate('BrandModal');
            }
            else{
                navigation.navigate('Modal');
            }
          
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Select your Profile'} />
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={[
              styles.icon,
              selectedType === 'brand' && styles.selectedIcon,
            ]}
            onPress={() => handleTypeSelection('brand')}
          >
            <Ionicons
              name="business-outline"
              size={48}
              color={selectedType === 'brand' ? '#fff' : '#E39727'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.icon,
              selectedType === 'influencer' && styles.selectedIcon,
            ]}
            onPress={() => handleTypeSelection('influencer')}
          >
            <Ionicons
              name="person-outline"
              size={48}
              color={selectedType === 'influencer' ? '#fff' : '#E39727'}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={!selectedType}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  icon: {
    borderWidth: 1,
    borderColor: '#E39727',
    borderRadius: 50,
    padding: 16,
    margin: 10,
  },
  selectedIcon: {
    backgroundColor: '#E39727',
  },
  continueButton: {
    backgroundColor: '#E39727',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewProfile;
