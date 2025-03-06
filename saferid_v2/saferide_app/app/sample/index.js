import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import * as Location from 'expo-location';
import RouteButton from '../(components)/route-button';

export default function LocationTracker() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {

    const startTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

      try {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 0,
          },
          (newLocation) => {
            console.log('New location:', {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              accuracy: newLocation.coords.accuracy,
              timestamp: new Date(newLocation.timestamp).toISOString(),
            });
            setLocation(newLocation);
          }
        );
        setSubscription(locationSubscription); // Store the subscription
        console.log('Started location tracking...', locationSubscription);
      } catch (error) {
        console.error('Error starting location tracking:', error);
      }
    };

    startTracking();

    // return () => {
    //   if (locationSubscription) {
    //     locationSubscription.remove();
    //     console.log('Stopped location tracking');
    //   }
    // };


  }, []); // ✅ Remove `subscription` from dependencies

  const removeLocation = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
      console.log('Stopped location tracking');
    }
  };

  return (
    <View>
      <Text>
        {location && subscription
          ? JSON.stringify(location.coords)
          : 'Checking location...'}
      </Text>

      <Text>
        {subscription? 'true': 'false'}
      </Text>

      {errorMsg ? <Text>{errorMsg}</Text> : null}

      {/* <Button onPress={removeLocation} title='End' /> */}
      <RouteButton title={'end'} href={'/enter-franchise/check-franchise'} BtnCallback={removeLocation} />
    </View>
  );
}
