import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  const handleStartChatting = () => {
    // Logic for navigating to the ChatScreen
    navigation.goBack();
    navigation.navigate("Chat");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eba134',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 16,
    },
    profilePicture: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 16,
    },
    fullName: {
      fontSize: 18,
      color: '#fff',
    },
    button: {
      backgroundColor: '#fff',
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginTop: 32,
    },
    buttonText: {
      color: '#eba134',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You found a Job</Text>
      <Image source={{ uri: userSwiped.photoURL }} style={styles.profilePicture} />
      <Text style={styles.fullName}>{userSwiped.fullName}</Text>
      <TouchableOpacity style={styles.button} onPress={handleStartChatting}>
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
