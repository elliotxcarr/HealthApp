import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Home from './Home';
import Medication from "./Medication";
import DailyCheck from "./DailyCheck";

const { Navigator, Screen} = createNativeStackNavigator();

function appNavigator(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false}} initialRouteName='Home'>
                
                <Screen name = 'Home' component={Home}/>
                <Screen name = 'Medication' component={Medication}/>
                <Screen name = 'DailyCheck' component={DailyCheck}/>
            </Navigator>
        </NavigationContainer>





    )
}
export default appNavigator;