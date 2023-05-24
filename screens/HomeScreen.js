import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect } from 'react'
import {View, Text, Button, Image, StyleSheet} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-web'
import { getAuth } from 'firebase/auth'
import Images from '../images/Images'


const HomeScreen = () => {
    const navigation = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser;
    //console.log('This is home screen user: ', user);

    useEffect(() => {
        navigation.setOptions({
           headerShown: false,
        });
      }, [navigation]);

    return(
        <SafeAreaView>
            <View className="items-center relative">
                <TouchableOpacity>
                    <Image 
                    className="h-10 w-10 rounded-full" 
                    source={{uri:user.photoURL}} 
                    styles={styles.img}
                    alt="ProfilePic"/>
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Image styles={styles.img} source={Images.logo} alt="logo"/>
                </TouchableOpacity>
                            
            </View>

            <View className="justify-center items-center">
                <Text style={styles.text}>home screen.</Text>
                <Button title="Chat" onPress={() => navigation.navigate("Chat")}/>
                <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()}/>
            </View>
        </SafeAreaView>
        )
}

export default HomeScreen


const styles = StyleSheet.create({
    img: {
        position: 'absolute',
        height: 100,
        width: 200,
    },
    text: {
        fontSize: 50,
    }

});
