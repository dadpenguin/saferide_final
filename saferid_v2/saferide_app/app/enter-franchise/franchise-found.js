import { useGlobalSearchParams } from "expo-router";
import { Button, Text } from "react-native";
import RouteButton from "../(components)/route-button";

// import RouteButton from "../(components)/route-button"; always use relative imports for grouped components


// group components still have parenthesis


export default function FranchiseFound () {
    const {params} = useGlobalSearchParams()

    // return <>{JSON.stringify(data)}</>
    return <> 
    
    <Text>
        data found: {params} 
    </Text>
    <RouteButton title={'continue'} href={'/onboard-status/onboard-current'} confirmation={true}/>
    <RouteButton title={'back'} href={'/enter-franchise/check-franchise'}/>
    
    </>


}