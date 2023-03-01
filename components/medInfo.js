import React, {useState} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, TextInput, StatusBar,} from "react-native";
import medicationData from "./MedicationData";
import Icon from "react-native-vector-icons/Ionicons";
const WIDTH = Dimensions.get('window').width;
const HEIGH_MODAL = Dimensions.get('window').height;

const MedInfo = (props)=>{


   const closeModal = (bool,data)=>{
    props.changeInfoVisible(bool)
    
   }
  
   
  let item = {
    id: props.data.item.id,
    name: props.data.item.name,
    dosage: props.data.item.dosage,
    remaining : props.data.item.remaining,
    isRemind : props.data.item.isRemind
  }
  const closeAndDelete = (bool,id)=>{
    props.changeInfoVisible(bool)
    let index = medicationData.findIndex((obj)=> obj.id == id)
    medicationData.splice(index, 1)
    
  }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    var date = new Date();
    
    function handleDate(){
        var options = { weekday: 'long',month: 'long',  year: 'numeric', day: 'numeric', hour:undefined, minute:undefined };

        let endDate = date.addDays(parseInt(item.remaining));
        
        return endDate.toLocaleDateString('en-GB',options)
    }
 


    return(
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        
        >
            <View style={styles.modal} >
            <TouchableOpacity onPress={()=>{closeModal(false,'cancel')}} style={styles.close} >
                <Icon name="close-circle" size={30} style={{color:'#77D199'}}></Icon>
                </TouchableOpacity>
                
            <View style={styles.list}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.dosage}>{item.dosage}</Text>
            
            <Text style={{fontFamily:'OpenSansBold',fontSize:18}}>Expires:</Text>
            <Text style={{fontFamily:'OpenSansRegular',fontSize:25}}>{handleDate()}</Text>
            </View>
               <TouchableOpacity style={styles.delete} onPress={()=>closeAndDelete(false, item.id)} >
                <Text style={{fontSize:20,color:'white',fontFamily:'OpenSansBold'}}>Delete</Text>
               </TouchableOpacity>
            
            <StatusBar translucent></StatusBar>
            </View>
        </TouchableOpacity>
        
    )
}
export {MedInfo}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
        
    },
    modal:{
        height: HEIGH_MODAL - 480,
        width:WIDTH-30,
        paddingTop:30,
        borderRadius:25,
        backgroundColor:'white',
        padding:20,
        
    },
    delete:{
        alignItems:'flex-end',
        alignSelf:'center',
        backgroundColor:'tomato',
        padding:7,
        borderRadius:6
    },
    list:{
        paddingTop:10,
        flex:1
    },
    name:{
        fontFamily:'OpenSansBold',
        fontSize:30
    },
    dosage:{
        fontFamily:'OpenSansLight',
        fontSize:20,
        paddingBottom:20
    }
})