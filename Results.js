import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, Dimensions, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { scores } from "./OnBoardingItem";

import Animated,{useSharedValue, useAnimatedStyle, withTiming} from "react-native-reanimated";
const width = Dimensions.get('window').width;

export default function Results({navigation}){

const progress = useSharedValue(0)

const reanimatedStyle = useAnimatedStyle(() =>{
    return {
        opacity: progress.value
    }
},[])
 
    
    useEffect(()=>{
        progress.value = withTiming(1, {duration:1000})
    },[])
        
    

    return(
    <View style={styles.container}>
    <View style= {styles.toolbar}>
        <StatusBar style='auto'/>
           
          <Text style={styles.titleText}>Results</Text>
          
          
      </View>
      
      <View style={styles.card}>

        <Animated.View style={[reanimatedStyle,{alignItems:'center'}]} >
            <Text style={styles.category}>Your mood today: </Text>
            <View style={{flexDirection:'row',paddingBottom:20}}>
            <Text style={styles.scores}>{scores[0].number}</Text>       
            <Image source={scores[0].reaction} style={styles.emoji}/>
            </View>
        </Animated.View>
        <Animated.View style={[reanimatedStyle,{alignItems:'center'}]} >
            <Text style={styles.category}>Your comfort today: </Text>
            <View style={{flexDirection:'row',paddingBottom:20}}>
            <Text style={styles.scores}>{scores[1].number}</Text>  
            <Image source={scores[1].reaction} style={styles.emoji}/>
        </View>
        </Animated.View>
        <Animated.View style={[reanimatedStyle,{alignItems:'center'}]} >
        <Text style={styles.category}>Your calmness today: </Text>
        <View style={{flexDirection:'row',paddingBottom:20}}>
        <Text style={styles.scores}>{scores[2].number}</Text>
        <Image source={scores[2].reaction} style={styles.emoji}/>
        </View>
        </Animated.View>
        <Animated.View style={[reanimatedStyle,{alignItems:'center'}]} >
        <Text style={styles.category}>Your energy today:</Text>
        <View style={{flexDirection:'row',paddingBottom:20}}>
        <Text style={styles.scores}>{scores[3].number}</Text>
        <Image source={scores[3].reaction} style={styles.emoji}/>
        </View>
        </Animated.View>
        <Animated.View style={[reanimatedStyle,{alignItems:'center'}]} >
        <Text style={styles.category}>Your sleep last night: </Text>
        <View style={{flexDirection:'row',paddingBottom:20}}>
        <Text style={styles.scores}>{scores[4].number}</Text>
        <Image source={scores[4].reaction} style={styles.emoji}/>
        </View>
        </Animated.View>
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
        fontFamily:'OpenSansRegular',
        fontSize:20,
        alignSelf:"center",
        paddingBottom:10
      },
      emoji:{
        width:55,
        height:55,
      },
      scores:{
        fontFamily:'OpenSansBold',
        fontSize:40,
        paddingRight:30
      }
      
})