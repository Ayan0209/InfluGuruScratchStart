import React, { useEffect, useLayoutEffect, useState } from 'react'
import {View, TextInput, StyleSheet, Button, Text, ImageBackground} from 'react-native'
import useAuth from '../hooks/useAuth'
import { FIREBASE_AUTH } from '../firebase';
import { ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {

    
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your email!');
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <View style={styles.container}>
            <ImageBackground 
                source={{uri: "https://tinder.com/static/tinder.png"}}
                style = {styles.background}
            >
                <View style={styles.buttons}>
                <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

                { loading ? <ActivityIndicator size="large" color="#0000ff" />
                    : <>
                        <Button title="Login" onPress={signIn} />
                        <Button title="Create an Account" onPress={signUp} />
                    </>
                }
                </View>
            </ImageBackground>
            
        </View>
        )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    }
});