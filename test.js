import React, { useEffect, useRef, useState, useCallback, Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  
  TouchableOpacity,
  View,
  
  SafeAreaView,
  
  Animated,
  
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Test(){

    return(
        <View style={styles.container}>

        
        <View style={styles.menuBar}>
      
        <Icon name="person" size={37} color={"white"}></Icon>
        <Icon style={{backgroundColor:'#77D199'}} name="grid" size={50} color={"white"} onPress={() => {playSound(); navigation.navigate('Home')}}></Icon>
        <Icon name="settings" size={37} color={"white"}></Icon>
    </View>
    </View>
    )
}

const styles= StyleSheet.create({
    container:{
        
        backgroundColor:'#ECECEC'

    },
    menuBar:{
        width:'100%',
        height:57,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        bottom:0,
        position:'absolute',
        flexDirection:'row',
        backgroundColor:'#77D199',
        justifyContent:'space-around',
        alignItems:"center"
      },
})