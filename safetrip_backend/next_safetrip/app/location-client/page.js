'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';









const routeArray = [
    [11.61419, 125.43792],
    [11.61386, 125.43792],
    [11.6136, 125.43792],
    [11.61335, 125.43792],
    [11.61314, 125.43791],
    [11.61294, 125.4379],
    [11.61276, 125.4379],
    [11.61275, 125.43775],
    [11.61274, 125.43756],
    [11.6127, 125.43738],
    [11.61267, 125.43721],
    [11.61263, 125.43701],
    [11.61262, 125.4368],
    [11.6126, 125.43654],
]




const Map = () => {
    const [position, setPosition] = useState(routeArray[0]); // Default coordinates
    const [currentIndex, setCurrentIndex] = useState(0)


  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);




    
    const blueIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });




  useEffect(() => {


    const intervalId = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % routeArray.length; // Loop back to 0 after reaching the end
          setPosition(routeArray[nextIndex]);
          return nextIndex;
        });
      }, 2000);




    window.addEventListener("keydown", handleKeyPress);


    // Cleanup the interval on component unmount
    return () => {
        
        window.removeEventListener("keydown", handleKeyPress);
        
        clearInterval(intervalId);
    
    }






  }, []);

  return (
    <MapContainer center={position} zoom={100} style={{ width: '100%', height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />



      <Marker position={position} icon={blueIcon}> 
        

        <Popup>
          {position}
        </Popup>
      </Marker>

      {/* <Polyline pathOptions={ {color: 'blue', weight: 3 }} positions={routeArray} /> */}


    {/* Initial location */}
      {/* <Marker position={routeArray[0]} icon={blueIcon}> 

        <Popup>
          {routeArray[0]}
        </Popup>
      </Marker> */}


    </MapContainer>
  );
};







export default function ClientInterface () {
    const [currentLoc, setCurrenLoc] = useState(null)
    const [currentCoords, setCurrentCoords] = useState(null)


    const name = 'joseph'


    useEffect(()=>{

        // Define the latitude and longitude
        const latitude = routeArray[routeArray.length - 1][0]
        const longitude = routeArray[routeArray.length - 1][1]



        setCurrentCoords(routeArray[routeArray.length -1])

        


        // Nominatim API URL for reverse geocoding
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;


        async function getAddress() {
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
                // console.log("Address:", data.address);
                setCurrenLoc(data.address)
            } else {
                console.log("Address not found");
                setCurrenLoc(null)

            }
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        }

        
        const interval = setInterval(() => {
            getAddress()
            console.log('got address')
        }, 5000); // 2000ms = 2 seconds
      
          return () => clearInterval(interval); // Cleanup on unmount

    },[])


    

    return (

        <>
        <p>{name} is in an emergency</p>
        <p>Current Location: {currentLoc ? JSON.stringify(currentLoc) : 'No address found'}</p>
        <p>Current Coords: {currentCoords ? JSON.stringify(currentCoords) : 'No coords found'}</p>


        <Map/>
        </>
    )
};
