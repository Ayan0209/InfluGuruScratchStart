import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const CardScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params;
  const userName = user.instaUserName;

  //console.log("The card data is: ", user);

  const openInstagramProfile = async () => {
    const profileUrl = `https://www.instagram.com/${userName}/`;

    const isInstagramInstalled = await Linking.canOpenURL('instagram://');

    if (isInstagramInstalled) {
      await Linking.openURL(`instagram://user?username=${userName}`);
    } else {
      await Linking.openURL(profileUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="" />
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.photoURL }} style={styles.image} />
      </View>
      <ScrollView style={styles.panel}>
        {user.type === 'influencer' ? (
          <>
            <Text style={styles.displayName}>{user.displayName}</Text>
            <View style={styles.row}>
              <Text style={styles.age}>{user.age},</Text>
              <Text style={styles.gender}>{user.productName}</Text>
            </View>
            <Text style={styles.title}>Bio</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <Text style={styles.title}>Interests</Text>
            <View style={styles.categoriesContainer}>
              {user.category.map((category, index) => (
                <View key={index} style={styles.category}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.title}>Location</Text>
            <Text style={styles.location}>{user.city}</Text>
            <Text style={styles.title}>Contacts and Socials</Text>
            <Text style={styles.email}>{user.email}</Text>
            <TouchableOpacity onPress={openInstagramProfile}>
              <Ionicons name="logo-instagram" size={45} color="rgba(227, 151, 39, 0.7)" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.displayName}>{user.displayName}</Text>
            <Text style={styles.productName}>{user.productName}</Text>
            <Text style={styles.title}>Product Category</Text>
            {user.productCategory.map((cat, index) => (
                <View key={index} style={styles.category}>
                  <Text style={styles.categoryText}>{cat}</Text>
                </View>
              ))}
            <Text style={styles.title}>Promotion Type</Text>
            <View style={styles.categoriesContainer}>
            {user.promotionTypes.map((type, index) => (
                <View key={index} style={styles.category}>
                  <Text style={styles.categoryText}>{type}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.title}>Location</Text>
            <Text style={styles.location}>{user.city}</Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'relative',
    height: '30%',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  panel: {
    flex: 1,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',
    zIndex: 1,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  age: {
    fontSize: 18,
    marginRight: 8,
  },
  gender: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
  },
  interestsContainer: {
    marginTop: 24,
  },
  interestsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    backgroundColor: 'rgba(227, 151, 39, 0.7)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: 'white',
  },
  location: {
    fontSize: 16,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
  },
});
