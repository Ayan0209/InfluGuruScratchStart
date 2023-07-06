
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  
  return (
    <NavigationContainer>
      
        <StackNavigator/>
      
    </NavigationContainer>
  );
}

