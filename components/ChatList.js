import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Header from '../components/Header';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import ChatRow from './ChatRow';

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'matches'), where('usersMatched', 'array-contains', user.uid)),
      (snapshot) => {
        const matchesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatches(matchesData);
        setLoading(false); // Set loading state to false after data retrieval
      }
    );

    return () => unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
  }, [user]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('This is matches', matches);

  return matches.length > 0 ? (
    <FlatList
      style={{ flex: 1 }}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <Text>No Matches at the moment!</Text>
    </View>
  );
};

export default ChatList;
