import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


const Loader = ({isLoading,loadingText}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={isLoading}
                    //Text with the Spinner
                    textContent={loadingText}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />
            </View>
        </SafeAreaView>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});
