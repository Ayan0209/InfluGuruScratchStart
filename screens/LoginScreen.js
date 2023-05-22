import React, { useState } from 'react'
import {View, TextInput, StyleSheet, Button} from 'react-native'
import useAuth from '../hooks/useAuth'
import { FIREBASE_AUTH } from '../firebase';
import { ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    //console.log(user);
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
            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

            { loading ? <ActivityIndicator size="large" color="#0000ff" />
                : <>
                    <Button title="Login" onPress={signIn} />
                    <Button title="Create an Account" onPress={signUp} />
                </>
            }

        </View>
        )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal:20,
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
    }
});