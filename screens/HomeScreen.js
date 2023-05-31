import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {View, Text, Button, Image, StyleSheet, ImageBackground, Dimensions} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH, db } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-web'
import { getAuth } from 'firebase/auth'
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Swiper from 'react-native-deck-swiper';
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import generateId from '../lib/generateId'

const screenHeight = Dimensions.get('window').height;
const cardHeight = screenHeight * 0.75;

const HomeScreen = () => {
    const navigation = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser;
    const staticImage = require("../images/Logo.png");
    const profile = require("../images/profileIcon.png");
    const chatIcon = require("../images/chat.png");  
    const swipeRef = useRef(null);
    const [profiles, setProfiles] = useState([]);
    
    //console.log('This is home screen user: ', user);

    useEffect(() => 
        onSnapshot(doc(db, "users", user.uid), (snapshot) => {
            console.log("Snapshot:", snapshot)
            if(!snapshot.exists()){
                navigation.navigate("Modal");
            }
        }),
        []
    );

    useEffect(() => {
        let unsub;

        const fetchCards = async () =>{

            const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            );
            
            const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            );

            const passedUserIds = (await passes).length > 0 ? passes : ['test'];
            const swipesUserIds = (await swipes).length > 0 ? swipes : ['test'];

            unsub = onSnapshot(query(collection(db, 'users'), where("id", "not-in", [...passedUserIds, ...swipesUserIds])), snapshot => {
                setProfiles(
                    snapshot.docs.filter(doc => doc.id !== user.uid).map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            });
        };

        fetchCards();
        return unsub;
    }, [db])

    const swipeLeft = async (cardIndex) => {
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        console.log('You have swiped Pass on ${userSwiped.displayName}');

        setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped);
    }

    const swipeRight = async (cardIndex) => {
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];

        const loggedInProfile = await (await getDoc(doc(db, 'users', user.uid))).data();

        getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then(
            (documentSnapshot) => {

                if(documentSnapshot.exists()){
                    //user matched 
                    console.log('You matched', userSwiped.displayName);
                    setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);
                    //CREATE MATCH
                    setDoc(doc(db, "matches", generateId(user.uid,userSwiped.id)),{
                        users: {
                            [user.uid]: loggedInProfile,
                            [userSwiped.id]: userSwiped
                        },
                        usersMatched: [user.uid, userSwiped.id],
                        timestamp: serverTimestamp()
                    })
                    navigation.navigate("Match", {
                        loggedInProfile, userSwiped
                    })
                }
                else{
                    console.log('YOU SWIPED ON ', userSwiped.displayName);
                    setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);
                }

            } 
            
        )

        setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);
    }

    console.log(profiles);

    return(
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
                    <MaterialIcons name="account-circle" style={styles.imageLeft} size={50} color="#eba134" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
                    <Image source={staticImage} style={styles.imageCenter} alt="logo"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name="chatbubbles-sharp" size={50} style={styles.imageRight} color="#eba134"/>
                </TouchableOpacity>             
            </View>
            <View>
                <Swiper 
                    ref={swipeRef}
                    containerStyle={{backgroundColor: "transparent"}}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={(cardIndex) => {
                        console.log('Swipe Pass')
                        swipeLeft(cardIndex)
                    }}
                    onSwipedRight={(cardIndex) => {
                        console.log('Swipe match')
                        swipeRight(cardIndex)
                    }}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "Match",
                            style: {
                                label: {
                                    textAlign: "left",
                                    color: "green",
                                },
                            },
                        }
                    }}
                    renderCard={(card) => card ? (
                        <View key={card.id} style={[styles.card, styles.cardShadow]}>
                            <Image style={styles.cardImg} source={{uri: card.photoURL }}/>
                            <View style={styles.cardTxt}>
                                <View>
                                    <Text style={styles.brandName}>{card.displayName}</Text>
                                    <Text style={styles.productName}>{card.gender}</Text>
                                </View>
                                <Text style={styles.category}>{card.category}</Text>
                            </View>
                        </View>
                        
                    ) : (
                        <View style={[styles.card, styles.cardShadow]}>
                            <Text style={[styles.text, {marginLeft: 500}]}>No more profiles</Text>
                            <Image
                                style={[styles.cardImg, {height: 500, width: 500}]}
                                source={{uri: "https://cdn-icons-png.flaticon.com/512/6009/6009746.png"}} 
                                />
                        </View>
                    )}
                />
            </View>
            <View style={styles.swipeButtons}>
                <TouchableOpacity style={styles.crossButton} onPress={() => swipeRef.current.swipeLeft()}>
                    <Entypo name="cross" size={24} color="red"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.heartButton} onPress={() => swipeRef.current.swipeRight()}>
                    <AntDesign name="heart" size={24} color="green"/>
                </TouchableOpacity>
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
    cardTxt: {
        position: 'absolute',
        borderRadius: 10,
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      brandName: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      productName: {
        fontSize: 16,
      },
      category: {
        fontStyle: 'italic',
      },
      cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,

      },
      swipeButtons: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      crossButton: {
        backgroundColor: 'rgba(196, 69, 47, 0.5)',
        borderRadius: 20,
        padding: 8,
      },
      heartButton: {
        backgroundColor: 'rgba(47, 196, 50, 0.5)',
        borderRadius: 20,
        padding: 8,
      },
});
