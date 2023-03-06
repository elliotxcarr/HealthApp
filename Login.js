import React,{useState} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, Button, TouchableOpacity} from "react-native";
import useFonts from "./useFonts";
import Icon from 'react-native-vector-icons/Ionicons'
import AppLoading from "expo-app-loading";
import * as SplashScreen from './node_modules/expo-splash-screen'
 
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function Login({navigation}){

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
        <StatusBar style='auto' />
            <View style={styles.heading}>
                <Text style={styles.titleText}>Log In</Text>
            </View>
            
            <View style={styles.form}>
            
                <TextInput style={styles.inputField} placeholder="Email Address" ></TextInput>
                <TextInput style={styles.inputField} placeholder="Password" ></TextInput>
                
                <TouchableOpacity style={styles.enterButton} onPress={()=>{navigation.navigate('Home')}}>
                    <Text style={styles.enterText}>Enter</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center', justifyContent:'center', flex:2, flexDirection:'row'}}>
                <Text style={{fontFamily:'OpenSansRegular', fontSize:15,color:'white'}}>New user? </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp') }}>
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
        flex:1,
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
        
    }
})