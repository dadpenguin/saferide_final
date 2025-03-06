'use client'

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function Remote() {
    const [latitude, setLatitude] = useState(11.61419);
    const [longitude, setLongitude] = useState(125.43792);
    const [socketStatus, setSocketStatus] = useState(false);
    const movementSpeed = 0.001; // Adjust movement speed
    const socketRef = useRef(null); // Store socket instance

    useEffect(() => {
        socketRef.current = io("ws://localhost:4000");

        socketRef.current.on("connect", () => {
            console.log("Connected:", socketRef.current.connected);
            setSocketStatus(true);
        });

        socketRef.current.on("connect_error", (err) => {
            console.log("Connection error:", err.message);
            setSocketStatus(false);
        });


        socketRef.current.emit('authorize', true)

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "ArrowUp") setLatitude((prevLat) => prevLat + movementSpeed);
            if (event.key === "ArrowDown") setLatitude((prevLat) => prevLat - movementSpeed);
            if (event.key === "ArrowLeft") setLongitude((prevLon) => prevLon - movementSpeed);
            if (event.key === "ArrowRight") setLongitude((prevLon) => prevLon + movementSpeed);
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.emit("location", { latitude, longitude });
            console.log("Sent:", { latitude, longitude });
        }
    }, [longitude, latitude]);

    return (
        <>
            <p>{socketStatus ? `🟢` : `🔴`}</p>
            <p>lat: {latitude}</p>
            <p>long: {longitude}</p>
        </>
    );
}
