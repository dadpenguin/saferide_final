import React, { useState,useRef, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import RouteButton from "../(components)/route-button";
import { io } from "socket.io-client";
import { tunnel_url } from "../../constants";


const socketURL = tunnel_url



export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationInterval, setLocationInterval] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [socketStatus, setSocketStatus] = useState(null);
  const socketObj = useRef(null)

  useEffect(() => {
    const socket = io(socketURL);

    socket.on("connect", () => {
      console.log("Connected:", socket.connected);
      setSocketStatus(true);

      socketObj.current = socket

      requestLocationPermission();
      startWatchingLocation();
    });

    socket.on("connect_error", (err) => {
      console.log("Connection error:", err.message);
      setSocketStatus(false);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
      stopWatchingLocation();
    };
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      setPermissionStatus(false);
      return;
    } else {
      setPermissionStatus(true);
    }
  };

  const startWatchingLocation = async () => {
    stopWatchingLocation(); // Ensure previous interval is cleared

    const interval = setInterval(async () => {
      try {
        let newLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(newLocation.coords);

        socketObj.current.emit("location", {
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude,
        });
        
        console.log(socketObj.current.connected);
        
        
        console.log(newLocation.coords);

      } catch (error) {
        setErrorMsg(error.message);
      }
    }, 5000);

    setLocationInterval(interval);
  };

  const stopWatchingLocation = () => {
    if (locationInterval) {
      clearInterval(locationInterval);
      setLocationInterval(null);
      console.log("Location interval stopped");
    }
  };

  return (
    <View>
      <Text>
        {locationInterval
          ? `Lat: ${location?.latitude}, Lon: ${location?.longitude}`
          : "Loading..."}
      </Text>
      <Text>{`Permission: ${permissionStatus}`}</Text>
      <Text>{`SocketStatus: ${socketStatus}`}</Text>
      <Text>{`${socketURL}`}</Text>

      <RouteButton
        title={"end"}
        href={"/enter-franchise/check-franchise"}
        BtnCallback={stopWatchingLocation}
      />
    </View>
  );
}
