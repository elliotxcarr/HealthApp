import React, {useState} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, TextInput, StatusBar,} from "react-native";
import medicationData from "./MedicationData";
import Icon from "react-native-vector-icons/Ionicons";
const WIDTH = Dimensions.get('window').width;
const HEIGH_MODAL = Dimensions.get('window').height;

const AddMeds = (props)=>{
    const closeOff =(bool)=>{
        props.changeModalVisible(bool)
    }

    const closeAndAdd = (bool, newName,newDose,newRemaining)=>{
        props.changeModalVisible(bool);
        medicationData.push({
            id:medicationData.length + 1,
            name:newName,
            dosage:newDose + 'mg',
            remaining:newRemaining,
            isRemind:false
        })
        
    }
    const [newMedName, setNewName] = useState("")
    const [newDose , setNewDose] = useState("")
    const [ newRemaining, setNewRemaining]= useState("")


    return(
        <TouchableOpacity
            disabled={true}
            style={styles.container}
            
        >
            <View style={styles.modal} >
            <TouchableOpacity onPress={()=>{closeOff(false,'cancel')}}  >
                <Icon name="close-circle" size={30} style={{color:'#77D199'}}></Icon>
                </TouchableOpacity>
                <Text style={{fontSize:35, textAlign:'center', fontFamily:'OpenSansBold', paddingBottom:50}}>Add Medication</Text>
            <View style={styles.list}>
                <View style={styles.inputs}>
                        <Text style={styles.tags}>Name</Text>
                        <TextInput style={styles.name} placeholder="" onChangeText={(newMedName)=>setNewName(newMedName)} value={newMedName}></TextInput>
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.tags}>Dosage</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput style={[styles.name,{width:70}]} placeholder="" keyboardType="numeric" onChangeText={(newDose)=>setNewDose(newDose)} value={newDose}></TextInput>
                        <Text style={{fontSize:18}}>mg</Text>
                        </View>
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.tags}>Starting Amount</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput style={[styles.name,{width:70}]} placeholder="" keyboardType="numeric"onChangeText={(newRemaining)=>setNewRemaining(newRemaining)} value={newRemaining}></TextInput>
                        
                        </View>
                    </View>
            </View>
               
            <View style={{flexDirection:'row', justifyContent:'center'}}>

            <TouchableOpacity onPress={()=>{closeAndAdd(false,newMedName,newDose,newRemaining)}} style={styles.close} >
                    <Text style={[styles.buttons,{fontSize:20}]}>Add</Text>
                </TouchableOpacity>
                
                
            </View>
            <StatusBar translucent></StatusBar>
            </View>
        </TouchableOpacity>
        
    )
}
export {AddMeds}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
        
    },
    modal:{
        height: HEIGH_MODAL - 380,
        width:WIDTH-30,
        paddingTop:20,
        borderRadius:25,
        backgroundColor:'white',
        padding:20,
        
    },
    close:{
        justifyContent:"flex-end",
        backgroundColor:'#77D199',
        padding:7,
        borderRadius:6
    },
    name:{
        fontSize:25,
        fontFamily:'OpenSansRegular',
        backgroundColor:'#F8f8f8',
        borderRadius:2,
    
    },
    inputs:{
        paddingBottom:30,
        
    },
    list:{
        flex:1
    },
    tags:{
        fontFamily:'OpenSansRegular'
    },
    buttons:{
    
        fontFamily:'OpenSansBold',
        color:'white',
        
    }
})