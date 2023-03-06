import React,{useState} from "react";

import { Text, View,StyleSheet,TouchableOpacity } from "react-native";
import { set } from "react-native-reanimated";

import  Icon  from "react-native-vector-icons/Ionicons";

const ResultsCalculations = ()=>{

    const [showInfo, setShowInfo] = useState(false);


    return(
        <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.resultText}>At Risk</Text>
            <TouchableOpacity onPress={()=>{!showInfo ? setShowInfo(true): setShowInfo(false) }}>
             <Icon name='help-circle-outline' size={30} style={{padding:10}} ></Icon>
            </TouchableOpacity>
            {showInfo ?
                
                <View style={styles.popUp}>
                    <Text style={styles.textPopup}>A reading between 120/80 and 140/90 means you may be at risk of high blood pressure</Text>
                </View>

            :
                null
            }
        </View>
        <View
            style={{
                borderBottomWidth:StyleSheet.hairlineWidth,
                borderBottomColor:'black',
                width:'130%',
                marginBottom:20
            }}
            />
            
           <View style={styles.chart}>
           <View style={{flexDirection:'row', justifyContent:'space-between' ,paddingBottom:20, alignItems:'center'}}>
                <Text style={styles.readings}>90/60 and below</Text>
                <Text style={[styles.warnings,{color:'blue'}]}>Low</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingBottom:20, alignItems:'center'}}>
                <Text style={styles.readings}>90/60 - 120/80</Text>
                <Text style={[styles.warnings,{color:'green'}]}>Normal</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingBottom:20, alignItems:'center'}}>
                <Text style={styles.readings}>120/80 - 140/90</Text>
                <Text style={[styles.warnings,{color:'orange'}]}>At Risk</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', paddingBottom:20, alignItems:'center'}}>
                <Text style={styles.readings}>140/90 and above</Text>
                <Text style={[styles.warnings,{color:'red'}]}>High</Text>
            </View>
           </View>
        </View>

    )
}
export {ResultsCalculations}

const styles = StyleSheet.create({
    container:{
      top:80,
       alignItems:'flex-start',
       
       
    },
    resultText:{
        fontFamily:'OpenSansBold',
        fontSize:50,
        color:'orange',
        paddingLeft:20,
        paddingBottom:20
    },
    popUp:{
        position:'absolute',
        bottom:'90%',
        left:'4%',
        height:90,
        width:300,
        backgroundColor:'white',
        borderRadius:10,
       
    },
    textPopup:{
        fontFamily:'OpenSansRegular',
        padding:10,
        
        
    },
    chart:{
        paddingLeft:20,
        width:'100%'
    },
    readings:{
        fontFamily:'OpenSansRegular',
        fontSize:20
    },
    warnings:{
        fontFamily:'OpenSansSemiBold',
        fontSize:25,
        textAlign:'right'
    }
})