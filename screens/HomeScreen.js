import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect } from 'react'
import {View, Text, Button, Image, StyleSheet, ImageBackground, Dimensions} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-web'
import { getAuth } from 'firebase/auth'
import Images from '../images/Images'
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Swiper from 'react-native-deck-swiper';

const DUMMY_DATA = [
    {
        brandName: "Tesla",
        productName: "Model S Plaid",
        category: "Car",
        photoURL: "https://ev-database.org/img/auto/Tesla_Model_S_2021/Tesla_Model_S_2021-01.jpg",
        id: 123,
    },
    {
        brandName: "Tesla",
        productName: "Model S Plaid",
        category: "Car",
        photoURL: "https://ev-database.org/img/auto/Tesla_Model_S_2021/Tesla_Model_S_2021-01.jpg",
        id: 456,
    },
    {
        brandName: "Tesla",
        productName: "Model S Plaid",
        category: "Car",
        photoURL: "https://ev-database.org/img/auto/Tesla_Model_S_2021/Tesla_Model_S_2021-01.jpg",
        id: 789,
    }
];

const screenHeight = Dimensions.get('window').height;
const cardHeight = screenHeight * 0.75;

const HomeScreen = () => {
    const navigation = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser;
    const staticImage = require("../images/Logo.png");
    const profile = require("../images/profileIcon.png");
    const chatIcon = require("../images/chat.png");    
    
    //console.log('This is home screen user: ', user);

    useEffect(() => {
        navigation.setOptions({
           headerShown: false,
        });
      }, [navigation]);

    return(
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
                    <MaterialIcons name="account-circle" style={styles.imageLeft} size={50} color="#eba134" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={staticImage} style={styles.imageCenter} alt="logo"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name="chatbubbles-sharp" size={50} style={styles.imageRight} color="#eba134"/>
                </TouchableOpacity>             
            </View>
            <View>
                <Swiper 
                    containerStyle={{backgroundColor: "transparent"}}
                    cards={DUMMY_DATA}
                    renderCard={(card) => (
                        <View key={card.id} style={styles.card}>
                            <Image style={styles.cardImg} source={{uri: card.photoURL }}/>
                        </View>
                    )}
                />
            </View>

        </View>
        )
}

export default HomeScreen


const styles = StyleSheet.create({
    deck: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    imageLeft: {
        marginLeft: 10,
    },
    imageCenter: {
        width: 50,
        height: 50,
    },
    imageRight: {
        width: 65,
        height: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 50,
        margin: 50,
        justifyContent: 'center',
    },
    card: {
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        height: cardHeight,
    },
    cardImg: {
        position: 'absolute',
        borderRadius: 10,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

});
