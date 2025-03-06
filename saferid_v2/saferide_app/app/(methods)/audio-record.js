import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { io } from 'socket.io-client';

export async function StartAudioRecording(recording, setRecording,socket) {
    try {
        // Ensure audio mode is set correctly
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        console.log('Starting audio...');
        const { recording: newRecording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording); // Use the newRecording variable


        
        // // Setup audio data handler
        // newRecording.setOnRecordingStatusUpdate(async (status) => {
        //     if (status.isRecording && status.metering) {
        //     try {
        //         const uri = newRecording.getURI();
        //         if (uri) {
        //         const audioChunk = await fetch(uri).then(res => res.blob());
        //         socket.emit('audio-stream', audioChunk);
        //         }
        //     } catch (error) {
        //         console.error('Error streaming audio:', error);
        //     }
        //     }
        // });



    } catch (err) {
        console.error('Failed to start recording', err);
    }
}

export async function StopAudioRecording(recording,setRecording) {
    if (!recording) return; // Prevent calling stop on undefined/null
    console.log('Stopping recording..');
    setRecording(undefined);
     await recording.stopAndUnloadAsync(); 
     await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    ); 
     const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
}