import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Text, View, StyleSheet,  } from "react-native";

export default function Results({navigation}){

    <View style={styles.container}>
    <View style= {styles.toolbar}>
          
           
          <Text style={styles.titleText}>Results</Text>
          
          <StatusBar style='auto'/>
      </View>


    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ECECEC'
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
})