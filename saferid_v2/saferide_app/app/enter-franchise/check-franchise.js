import { Text, View, TextInput, Button } from "react-native";
import RouteButton from '../(components)/route-button'
import { useState } from "react";
import FetchFranchise from '../(methods)/fetch-franchise'
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter()

  const [franchiseVal, setFranchiseVal] = useState('');  // Store the franchise number from user input

  const [found, setFound] = useState(null)


  const CheckFranchiseNumber = async () => {
  

    // Starting to check
    console.log('checking...');



    // processing
    try {
      const fetchData = await FetchFranchise(franchiseVal);
      
      if (fetchData.ok) {
        // TODO: go to franchise found and pass data
        router.replace('/enter-franchise/franchise-found', { params: { data: fetchData.body } })
      } else {
        // TODO: go to franchise not found and pass data
        router.replace('/enter-franchise/franchise-not-found')
      }
    } catch (error) {
      console.error('Error fetching franchise:', error);
    }



  // finished 
    console.log('finished')
  }

  





  return (
    <>
      <TextInput 
        placeholder='franchise number' 
        style={{borderWidth: 1}} 
        onChangeText={(text) => setFranchiseVal(text)}
        value={franchiseVal}
      />
      <Button 
        title='Check Franchise Number' 
        onPress={CheckFranchiseNumber}
      />
    </>
  )


}
