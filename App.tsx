import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  return (
    <>
      
      
       <MainNavigator/>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    
  },
});
