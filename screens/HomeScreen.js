import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View, Text, Button} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../firebase'


const HomeScreen = () => {
    const navigation = useNavigation();
    return(
        <View>
            <Text>home screen.</Text>
            <Button title="Chat" onPress={() => navigation.navigate("Chat")}/>
            <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()}/>
        </View>
        )
}

export default HomeScreen