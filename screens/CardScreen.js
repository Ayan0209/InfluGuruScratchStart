import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import InstagramLogin from 'react-native-instagram-login';
import {colors} from "../utils/constants";

const CardScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params;
  const userName = user.instaUserName;
  const [profileData, setProfileData] = useState(null);
  //console.log("The card data is: ", user);
  const insRef = useRef();
  const [token, setToken] = useState(null);

  const ACCESS_TOKEN = 'IGQVJYRjB4Q3FiTWZAOTTVMcktrX3RpRDNWbjJDUndoUDBKNXZAvVGtLSjFUN1BFMk13MkhGM2ZAXZAXVSLXYtYUNrOW1Kd3ZA6ZAWE2a0NYU0VqOFJscXZApRThKUzRaX2JoQUhUb3hTVjRicmV2LUx3MkdxTQZDZD';
  //const API_ENDPOINT = 'https://graph.instagram.com/me/media?fields=id,username,media_count,profile_picture_url,caption,media_type,media_url,thumbnail_url,permalink&access_token=' + ACCESS_TOKEN;
  const API_ENDPOINT = 'https://graph.instagram.com/me?fields=username,profile_picture_url,followers_count&access_token=' + ACCESS_TOKEN;
  const onClear = () => {

  };
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(API_ENDPOINT);

          console.log("insta profile data",response.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };

      fetchProfileData();
    }, []);

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

        {/*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>*/}
        {/*  <TouchableOpacity*/}
        {/*      style={styles.btn}*/}
        {/*      onPress={() => insRef.current.show()}>*/}
        {/*    <Text style={{ color: 'red', textAlign: 'center' }}>Login now</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*  <TouchableOpacity*/}
        {/*      style={[styles.btn, { marginTop: 10, backgroundColor: 'green' }]}*/}
        {/*      onPress={onClear}>*/}
        {/*    <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*  <Text style={{ margin: 10 }}>Token: {token}</Text>*/}
        {/*  <InstagramLogin*/}
        {/*      ref={insRef}*/}
        {/*      appId='263648452966840'*/}
        {/*      appSecret='d2740d52bed9f78d175b166083689574'*/}
        {/*      redirectUrl='https://google.com/'*/}
        {/*      scopes={['user_profile', 'user_media']}*/}
        {/*      onLoginSuccess={(token) => console.log("my tocken is",token)}*/}
        {/*      onLoginFailure={(data) => console.log("data error",data)}*/}
        {/*  />*/}
        {/*</View>*/}
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
    backgroundColor: colors.primaryColor,
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
