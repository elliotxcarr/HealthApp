import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, Dimensions,  } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { scores } from "./OnBoardingItem";


const width = Dimensions.get('window').width;

export default function Results({navigation}){

    

    return(
    <View style={styles.container}>
    <View style= {styles.toolbar}>
        <StatusBar style='auto'/>
           
          <Text style={styles.titleText}>Results</Text>
          
          
      </View>
      
      <View style={styles.card}>
      <Text style={styles.category}>Your mood today: </Text>
        <Text >{scores.mood}</Text>
        

        <Text style={styles.category}>Your pain today: </Text>
        <Text>{scores.pain}</Text>
        <Text style={styles.category}>Your stress today: </Text>
        <Text>{scores.stress}</Text>
        <Text style={styles.category}>Your energy today:</Text>
        <Text>{scores.energy}</Text>
        <Text style={styles.category}>Your sleep last night: </Text>
        <Text>{scores.sleep}</Text>
      </View>

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
    toolbar:{
        width:'100%',
        backgroundColor:'#77D199',
        height:180,
        alignItems:'center',
        marginBottom:-40,
        paddingTop:40,
       
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        
        

    },
    titleText:{
        fontSize:40,
        fontFamily:'OpenSansBold',
        color:'white'
    },
    card:{
       flex:1,
        width: width-10,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'white',
        elevation:4,
        paddingBottom:20,
        padding:20
        
    },
    menuBar:{
        
        width:'100%',
        height:70,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        bottom:0,
        position:'absolute',
        flexDirection:'row',
        backgroundColor:'#77D199',
        justifyContent:'space-around',
        alignItems:"center"
      },
      category:{
        fontFamily:'OpenSansBold',
        fontSize:30,
        alignSelf:"center"
      }
})