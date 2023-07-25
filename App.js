import AppNavigator from "./navigator/AppNavigator";
import {View,LogBox} from "react-native";
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs([
    'ViewPropTypes will be removed',
    'ColorPropType will be removed',
]);
LogBox.ignoreAllLogs();

export default function App() {
    return (
        <View style={{flex:1}}>
            <AppNavigator/>
            <Toast/>
        </View>);
}

