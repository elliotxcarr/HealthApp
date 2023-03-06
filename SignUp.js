import React,{useState} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, Button, TouchableOpacity} from "react-native";
import useFonts from "./useFonts";
import Icon from 'react-native-vector-icons/Ionicons'
import AppLoading from "expo-app-loading";

export default function SignUp({navigation}){

    const [IsReady, SetIsReady] = useState(false)
    const LoadFonts = async () => {
        await useFonts();
      };
   
     
    return(
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.titleText}>Sign Up</Text>
            </View>
            <View style={styles.form}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TextInput style={[styles.inputField,{width:'45%',}]} placeholder="First Name" ></TextInput>
                <TextInput style={[styles.inputField,{width:'45%'}]} placeholder="Last Name" ></TextInput>
            </View>
                <TextInput style={styles.inputField} placeholder="Date of Birth" ></TextInput>
                <TextInput style={styles.inputField} placeholder="Email Address" ></TextInput>
                <TextInput style={styles.inputField} placeholder="Password" ></TextInput>
                <TextInput style={styles.inputField} placeholder="Confirm Password" ></TextInput>
                <TouchableOpacity style={styles.enterButton} onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={styles.enterText}>Confirm</Text>
                </TouchableOpacity>
            </View>

       
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        
        backgroundColor:'#77D199'
    },
    heading:{
        flex:0.7,
        justifyContent:'flex-end',
        paddingBottom:50
    },
    form:{
        flex:2,
        
    },
    titleText:{
        fontFamily:'OpenSansSemiBold',
        color:'white',
        fontSize:50
    },
    inputField:{
        backgroundColor:'white',
        fontSize:20,
        width:380,
        height:50,
        borderRadius:10,
        marginBottom:20,
        paddingLeft:10
    },
    enterButton:{
        alignItems:'center',
        backgroundColor:'#5ead7c',
        borderRadius:10
    },
    enterText:{
        fontFamily:'OpenSansSemiBold',
        fontSize:25,
        color:'white',
        
    }
})