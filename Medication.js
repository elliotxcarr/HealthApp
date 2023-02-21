import React, {useEffect, useState} from "react";
import AppLoading from "expo-app-loading";
import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions,FlatList, Modal, TouchableOpacity, Pressable} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import useFonts from "./useFonts";
import { AddMeds } from "./components/addMeds";
import { BlurView } from "@react-native-community/blur";



var windowWidth = Dimensions.get('window').width;

let medications = [
    {id:1 , name : "Sertraline" , dosage: "50mg", remaining : 12 , icon : "notifications-outline", isRemind : false},
    {id:2 , name : "Flucloxacillin" , dosage: "500mg", remaining : 4 ,icon : "notifications-outline", isRemind : false},
    {id:3 , name : "Amitriptyline" , dosage: "25mg", remaining : 8 ,icon : "notifications-outline", isRemind : false},
 {id:4 , name : "Paracetamol" , dosage: "25mg", remaining : 8 ,icon : "notifications-outline", isRemind : false},
 {id:5 , name : "Sertraline" , dosage: "50mg", remaining : 12 , icon : "notifications-outline", isRemind : false},
   
]
export default function Medication({navigation}){

    
    
    const [IsReady, SetIsReady] = useState(false)
    const [products, setProducts] = useState(medications);
    const [isModalVisible, setModalVisible] = useState(false);
    

    const changeModalVisible = (bool)=>{
        setModalVisible(bool)
    }

    

     const handleChange = (id)=>{
        
        let temp = products.map((product)=>{
            if(id === product.id){
                return{...product, isRemind: !product.isRemind}
            }
        
            return product;

        });
        setProducts(temp)
     }
    
    const LoadFonts = async () => {
        await useFonts();
      };


      const renderFlatlist = (medications)=>{
        return(
            <FlatList
                    data = {medications}
                    style={styles.medList}
                    renderItem ={({item})=> (
                        
                    <View key={item.id} style={styles.medCard}>
                    <Pressable onPress={()=> handleChange(item.id)} >
                        <Icon name={item.isRemind ? 'notifications' : 'notifications-outline'} size={40} style={styles.bellIcon} color={'#77D199'}  />
                    
                        </Pressable>    
                    <View style={styles.medLabel}>
                        <Text style={styles.medText}>{item.name}</Text>
                        <Text style={styles.medDose}>{item.dosage}</Text>
                    </View>
                    <View style={styles.endSec}>
                        <Text style={styles.remainingText}>{item.remaining}</Text>
                        <Text style={styles.remainingUnder}>remaining</Text>
                    </View>
                    
                    </View>

                    
                    )}
                    />
        )
      }



   
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
            <View style={styles.container} >
                <View style= {styles.toolbar}>
                   
                    
                    <Text style={styles.titleText}>Medication</Text>
                    <StatusBar style='auto'/>
                    
                </View>
                
                    
                    
               
                <View style={{flex:1}}>
               
               {renderFlatlist(products)} 
              
               </View>
                
               
               <View style={styles.addButton}>
                        <Icon name='add' size={57} style={styles.button} onPress={()=>changeModalVisible(true)} ></Icon>
                    </View>

                <BlurView></BlurView>
                <Modal
                transparent ={true}
                animationType={"slide"}
                visible={isModalVisible}
                nRequestClose={()=>changeModalVisible(false)}
                avoidKeyboard={true}
                >
                    <AddMeds
                        changeModalVisible={changeModalVisible}
                        setData={setData}

                    />
                </Modal>
                
                <View style={styles.menuBar}>
      
                    <Icon name="person" size={37} color={"white"}></Icon>
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
        position:'absolute',
        paddingTop:40,
        
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
        

    },
    titleText:{
        fontSize:40,
        fontFamily:'OpenSansBold',
        color:'white'
    },
    
    
    
    
    medList:{
        
        top:130,
        
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
      addButton:{
        flex:0.3,
        position:'relative',
        alignItems:'center',
        paddingTop:50
       

      },
      button:{
        
        backgroundColor:'white',
        borderRadius:55,
        padding:6,
        
        
      },
      medCard:{
        width: windowWidth - 20,
        height: 100,
        backgroundColor:'white',
        
        alignSelf:'center',
        
        borderRadius:30,
        elevation:2,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    medText:{
        alignSelf:'flex-start',
        fontFamily:'OpenSansRegular',
        fontSize:30,
        
    },
    medLabel:{
        
        paddingLeft:10,
        flex:2,
    },
    medDose:{
        alignSelf:'flex-start',
        fontFamily:'OpenSansRegular',
        fontSize:20,
        color:'gray'
        
    },
    endSec:{
        padding:0,
        flex:1,       
        alignItems:'center',
        
    },
    remainingText:{
        fontSize:30
    },
    remainingUnder:{
        alignSelf:'center'
    },
    bellIcon:{
        paddingLeft:20,
        flex:0.5
        
    }
      


});
