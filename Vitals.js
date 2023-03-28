import React, {useEffect, useState} from "react";

import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions,FlatList, Modal, TouchableOpacity, Pressable, Touchable} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Animated,{useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming, withSequence, Easing} from "react-native-reanimated";
import { ResultsCalculations } from "./BPCalc";
import { Audio } from "expo-av";
import AnimatedLottieView from "lottie-react-native";
import { ScrollView } from "react-native-gesture-handler";
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function Vitals({navigation}){
    const resultsOpac = useSharedValue(0)
    const textOpac = useSharedValue(0)
    const heartScale = useSharedValue(0)
    const scale = useSharedValue(0);
    const progress = useSharedValue(0);
    const buttonProgress = useSharedValue(0);
   const [playNext, setPlayNext]= useState(false);
   const [showResults, setResults] = useState(false);
    const [showStart, setStart] = useState(true)
    const reanimatedStyle = useAnimatedStyle(()=>{

        return{
            
            transform : [{scale: withTiming(scale.value,{duration:600})}],
            opacity : withTiming(progress.value, {duration:500}) 
        }
    },[]);


    const [selectSound,setSelectSound] = useState(new Audio.Sound())
    const [loadSound, setLoadSound] = useState(new Audio.Sound())

    useEffect(()=>{
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            
            
            playsInSilentModeIOS:true,
            shouldDuckAndroid:true,
            staysActiveInBackground:true,
            
        })
        loadSound.loadAsync(require('./assets/loading.mp3'))
        selectSound.loadAsync(require('./assets/Select.mp3'))
    },[])

    const status = { shouldPlay:false};

    

    const playSelectSound=()=>{
        selectSound.playAsync();
        selectSound.setPositionAsync(0)
    }
    const playLoadingSound=()=>{
        loadSound.playAsync();

    }



    const buttonStyleAnim = useAnimatedStyle(()=>{
        return{
            opacity: withTiming(buttonProgress.value, {duration:600}) 
        }
    },[])

    useEffect(()=>{

        progress.value = withTiming(1) 
        scale.value =  withDelay( 600, withTiming(3)) 
        buttonProgress.value =  withDelay( 2000, withTiming(1)) 

        

       
    },[]);

    
        const heartStyle = useAnimatedStyle(()=>{
            return{
                transform : [{scale: withTiming(heartScale.value, {duration: 600})}]
            }
        },[])
       const textStyle = useAnimatedStyle(()=>{
        return{
            opacity: textOpac.value
        }
       },[])
       const flashText = ()=>{
        
            textOpac.value  = 
                withDelay(2000, withRepeat(
                  withSequence(
                    
                    withTiming(1, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
                    withTiming(0, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
                  )
                , 6))
              
              setInterval(()=>{heartScale.value = 0; setInterval(()=>{setResults(true);resultsOpac.value=1},1000); setInterval(()=>setStart(false),600);setInterval(()=>setPlayNext(false),600)  }, 15000)
       }
    
       const resultsStyle = useAnimatedStyle(()=>{
            return{
                opacity: withTiming(resultsOpac.value, {duration:1000})

            }
       },[])    
       
    return(

        <View style={styles.container}>
            
                <View style= {styles.toolbar}>
                   
                    
                    <Text style={styles.titleText}>Vitals Check</Text>
                    <StatusBar style='auto'/>
                    
                
                </View>
                {showStart ? 
                    <View>
                    <View style={{justifyContent:'center', alignItems:'center', top:300}}>
                        <Animated.View
                                style={[reanimatedStyle, styles.card]}>

                        <Text style={styles.instruction}>Please securely attach the arm cuff below</Text>
                        <AnimatedLottieView source={require('./assets/97914-arrow-grey.json')} autoPlay style={styles.arrowAnim}/>
                               
                        </Animated.View>
                    </View>
                    <Animated.View style={[buttonStyleAnim,{alignItems:'center',top:500}]}>
                        <TouchableOpacity style={{backgroundColor:'#77D199', borderRadius:10}} onPress={()=>{ progress.value = 0; scale.value = 0;buttonProgress.value=0; heartScale.value = 1;setPlayNext(true);flashText();playLoadingSound();playSelectSound()}}>
                            <Text style={{padding:15, fontFamily:'OpenSansSemiBold', color:'white', fontSize:20}} >Done</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    </View>
                :
                    null
                }
                

                {playNext ? 
                <Animated.View style={heartStyle}>
                <AnimatedLottieView source={require('./assets/4565-heartbeat-medical.json')} autoPlay style={{width:250, height:250, alignSelf:'center', top:30}} />
                
                <AnimatedLottieView source={require('./assets/97127-loading-icon.json')} autoPlay style={{width:200,height:200, top:40, alignSelf:'center'}}/>
                <Animated.View style={[textStyle,{alignItems:'center'}]}>
                
                    <Text style={{fontFamily:'OpenSansSemiBold',fontSize:20}}>Processing Your Blood Pressure... </Text>
                </Animated.View>
                </Animated.View> 


                :
                null}

                {showResults ? 

                <Animated.View style={[resultsStyle,{paddingRight:30, justifyContent:'center',flex:0.95}]}>
                 
                    
                    <Text style={styles.type}>Systolic Pressure</Text>
                    <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                    <Text style={styles.readings}>121</Text>
                    <Text style={{textAlign:"right", fontFamily:'OpenSansRegular'}}>mmHg</Text>
                    </View>
                    <Text style={styles.type}>Diastolic Pressure</Text>
                    <View style={{flexDirection:'row',alignItems:'flex-end', justifyContent:'flex-end'}}>
                    <Text style={styles.readings}>80</Text>
                    <Text  style={{textAlign:"right"}}>mmHg</Text>
                    </View>
                    
                    <ResultsCalculations/>
                    
                 </Animated.View>
                 
                 :
                 null
                }
                
                
               
              
                <View style={styles.menuBar}>
      
                    <Icon name="person" size={37} color={"white"}></Icon>
                    <Icon style={{backgroundColor:'#77D199'}} name="grid" size={50} color={"white"} onPress={() => {navigation.navigate('Home'),playSelectSound()}}></Icon>
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
      },
      resultsCard:{
        height:450,
        width:380,
        backgroundColor:'white',
        borderRadius:20, 
        elevation:3, 
      },
      readings:{
        fontFamily:'OpenSansSemiBold',
        fontSize:50,
        textAlign:'right'
      },
      type:{
        fontFamily:'OpenSansRegular',
        fontSize:23,
        textAlign:'right'
      }
})