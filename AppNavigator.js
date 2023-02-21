import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Home from './Home';
import Medication from "./Medication";
import DailyCheck from "./DailyCheck";

import Results from "./components/Results";

const Stack= createNativeStackNavigator();

function appNavigator(){
    return(



        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Home'>
                
                <Stack.Screen name = 'Home' component={Home}/>
                <Stack.Screen name = 'Medication' component={Medication}/>
                <Stack.Screen name = 'DailyCheck' component={DailyCheck}/>
                <Stack.Screen name = 'Results' component={Results}/>
            </Stack.Navigator>
        </NavigationContainer>





    )
}
export default appNavigator;