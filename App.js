import { StyleSheet, Text, View } from 'react-native';
import Coordinates from './components/Coordinates';
import MapView from 'react-native-maps';
import { useState, useEffect } from 'react'
import * as Location from 'expo-location';


export default function App() {
  const [location, setLocation] = useState({
    "coords": {
      "latitude": null,
      "longitude": null
    }
  });
  let currentLocation;
  let isShowUserLocation = true;

  useEffect(() => {
    let interval;
    const getPermissions = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        getPermissions();
        return;
      }
      interval = setInterval(async () => {
        currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      }, 1000);
    };
    getPermissions();

    return () => {
      clearInterval(interval)
    }
  }, []);


  console.log('Широта:' + JSON.stringify(location))
  console.log(isShowUserLocation)
  // console.log('Долгота:' + location.coords.longitude)
  return (
    <>
      {(location.coords.latitude === null) ?
        <View style={styles.container}>
          <Text style={styles.preloader}>Запуск...</Text>
        </View>
        :
        <View style={styles.container}>
          <Coordinates
            latitude={location.coords.latitude}
            longitude={location.coords.longitude}
          />
          <MapView style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            showsUserLocation={isShowUserLocation}
            showsMyLocationButton={true}
            userLocationUpdateInterval={1000}
          />
        </View>

      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '85%',
  },
  preloader: {
    fontSize: 32,
  }

});
