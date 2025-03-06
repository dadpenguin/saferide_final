import { Text, View, TextInput, Button } from "react-native";
import RouteButton from "../(components)/route-button";



const ChangeRoute = () => {
  // console.log
}

export default function PersonalInfo() {



  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      

      <View style={{ padding: 20, gap: 10 }}>
        <Text>Personal info</Text>
        <TextInput placeholder="First Name" style={{borderWidth: 1}}/>
        <TextInput placeholder="Last Name" style={{borderWidth: 1}}/>
        <TextInput placeholder="Birthdate" style={{borderWidth: 1}}/>
        <TextInput placeholder="Address" style={{borderWidth: 1}}/>
        <TextInput placeholder="Phone Number" style={{borderWidth: 1}}/>
      </View>


      


      <RouteButton title={'go emergency info'} href={'get-started/emergency-info'}/>
      


    </View>
  );
}
