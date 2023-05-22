import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View, Text, Button} from 'react-native'

const HomeScreen = () => {
    const navigation = useNavigation();
    return(
        <View>
            <Text>home screen.</Text>
            <Button title="Chat" onPress={() => navigation.navigate("Chat")}/>
        </View>
        )
}

export default HomeScreen