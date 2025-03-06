import { useRouter } from "expo-router"
import { Button, Alert } from "react-native"

export default RouteButton = ({href, title, confirmation, confirmationDesc, confirmationTitle, buttonProps, confirmatioNCallback, BtnCallback = () => {}}) => {
    const router = useRouter()


    // const PressHandler  = () => {
    //     if (!confirmation) {
    //         router.replace(href)
    //     } else {
    //         Alert.alert( confirmationTitle ||'Do you wish to continue?', confirmationDesc || 'This process cannot be undone',[
    //             {text: 'Cancel',  onPress: ()=>console.log('pressed')},
    //             {text: 'Continue', onPress: ()=>{
                    
    //                 if (confirmatioNCallback) {
    //                     confirmatioNCallback()
    //                 }
                    

    //                 router.replace(href)
                
    //             }},
    //         ])
    //     }
    // }

    const PressHandler = () => {
        BtnCallback()
        router.replace(href)}


    return( 
    <>
        <Button title={title} onPress={()=>PressHandler()} {...buttonProps}/>
    </>

)

} 