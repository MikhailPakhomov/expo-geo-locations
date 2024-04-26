import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react'
import * as Location from 'expo-location';


export default function Coordinates() {
    const [location, setLocation] = useState({
        "coords": {
            "latitude": 0,
            "longitude": 0
        }
    });
    let currentLocation;


    useEffect(() => {
        let interval;
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Please grant location permissions');
                return;
            }

            interval = setInterval(async () => {
                currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);
            }, 500);

        };

        getPermissions();
        return () => {
            clearInterval(interval)
        }
    }, []);

console.log('Широта:' + location.coords.latitude)
console.log('Долгота:' + location.coords.longitude)
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