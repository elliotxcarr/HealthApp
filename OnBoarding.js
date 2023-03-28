import React ,{useState,useRef,useEffect} from "react";
import { View,Text, StyleSheet , FlatList, Animated, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import OnBoardingItem from "./OnBoardingItem";
import checkQuestions from "./components/checkQuestions";
import Paginator from "./Paginator";

import { scores } from "./OnBoardingItem";
import { Audio } from "expo-av";

export default function OnBoarding({navigation}){
    
    const  [currentIndex, setCurrentIndex] = useState(0);
    const [shouldShow, setShouldShow] = useState(true)
    const scrollX = useRef(new Animated.Value(0)).current;
    
    const [sound,setSound] = useState(new Audio.Sound())
    const [finishedSound, setFinishSound] = useState( new Audio.Sound())

    useEffect(()=>{
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            
            playsInSilentModeIOS:true,
            shouldDuckAndroid:true,
            staysActiveInBackground:true,
           
        })
        sound.loadAsync(require('./assets/Select.mp3'))
        finishedSound.loadAsync(require('./assets/finished.mp3'))
    },[])

    const status = { shouldPlay:false};

    

    const playSound=()=>{
        sound.playAsync();
        sound.setPositionAsync(0)
    }

const playFinishSound=()=>{
        finishedSound.playAsync();
        finishedSound.setPositionAsync(0)
    }

    const slidesRef = useRef(null)
    const viewableItemsChanged = useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index);
    }).current;

   
    

    const scrollTo=()=>{
        playSound();
        if(currentIndex < checkQuestions.length -1){
            
            slidesRef.current.scrollToIndex({index: currentIndex +1})
            
        }else {
            
            setShouldShow(false)
        }
    }
    const scrollBack=()=>{
        playSound();
        if(currentIndex > 0){
            
            slidesRef.current.scrollToIndex({index: currentIndex -1})
            setShouldShow(true)
        }else{
            setShouldShow(true)
            
        }
    }
    
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    return(
        <View style={styles.container}>

            <FlatList data={checkQuestions} renderItem={({item}) => <OnBoardingItem item={item} />} 
                horizontal
                scrollEnabled={false}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                keyExtractor={(item)=>item.id}
                onScroll={Animated.event([{ nativeEvent:{contentOffset:{ x : scrollX} } }],{
                    useNativeDriver: false
                } )}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                
            />
            <View style={{flexDirection:'row',flex:1}}>
                <TouchableOpacity onPress={scrollBack} style = {styles.backButton}>
                        <Icon style={{backgroundColor:'#77D199', borderRadius:30, color:'white',padding:10}} name="arrow-back-outline" size={40}></Icon>
                </TouchableOpacity>

                
                {shouldShow ? (
                    <TouchableOpacity onPress={scrollTo} style = {[styles.nextButton]}>
                    <Icon style={{backgroundColor:'#77D199', borderRadius:30, color:'white',padding:10}} name="arrow-forward-outline" size={40}></Icon>
                    </TouchableOpacity>
                ) : 
                    <TouchableOpacity style ={[styles.nextButton]} onPress={()=> {navigation.navigate('Results', scores);playFinishSound()}}>
                    <Text style={{backgroundColor:'#77D199', borderRadius:20, color:'white',padding:10, fontSize:25}} >Next</Text>
                    </TouchableOpacity>
                
                
                
                }
                        
                
            </View>
                
            
            
            
            <View style={{alignItems:'center'}}>
            <Paginator data={checkQuestions} scrollX={scrollX} />
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:9
    },
    nextButton:{
        flex:3,
        alignItems:'flex-end',
        paddingRight:20
    },
    backButton:{
        flex:3,
        alignItems:'flex-start',
        paddingLeft:20
    }
})