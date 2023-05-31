import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import Header from '../components/Header'
import ChatList from '../components/ChatList'

const ChatScreen = () => {
    
    return(
        <SafeAreaView>
            <Header title="Chat" />
            <ChatList />
        </SafeAreaView>
        )
}

export default ChatScreen

