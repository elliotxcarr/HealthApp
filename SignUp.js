import React,{useRef, useState} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, Button, TouchableOpacity} from "react-native";
import useFonts from "./useFonts";
import Icon from 'react-native-vector-icons/Ionicons'
import AppLoading from "expo-app-loading";
import { Formik } from "formik";
import { auth, database } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, } from "firebase/auth";

import { ref, set } from "firebase/database";
export default function SignUp({navigation}){

    const [email, setEmail] = useState('');
    const [initialPassword, setInitPass] = useState('')
    const [password, setPassword] = useState('');
    const [fName, setfName] = useState('')
    const [sName, setsName] = useState('')
    const [dob, setDob] = useState('')
    
    
    const register = ()=>{
        

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           
            const user = userCredential.user;
            console.log(user)
            set(ref(database, 'users/' + user.uid), {
                firstName: fName,
                secondName: sName,
                DoB : dob,
                
              });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
        });
        navigation.navigate('Login', )
        
    };
    

     
    return(
        <View style={styles.container}>
        <StatusBar style='auto'/>
        <Icon name ='arrow-back-outline' size={35} style={{alignSelf:'flex-start', margin:10, color:'white'}} onPress={()=>navigation.navigate('Login')}></Icon>
            <View style={styles.heading}>
            
                <Text style={styles.titleText}>Sign Up</Text>
            </View>
            <View style={styles.form}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TextInput style={[styles.inputField,{width:'45%',}]} placeholder="First Name" value={fName} onChangeText={setfName}></TextInput>
                <TextInput style={[styles.inputField,{width:'45%'}]} placeholder="Last Name" value={sName} onChangeText={setsName}></TextInput>
            </View>
                <TextInput style={styles.inputField} placeholder="Date of Birth" value={dob} onChangeText={setDob}></TextInput>
                <TextInput style={styles.inputField} placeholder="Email Address" value={email} onChangeText={setEmail} ></TextInput>
                <TextInput style={styles.inputField} placeholder="Password" secureTextEntry value ={initialPassword} onChangeText={setInitPass}></TextInput>
                <TextInput style={styles.inputField} placeholder="Confirm Password" secureTextEntry value={password} onChangeText={setPassword}></TextInput>
                <TouchableOpacity style={styles.enterButton} onPress={()=>{password == initialPassword ? register() : alert('Passwords do not match')}}>
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
        flex:0.6,
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