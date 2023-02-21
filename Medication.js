import React, {useEffect, useState} from "react";
import AppLoading from "expo-app-loading";
import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions,FlatList, Modal, TouchableOpacity, Pressable} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import useFonts from "./useFonts";
import { AddMeds} from "./components/addMeds";

import medicationData from "./components/MedicationData";
import { MedInfo } from "./components/medInfo";

var windowWidth = Dimensions.get('window').width;


   

export default function Medication({navigation}){

    
    const [chooseData, setChooseData] = useState()
    const [IsReady, SetIsReady] = useState(false)
    const [products, setProducts] = useState(medicationData);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isViewInfoVis, setIsViewInfo] = useState(false);

    const changeModalVisible = (bool)=>{
        setModalVisible(bool)
    }
    const changeInfoVisible=(bool,data)=>{
        setIsViewInfo(bool)
        
    }

    const sendData= (data)=>{
        setChooseData(data)
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
                    extraData={medicationData}
                    renderItem ={({item})=> (
                    
                    <View key={item.id} style={styles.medCard} >
                    <Pressable onPress={()=> handleChange(item.id)} >
                        <Icon name={item.isRemind ? 'notifications' : 'notifications-outline'} size={40} style={styles.bellIcon} color={'#77D199'}  />
                    
                        </Pressable>    
                    <View style={styles.medLabel} >
                    <Pressable onPress={()=>{changeInfoVisible(true);sendData({item})}}>
                    <Text style={styles.medText}>{item.name}</Text>
                        <Text style={styles.medDose}>{item.dosage}</Text>
                    </Pressable>
                        
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
                <Modal
                transparent={true}
                animationType={'fade'}
                visible={isViewInfoVis}
                nRequestClose={()=>changeInfoVisible(false)}
                avoidKeyboard={true}>
                    <MedInfo changeInfoVisible={changeInfoVisible} data={chooseData}/>
                </Modal>
               
               <View style={styles.addButton}>
                        <Icon name='add' size={57} style={styles.button} onPress={()=>changeModalVisible(true)} ></Icon>
                    </View>

                
                <Modal
                transparent ={true}
                animationType={"slide"}
                visible={isModalVisible}
                nRequestClose={()=>changeModalVisible(false)}
                avoidKeyboard={true}
                >
                    <AddMeds
                        changeModalVisible={changeModalVisible}
                        

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
        
        position:'relative',
        flex:0.2,
        alignItems:'flex-end',
        
        padding:10,
        

      },
      button:{
        
        backgroundColor:'white',
        borderRadius:55,
        padding:6,
        elevation:3
        
      },
      medCard:{
        width: windowWidth - 20,
        height: 100,
        backgroundColor:'white',
        
        alignSelf:'center',
        
        borderRadius:15,
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
