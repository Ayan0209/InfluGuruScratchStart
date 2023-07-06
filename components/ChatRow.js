import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const ChatRow = ({ matchDetails }) => {

  console.log("You have reached the chatrow screen.")

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(() => onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'),
    orderBy('timestamp', 'desc')
    ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
    )
  , [matchDetails, db])

  //console.log('The matched user is:', matchedUserInfo.displayName)

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 6,
      marginHorizontal: 12,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    userInfoContainer: {
      flex: 1,
    },
    displayName: {
      fontSize: 16,
      fontWeight: '600',
    },
    sayHiText: {
      fontSize: 12,
      color: '#888888',
    },
  });
  
  return (
    <SafeAreaView>
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Message", {
        matchDetails,
    })}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.displayName}>
            {matchedUserInfo?.displayName}
        </Text>
        <Text style={styles.sayHiText}>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatRow;
