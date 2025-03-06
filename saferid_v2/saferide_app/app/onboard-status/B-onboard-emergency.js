import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';
import RouteButton from '../(components)/route-button';

// make sure to set up minimum distance to 0 and time interval to 1

export default function LocationTracker() {
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [subscription, setSubscription] = React.useState(null);
  const [location, setLocation] = useState(null)
  useEffect(() => {
    (async () => {
      // Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

      // Set up location watcher
      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every second
          distanceInterval: 0, 
        },
        (Newlocation) => {
          console.log('New location:', {
            latitude: Newlocation.coords.latitude,
            longitude: Newlocation.coords.longitude,
            accuracy: Newlocation.coords.accuracy,
            timestamp: new Date(Newlocation.timestamp).toISOString(),
          });

          setLocation(Newlocation)

          
        }
      );

      setSubscription(sub);
      console.log('Started location tracking...');
    })();

    // Cleanup
    return () => {
      if (subscription) {
        subscription.remove();
        setSubscription(null)
        console.log('Stopped location tracking');
        console.log(subscription)

      }
    };
  }, []);

  const removeLocation = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null)
      console.log('Stopped location tracking');
      console.log(subscription)
    }
  }

  return (
    <View >
      <Text>
        {location && subscription? JSON.stringify(location.coords) : 'checking location'}
      </Text>

      <Text>
        {errorMsg ? errorMsg : ''}
      </Text>

      <Button onPress={()=>removeLocation()} title='end'/>
    </View>
  );
}

// ... keep the same styles as previous example

























// import { useState, useCallback } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { Audio } from 'expo-av';
// import { useFocusEffect, useRouter } from 'expo-router';

// export default function App() {
//   const [recording, setRecording] = useState(null);
//   const router = useRouter();

//   useFocusEffect(
//     useCallback(() => {
//       startRecording();

//       return () => {
//         stopRecording();
//       };
//     }, [])
//   );

//   async function startRecording() {
//     try {
      

//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       console.log('Starting recording...');
//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );

//       setRecording(recording);
//       console.log('Recording started');
//     } catch (err) {
//       console.error('Failed to start recording:', err);
//     }
//   }

//   async function stopRecording() {
//     if (!recording) return; // Prevent calling stop on undefined/null

//     console.log('Stopping recording...');
//     await recording.stopAndUnloadAsync();

//     const uri = recording.getURI();
//     console.log('Recording saved at:', uri);

//     setRecording(null); // Reset after stopping

//     await Audio.setAudioModeAsync({
//       allowsRecordingIOS: false,
//     });
//   }

//   return (
//     <View style={styles.container}>
//       <Button
//         title="Exit"
//         onPress={() => {
//           router.replace('/get-started/personal-info');
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 10,
//   },
// });
