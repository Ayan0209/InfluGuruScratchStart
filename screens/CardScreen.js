import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const CardScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params;
  return (
    
    <View style={styles.container}>
        <Header title="" />
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.photoURL }} style={styles.image} />
      </View>
      <ScrollView style={styles.panel}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text style={styles.gender}>{user.gender}</Text>
        {/* Add more user data here */}
      </ScrollView>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    height: '30%',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  panel: {
    flex: 1,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',
    zIndex: 1,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gender: {
    fontSize: 18,
    marginBottom: 16,
  },
  // Add more styles for user data
});
