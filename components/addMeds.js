import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, TextInput, StatusBar,} from "react-native";

const WIDTH = Dimensions.get('window').width;
const HEIGH_MODAL = Dimensions.get('window').height;

const AddMeds = (props)=>{

     closeModal = (bool,data)=>{
        props.changeModalVisible(bool);
        props.setData(data)
    }
    return(
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        
        >
            <View style={styles.modal} >
                <Text style={{fontSize:40, textAlign:'center', fontFamily:'OpenSansBold', paddingBottom:50}}>Add Meds</Text>
            <View style={styles.list}>
                <View style={styles.inputs}>
                        <Text style={styles.tags}>Name</Text>
                        <TextInput style={styles.name} placeholder=""></TextInput>
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.tags}>Dosage</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput style={[styles.name,{width:70}]} placeholder="" keyboardType="numeric"></TextInput>
                        <Text style={{fontSize:18}}>mg</Text>
                        </View>
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.tags}>Starting Amount</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput style={[styles.name,{width:70}]} placeholder="" keyboardType="numeric"></TextInput>
                        
                        </View>
                    </View>
            </View>
               
            <View style={{flexDirection:'row', justifyContent:'center'}}>

            <TouchableOpacity onPress={()=>{closeModal(false,'cancel')}} style={styles.close} >
                    <Text style={[styles.buttons,{fontSize:25}]}>Add</Text>
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
        
    },
    modal:{
        height: HEIGH_MODAL - 80,
        width:WIDTH-30,
        paddingTop:50,
        borderRadius:30,
        backgroundColor:'white',
        padding:20,
        
    },
    close:{
        justifyContent:"flex-end",
        backgroundColor:'#77D199',
        padding:10,
        borderRadius:15
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