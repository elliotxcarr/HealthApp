import React ,{useState} from "react";
import { View,Text, StyleSheet , FlatList, useWindowDimensions, Dimensions} from "react-native";

import Slider from "@react-native-community/slider";
var width = Dimensions.get("window").width

export default OnBoardingItem = ({item})=>{
    const [range,setRange] = useState("50%");
    const [sliding, setSliding] = useState('Inactive');
    const [textScore, setTextScore] = useState('Okay');

    function handleChange(value){
        
        setRange(parseInt(value *10))
        let score = value *10

        if(score > 8){
            setTextScore('Fantastic')
        }
        else if(score < 8 && score > 5){
            setTextScore('Good')
        }else if(score ==5){
            setTextScore('Okay')
        }
        else if(score < 5 && score > 2){
            setTextScore('Not great')
        }
        else if(score < 2 ){
            setTextScore('Terrible')
        }
    }



    return(
        <View style={[styles.container, {width}]}>

            <View style={styles.card}>
                <Text style={styles.question}>{item.question}</Text>
                <Text style={{fontSize:40, fontWeight:'bold'}}>{range}</Text>
                <Text style={{fontSize:30, fontWeight:'regular'}}>{textScore}</Text>


            
            <Slider 
            style = {{width:350, height:100}}
            minimumValue = {0}
            maximumValue = {1}
            minimumTrackTintColor = { '#77D199'}
            maximumTrackTintColor = {'#000'}
            value = {0.5}
            step = {0.1}
            onValueChange = {value => 
            
            handleChange(value)
            
            }
            onSlidingStart = {() => setSliding('Sliding')}
            onSlidingComplete = {() => setSliding('Inactive')}
            />
            </View>

            
    </View>
    );
  }


const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    question:{
        textAlign:'center',
        fontSize:30,
        fontFamily:'OpenSansRegular',
        padding:30,
    },
    card:{
        
        width: width-10,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'white',
        elevation:4,
        paddingBottom:20
        
    }
})