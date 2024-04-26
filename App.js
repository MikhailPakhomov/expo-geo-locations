import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from 'react'
import * as Location from 'expo-location';


export default function App() {

const [location, setLocation] = useState();
let currentLocation
useEffect(() => {
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Please grant location permissions');
      return;
    }

     currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    console.log('Location: ');
    console.log(currentLocation);
  };

  getPermissions();
}, []);

  return (
    <View style={styles.container}>
      <Text>Широта:{location.coords.latitude}</Text>
      <Text>Долгота:{location.coords.longitude}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
