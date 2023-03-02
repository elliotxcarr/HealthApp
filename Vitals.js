import React, {useEffect, useState} from "react";

import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions,FlatList, Modal, TouchableOpacity, Pressable, Touchable} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Animated,{useAnimatedStyle, useSharedValue, withDelay, withTiming} from "react-native-reanimated";
import useFonts from "./useFonts";

import AnimatedLottieView from "lottie-react-native";
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function Vitals({navigation}){
    const heartScale = useSharedValue(0)
    const scale = useSharedValue(0);
    const progress = useSharedValue(0);
    const buttonProgress = useSharedValue(0);
   const [playNext, setPlayNext]= useState(false);

    const reanimatedStyle = useAnimatedStyle(()=>{

        return{
            
            transform : [{scale: withTiming(scale.value,{duration:600})}],
            opacity : withTiming(progress.value, {duration:500}) 
        }
    },[]);

    const buttonStyleAnim = useAnimatedStyle(()=>{
        return{
            opacity: withTiming(buttonProgress.value, {duration:1000}) 
        }
    },[])

    useEffect(()=>{

        progress.value = withTiming(1) 
        scale.value =  withDelay( 600, withTiming(3)) 
        buttonProgress.value =  withDelay( 2000, withTiming(1)) 


       
    },[]);

    
        const heartStyle = useAnimatedStyle(()=>{
            return{
                transform : [{scale: withTiming(heartScale.value, {duration: 1000})}]
            }
        })
   
        
    


    
    return(

        <View style={styles.container}>
            
                <View style= {styles.toolbar}>
                   
                    
                    <Text style={styles.titleText}>Vitals Check</Text>
                    <StatusBar style='auto'/>
                    
                
                </View>
                <View style={{justifyContent:'center', alignItems:'center',flex:2}}>
                        <Animated.View
                                style={[reanimatedStyle, styles.card]}>

                        <Text style={styles.instruction}>Please securely attach the arm cuff below</Text>
                        <AnimatedLottieView source={require('./assets/97914-arrow-grey.json')} autoPlay style={styles.arrowAnim}/>
                               
                        </Animated.View>
                </View>
                <Animated.View style={[buttonStyleAnim,{alignItems:'center',flex:0.55}]}>
                    <TouchableOpacity style={{backgroundColor:'#77D199', borderRadius:10}} onPress={()=>{progress.value = 0; scale.value = 0;buttonProgress.value=0,heartScale.value = 1}}>
                        <Text style={{padding:15, fontFamily:'OpenSansSemiBold', color:'white', fontSize:20}} >Done</Text>
                    </TouchableOpacity>
                </Animated.View>
                
               

                <View style={styles.menuBar}>
      
                    <Icon name="person" size={37} color={"white"}></Icon>
                    <Icon style={{backgroundColor:'#77D199'}} name="grid" size={50} color={"white"} onPress={() => navigation.navigate('Home')}></Icon>
                    <Icon name="settings" size={37} color={"white"}></Icon>
                </View>
                
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ECECEC',
        
    },
    toolbar:{
        width:'100%',
        backgroundColor:'#77D199',
        height:120,
        alignItems:'center',
        position:'absolute',
        paddingTop:40,
        
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
        

    },
    titleText:{
        fontSize:40,
        fontFamily:'OpenSansBold',
        color:'white'
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
      arrowAnim:{
        width:50,
        height:50,
        
      },
      card:{
        height:130, 
        width:130,  
        backgroundColor:'white', 
        borderRadius:8, 
        elevation:3, 
        alignItems:'center',
        justifyContent:'flex-end'
      },
      instruction:{
        fontFamily:'OpenSansSemiBold',
        textAlign:'center',
        fontSize:12,
        padding:10
      }
})