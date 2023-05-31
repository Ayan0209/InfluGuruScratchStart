
import React, { useEffect, useState } from 'react'
import {View, Text} from 'react-native'
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import { onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase.js';
import ModalScreen from './screens/ModalScreen';
import MatchedScreen from './screens/MatchedScreen';
import MessageScreen from './screens/MessageScreen';
import InterestsScreen from './screens/InterestsScreen';

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
                <Stack.Group>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Chat" component={ChatScreen}/>
                    <Stack.Screen name="Message" component={MessageScreen}/>
                </Stack.Group>
                <Stack.Group screenOptions={{presentation: "modal"}}>
                    <Stack.Screen name="Modal" component={ModalScreen}/>
                    <Stack.Screen name="Interests" component={InterestsScreen}/>
                </Stack.Group>
                <Stack.Group screenOptions={{presentation: "transparentModal"}}>
                    <Stack.Screen name="Match" component={MatchedScreen}/>
                </Stack.Group>                
            </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen}/>
            )
            }
        </Stack.Navigator>
        );
};

export default StackNavigator