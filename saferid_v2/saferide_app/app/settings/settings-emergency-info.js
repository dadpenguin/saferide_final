import { Text, View, TextInput, Button } from "react-native";
import routeButton from "../(components)/route-button";
import RouteButton from "../(components)/route-button";


export default function EmergencyInfo () {
    return (
        <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              
        
              <View style={{ padding: 20, gap: 10 ,width: '40%'}}>
                <Text>Emergency info</Text>
                <TextInput placeholder="Emergency Contact Chat ID" style={{borderWidth: 1, width: 'auto'}}/>
                <TextInput placeholder="Emergency Contact Number" style={{borderWidth: 1, width: 'auto'}}/>
              </View>
        
        
              <RouteButton title={'go homepage'} href={'/'}/>
        
        
        
            </View>

    )
}