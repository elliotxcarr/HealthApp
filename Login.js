import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, Button, TouchableOpacity, Image} from "react-native";
import useFonts from "./useFonts";
import Icon from 'react-native-vector-icons/Ionicons'
import AppLoading from "expo-app-loading";
import * as SplashScreen from './node_modules/expo-splash-screen'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function Login({navigation}){

    const [loginEmail, setLoginEmail] = useState('')
    const [ loginPassword, setLoginPassword] = useState('')
    
    useEffect(()=>{
        
        auth.onAuthStateChanged(user=>{
            if(user){
                navigation.navigate('Home')
            }
        })
    },[])
    
    const handleLogin = ()=>{
        
       signInWithEmailAndPassword(auth, loginEmail,loginPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('Logged in with' + user.email)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            if(errorCode == 'auth/invalid-email'){
                alert('Incorrect email')
            }else if( errorCode == 'auth/wrong-password'){
                alert('Incorrect password')
            }

            // ..
        });
        
        
    }





    const [IsReady, SetIsReady] = useState(false)
    const LoadFonts = async () => {
        await useFonts();
      };
   
      if(!IsReady){
        return (
            <AppLoading
              startAsync={LoadFonts}
              onFinish={() => {
                SetIsReady(true);
              }}
              onError={console.warn}
            />
          )};
    return(
        <View style={styles.container}>
        <StatusBar backgroundColor={'#77D199'}></StatusBar>
            <View style={styles.heading}>
            <Image source={require('./assets/logo.png')} style={styles.logo}></Image>
                <Text style={styles.titleText}>Log In</Text>
            </View>
            
            <View style={styles.form}>
            
                <TextInput style={styles.inputField} placeholder="Email Address" value ={loginEmail} onChangeText={setLoginEmail}></TextInput>
                <TextInput style={styles.inputField} secureTextEntry placeholder="Password" value ={loginPassword} onChangeText={setLoginPassword}></TextInput>
                
                <TouchableOpacity style={styles.enterButton} onPress={()=>{handleLogin()}}>
                    <Text style={styles.enterText}>Enter</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center', justifyContent:'center', flex:2, flexDirection:'row'}}>
                <Text style={{fontFamily:'OpenSansRegular', fontSize:15,color:'white'}}>New user? </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                <Text style={{fontFamily:'OpenSansSemiBold', fontSize:20, textDecorationLine:'underline', color:'white'}} >Sign Up</Text>

                </TouchableOpacity>
                
                </View> 
                
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
        flex:2,
        justifyContent:'flex-end',
        paddingBottom:50,
        alignItems:'center'
    },
    form:{
        flex:2,
        
    },
    titleText:{
        fontFamily:'OpenSansBold',
        color:'white',
        fontSize:50
    },
    inputField:{
        backgroundColor:'white',
        fontSize:20,
        width:350,
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
        
    },
    logo:{
        width:160,
        height:160,
    marginBottom:10,
    
    }
})