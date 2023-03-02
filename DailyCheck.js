import React, { useEffect, useRef, useState,useCallback} from "react";
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import OnBoarding from "./OnBoarding";

import { StatusBar } from "expo-status-bar";
export default function DailyCheck({navigation}){


    return(
        <View style={styles.container}>
             <View style= {styles.toolbar}>
                   
                    
                   <Text style={styles.titleText}>Daily Check-Up</Text>
                   
                   <StatusBar style='auto'/>
               </View>
        
               <OnBoarding navigation={navigation} />
                
              
        <View style={styles.menuBar}>
            <Icon name="person" size={37} color={"white"} ></Icon>
            <Icon style={{backgroundColor:'#77D199'}} name="grid" size={50} color={"white"} onPress={() => navigation.navigate('Home')}></Icon>
            <Icon name="settings" size={37} color={"white"}></Icon>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ECECEC'
    },
    menuBar:{
        width:'100%',
        
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        bottom:0,
        height:57,
        flexDirection:'row',
        backgroundColor:'#77D199',
        justifyContent:'space-around',
        alignItems:"center"
      },
      toolbar:{
        width:'100%',
        backgroundColor:'#77D199',
        height:180,
        alignItems:'center',
        marginBottom:-40,
        paddingTop:40,
        flex:2,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
        

    },
    titleText:{
        fontSize:40,
        fontFamily:'OpenSansBold',
        color:'white'
    },
    
})