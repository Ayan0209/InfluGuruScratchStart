
import React, { useEffect, useState } from 'react'
import {View, Text} from 'react-native'
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import { onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase.js';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const [myUser,setUser] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('Ayan check here', user);
            setUser(user);
            console.log('myUser:', myUser);
        });
    }, []);

    console.log('This is outside func', myUser);

    return(
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            {myUser ? (
            <>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Chat" component={ChatScreen}/>
            </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen}/>
            )
            }
        </Stack.Navigator>
        );
};

export default StackNavigator