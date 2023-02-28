import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

var width = Dimensions.get("window").width

const listTab = [
    {
        status:'Fitness'
    },
    {
        status:'Dietary'
    }
]



export default function Goals({navigation}){

    const [status,setStatus] = useState('Fitness')
    const setStatusFilter = status =>{
        setStatus(status)
    }


    

    return(
    <View style={styles.container}>
    <View style= {styles.toolbar}>
        <StatusBar style='auto'/>
           
          <Text style={styles.titleText}>Goals</Text>
          
          
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around',}}>
        {listTab.map(e=> (
            <TouchableOpacity style={[styles.btnTab ,  status === e.status && styles.activeButton]} onPress={()=>{setStatusFilter(e.status)}}>
            <Text style={styles.tabText} >{e.status}</Text>
            </TouchableOpacity>
        ))}
            
            
        </View>
      <View style={styles.card}>

        
      </View>
      <View style={styles.card}>

        
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
        height:300,
        width: width-10,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'white',
        elevation:4,
       marginBottom:10  
        
        
    },
    tabText:{
        
        fontFamily:'OpenSansRegular',
        fontSize:20,
        color:'white'
        
        
    },
    btnTab:{
        flexDirection:'row',
         justifyContent:'space-around',
          top:-10,
          padding:10,
          
          
    },
    activeButton:{
        backgroundColor:'#6AB687',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingLeft:20,
        paddingRight:30
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
})