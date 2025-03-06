import { Text, View, TextInput, Button } from "react-native";
import routeButton from "../(components)/route-button";
import RouteButton from "../(components)/route-button";
import { Audio } from "expo-av";
import { useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';

export default function SettingsEmergencyInfo () {
  
  // const [AudioPermissionStatus, setAudioPermissionStatus] = useState(false)
  const [LocationPermissionStatus, setLocationPermissionStatus] = useState(false)

  useEffect(()=>{

    // Get audio permission
    // getAudioPermission()

    // get location permission
    getLocationPermission()

  },[])




  // const getAudioPermission = async () => {
  //   const audioPermission = await Audio.getPermissionsAsync()
  //   if (audioPermission.status == 'granted') {
  //     setAudioPermissionStatus(true)
  //   } else {
  //     console.log('audio permission required')
  //   }
  // }


  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status == 'granted') {
      setLocationPermissionStatus(true)
    } else {
      console.log('location permission required')
    }

    
  }



    return (
        <View>
              
        
              <View style={{ padding: 20, gap: 10 ,width: '40%'}}>
                <Text>Emergency info</Text>
                <TextInput placeholder="Emergency Contact Chat ID" style={{borderWidth: 1, width: 'auto'}}/>
                <TextInput placeholder="Emergency Contact Number" style={{borderWidth: 1, width: 'auto'}}/>
              </View>
        
        
              {/* <RouteButton buttonProps={!AudioPermissionStatus && !LocationPermissionStatus?{disabled: true}:{disabled: false}} title={'go homepage'} href={'/enter-franchise/check-franchise'}/>
               */}
              <RouteButton title={'go homepage'} href={'/enter-franchise/check-franchise'}/>


        
        
            </View>

    )
}