import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Foundation } from '@expo/vector-icons';

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: 8,
    },
    backButtonIcon: {
      fontSize: 34,
      color: '#eba134',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    callButton: {
      marginLeft: 8,
    },
    callButtonIcon: {
      fontSize: 20,
      color: '#eba134',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back-outline" size={34} color="#eba134" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={styles.callButton}>
          <Foundation name="telephone" size={20} color="#eba134" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
