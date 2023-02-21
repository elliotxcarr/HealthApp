import React from "react";
import { View, Animated, StyleSheet,useWindowDimensions,Text, TouchableOpacity } from "react-native";
import  Icon  from "react-native-vector-icons/Ionicons";

export default NextButton = ({scrollTo})=>{
    const size = 128;
    const strokeWidth=2;
    const center = size/2;
    

   return(
    
    <TouchableOpacity onPress={scrollTo} style = {styles.nextButton}>
        <Icon style={{backgroundColor:'#77D199', borderRadius:30, color:'white',padding:10}} name="arrow-forward-outline" size={40}></Icon>
    </TouchableOpacity>
   ) 
}

const styles = StyleSheet.create({
    
    nextButton:{
        flex:3,
        alignItems:'flex-end',
        paddingRight:20
    }
})