import React from 'react';
import {View,Text, ImageBackground, StyleSheet} from "react-native";
import {colors} from "../utils/constants";

const InstaProfile = () => {
    return (
        <View>
            <ImageBackground style={styles.cardImg} source={require('../images/instaUser.png')}/>
            <View>
                <Text style={styles.userName}>Jhon Due, 23</Text>
            </View>
            <View style={{marginTop:20,
                flexDirection:'row',
                justifyContent:'space-between',
                paddingHorizontal:10,
                marginHorizontal:15,
            }}>
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.userD}>Followers</Text>
                    <Text style={styles.userValue}>2 M</Text>
                </View>
                <View style={{justifyContent:'center',alignItems: 'center'}}>
                    <Text style={styles.userD}>Posts</Text>
                    <Text style={styles.userValue}>26</Text>
                </View>
                <View style={{justifyContent:'center',alignItems: 'center'}}>
                    <Text style={styles.userD}>Platforms</Text>
                    <Text style={styles.userValue}>fb google</Text>

                </View>
            </View>
        </View>
    );
};


export default InstaProfile;
const styles = StyleSheet.create({
    cardImg:{
        alignItems: 'center',
        borderRadius: 10,
        height: 300,
        width: '100%',
        resizeMode: "contain",
        marginBottom:20,
    },
    userName:{
        marginLeft:20,
        fontSize:20,
        color:colors.black,
        fontWeight:'bold'
    } ,
    userD:{
        fontSize:16,
        color:colors.black,
        fontWeight:'bold',
        marginBottom:10,
    },
    userValue:{
        fontSize:16,
        color:colors.black,
        fontWeight:"400",
    }


})
