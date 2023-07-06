import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { FIREBASE_AUTH } from '../firebase';
import { AntDesign } from '@expo/vector-icons';

const staticImage = require('../images/Logo.png');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setLogoVisible(false);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setLogoVisible(true);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      //console.log(response);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Check your email!');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        
          {logoVisible && (
            <View style={styles.logoContainer}>
              <Image source={staticImage} style={styles.logoImg} />
            </View>
          )}
          <View style={styles.bottomContainer}>
            <Text style={styles.infoText}>Login/Sign up to continue</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#E39727"
              />
              <TextInput
                value={password}
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#E39727"
              />
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Button title="Login" onPress={signIn} color="#E39727" />
                <View style={styles.buttonGap} />
                <Button title="Create an Account" onPress={signUp} color="#E39727" />
              </>
            )}
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="google" size={24} color="#E39727" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="twitter" size={24} color="#E39727" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="facebook-square" size={24} color="#E39727" />
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
};

export default LoginScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImg: {
    height: 300,
    width: 300,
    borderRadius: 25, // Adjust the value as needed for the desired roundness
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  bottomContainer: {
    flex: 2,
    paddingHorizontal: 32,
    paddingBottom: windowHeight * 0.05,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    fontFamily: 'Rubik',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    marginVertical: 8,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  buttonGap: {
    marginBottom: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  icon: {
    marginHorizontal: 8,
  },
});
