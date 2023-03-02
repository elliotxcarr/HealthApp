import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionEvent } from "react";

import Home from './Home';
import Medication from "./Medication";
import DailyCheck from "./DailyCheck";
import Vitals from "./Vitals";
import Results from "./Results";
import Goals from "./Goals"
const Stack= createNativeStackNavigator();



function appNavigator(){

    return(



        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false, gestureEnabled:true, gestureDirection:"horizontal", animation:'slide_from_right'}} initialRouteName='Home'>
                
                <Stack.Screen name = 'Home' component={Home} />
                <Stack.Screen name = 'Medication' component={Medication}/>
                <Stack.Screen name = 'DailyCheck' component={DailyCheck}/>
                <Stack.Screen name = 'Results' component={Results}/>
                <Stack.Screen name='Goals' component={Goals}/>
                <Stack.Screen name='Vitals' component={Vitals}/>
            </Stack.Navigator>
        </NavigationContainer>





    )
}
export default appNavigator;