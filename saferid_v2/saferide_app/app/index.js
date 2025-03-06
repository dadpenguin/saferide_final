import { useRouter, useFocusEffect } from "expo-router";
import { Text } from "react-native";

export default function Index () {
    const router = useRouter()

    useFocusEffect(()=>{
        // router.replace('sample')
        router.replace('/get-started/personal-info')
        // router.replace('/onboard-status/onboard-current')

    })

    return (
        <>
        <Text>Loading...</Text>
        </>

    )
    
}