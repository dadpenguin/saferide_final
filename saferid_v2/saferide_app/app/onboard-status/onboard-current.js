import { useGlobalSearchParams } from "expo-router";
import { Button, Text } from "react-native";
import RouteButton from "../(components)/route-button";


export default function OnBoardCurrent () {


    // return <>{JSON.stringify(data)}</>
    return <>
    <Text>
        OnBoard 
    </Text>
    <RouteButton title={'Safe'} href={'/onboard-status/onboard-safe'} confirmation={true}/>
    <RouteButton title={'Emergency'} href={'/sample/second'} confirmation={true}
    confirmationDesc={'By proceeding, your data such as live location, live microphone, personal details and trip details will be sent to the authorities. When sent, this process cannot be undone.'}
    />

    
    </>
}