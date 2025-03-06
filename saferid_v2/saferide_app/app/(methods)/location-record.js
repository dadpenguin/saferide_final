import * as Location from 'expo-location';

export const StartLocationRecording = async (
    setLocation,
    SetLocationSubscription,
    LocationSubscription
) => {

    // console.log('starting location...')

    if (!LocationSubscription) {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every second
        },
        (newLocation) => {
          console.log(newLocation);
          setLocation(newLocation.coords);
        }
      );

      SetLocationSubscription(subscription); // Set subscription in state
    }
   else {
    console.log("no location permission");
  }
}

export const StopLocation = async(LocationSubscription) => {

  if (LocationSubscription) { 
      LocationSubscription.remove();
        console.log("Removed location subscription");
  } else {
    console.log("No location subscription to remove");
  }
}