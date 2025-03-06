import { Text } from "react-native";
import RouteButton from "../(components)/route-button";

export default function FranchiseNotFound ({franchiseNumber}) {
    return(<>

    <Text>

        {franchiseNumber} Not found
    </Text>
    <RouteButton title={'back'} href={'/enter-franchise/check-franchise'}/>

    
    </>)
}