import { useFocusEffect } from "expo-router";
import { Button, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { Audio } from 'expo-av';
import { StartAudioRecording, StopAudioRecording } from "../(methods)/audio-record";
import { StartLocationRecording, StopLocation } from "../(methods)/location-record";
import * as Location from 'expo-location'


import RouteButton from '../(components)/route-button'

// IMPORTANT: use tmole to test localhost socket.io servers and use https. no need to apply port because it is applied in the new host link 


export default function OnBoardEmergency() {
    const [recording, setRecording] = useState(null);
    const [location, setLocation] = useState(null);
    const [LocationSubscription, SetLocationSubscription] = useState(null)

    // // Only start recording if not already started
    // StartLocationRecording(setLocation, SetLocationSubscription, LocationSubscription);
    
    
    const GetLocation = async () => {
        const locationObj = await Location.getCurrentPositionAsync({
            timeInterval: 500
        })
        console.log(locationObj)
    }


    // GetLocation()


    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log("emergency");
            


            



            
    //         // Connect to WebSocket (change socket tmole https link if in dev mode)
    //         const socket = io("https://6an0m8-ip-150-107-175-111.tunnelmole.net");            

    //         socket.on("connect", () => {
    //             console.log("Connected:", socket.connected);
    //             ShareAudioRecording()

    //         });

    //         socket.on("connect_error", (err) => {
    //             console.log("Connection error:", err.message);
    //         });



    //         const ShareAudioRecording = async () => {
    //             await StartAudioRecording(recording, setRecording, socket);
    //         }



    //         // cleanup
    //         return () => {

    //             // stop recording
    //             StopAudioRecording(recording,setRecording)

    //             // disconnect socket
    //             socket.disconnect();

    //             console.log(LocationSubscription)
    //             // Stop location
    //             if (LocationSubscription) {
    //                 StopLocation(LocationSubscription);
    //             }

    //             console.log("disconnected");
    //         };
    //     }, [])
    // );



    


    // return <>{JSON.stringify(data)}</>
    return <>
    
        <RouteButton title={'end'} href={'/enter-franchise/check-franchise'} 
        // confirmation={true} confirmatioNCallback={()=>{StopAudioRecording(recording,setRecording)}}
        />

    <Text>

    Data sent 

    </Text>

    
    </>
}