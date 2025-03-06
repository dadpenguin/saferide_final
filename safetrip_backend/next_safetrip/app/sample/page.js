'use client'

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap,  } from 'react-leaflet';

import { io } from "socket.io-client";


import 'leaflet/dist/leaflet.css';

const franchiseNumber = 1214
const driverFirstName = 'FERDINAND'
const middleInitial = 'CONERAS'
const driverSurname = 'CABO'
const driverAddress = 'MAYPANGDAN, BORONGAN, EASTERN SAMAR'
const contactNumber = 9659460600
const driversLicense = 'H04-06000345'
const driverActive = "true"

const emergencyStartTime = '11:52 PM'

const firstName = 'first name'
const lastName = 'last name'
const birthdate = 'birthdate'
const address = 'Address'
const phoneNumber = '00000000'



const socketURL = "localhost:4000"

const SocketClient = ({setLatitude, setLongitude, setSocketStatus})  => {


    
    useEffect(()=>{
        const socket = io(socketURL)
        
            
        socket.on("connect", () => {
            console.log("Connected:", socket.connected); // true
            setSocketStatus(true)
            
        
        })

        socket.on('location', (location) => {
            console.log('server sent:', location)
            setLatitude(location.latitude)
            setLongitude(location.longitude)
          })

        
        socket.on("connect_error", (err) => {
            console.log("Connection error:", err.message);
            setSocketStatus(false)
        });

    }, [])






}





export default function GPSJoystick() {
    const [latitude, setLatitude] = useState(11.61419);
    const [longitude, setLongitude] = useState(125.43792);
    const [locationText, setLocationText] = useState(null)
    const [socketStatus, setSocketStatus] = useState(false)



    


    const movementSpeed = 0.001; // Adjust movement speed


    const blueIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    useEffect(() => {

        
        const handleKeyPress = (event) => {
        if (event.key === "ArrowUp") setLatitude((prevLat) => prevLat + movementSpeed);
        if (event.key === "ArrowDown") setLatitude((prevLat) => prevLat - movementSpeed);
        if (event.key === "ArrowLeft") setLongitude((prevLon) => prevLon - movementSpeed);
        if (event.key === "ArrowRight") setLongitude((prevLon) => prevLon + movementSpeed);
        };

        window.addEventListener("keydown", handleKeyPress);


    return () => {
        window.removeEventListener("keydown", handleKeyPress);}
  }, []);




  useEffect(()=>{


    async function getAddress() {


        // Nominatim API URL for reverse geocoding
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;


        try {
        // Make the fetch request
        const response = await fetch(url);
        
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Convert the response to JSON
        const data = await response.json();
        
        // Check if the address is available
        if (data.address) {
            console.log("Address:", data.address);
            // console.log(latitude,longitude)
            setLocationText(data.address)
        } else {
            console.log("Address not found");
            setLocationText(null)

        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    }

    
    console.log('rendered')    

    const interval = setInterval(() => {
        getAddress()
        clearInterval(interval)
    }, 2000); // 2000ms = 2 seconds


    // setTimeout(()=>{
    //     getAddress() 
    // },2000)




    return () => {

        if (interval) {
            clearInterval(interval)
        }

    }

    
  }, [longitude,latitude])



  return (<>
    
    



    <div style={{height: '100vh'}}>
        
        <div style={{height: "50%", overflow: 'scroll', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '100px'}}>
            
            {/* Personal */}
            <div >
                <h1> {firstName} {lastName} {socketStatus?`🟢`:`🔴`}</h1>
                <p ><strong>Birthdate: </strong>{birthdate}</p>
                <p ><strong>Address: </strong>{address}</p>
                <p ><strong>Phone Number: </strong>{phoneNumber}</p>
                <p><strong>Emergency time: </strong>{emergencyStartTime}</p>

                
            </div>


            {/* Location */}
            <div >
                <h1> Location </h1>
                <p >Latitude: {latitude? latitude.toFixed(6): 'no lat'}</p>
                <p >Longitude: {longitude? longitude.toFixed(6): 'no long'}</p>
                
                    {locationText && Object.keys(locationText).map((key) => (
                        <p key={key}><strong>{key}:</strong> {locationText[key]}</p>
                    ))}
            </div>

            {/* Driver Details */}
            {/* Personal */}
            <div >
                <h1> Driver </h1>
                <p ><strong>Franchise Number: </strong>{franchiseNumber}</p>
                <p ><strong>First name: </strong>{driverFirstName}</p>
                <p ><strong>Middle Initial: </strong>{middleInitial}</p>
                <p ><strong>Last name: </strong>{driverSurname}</p>
                <p ><strong>address: </strong>{driverAddress}</p>
                <p ><strong>contact number: </strong>{contactNumber}</p>
                <p ><strong>drivers license: </strong>{driversLicense}</p>
                <p ><strong>active: </strong>{driverActive}</p>


                
            </div>

        </div>

        
        <div style={{backgroundColor: 'blue', height: '50%'}} >
            <MapContainer center={[latitude,longitude]} zoom={100} style={{ width: '100%', height: '100%'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                

                    <PanToLocation latitude={latitude} longitude={longitude}/>
                <Marker position={[latitude,longitude]} icon={blueIcon}> 
                    
                
                    <Popup>
                    {[latitude,longitude]}
                    </Popup>
                </Marker>


            </MapContainer>

            <SocketClient setLatitude={setLatitude} setLongitude={setLongitude} setSocketStatus={setSocketStatus}/>
        </div>

    </div>



  </>




  );
}


// Component to smoothly pan the map
function PanToLocation({ latitude, longitude }) {
    const map = useMap();
    useEffect(() => {
      map.panTo([latitude, longitude], { animate: true, duration: 0.5 }); // Smooth movement
    }, [latitude, longitude, map]);
    return null;
  }