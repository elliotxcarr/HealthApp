import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,TextInput } from "react-native";
import  Icon  from "react-native-vector-icons/Ionicons";
import RadioGroup from 'react-native-radio-buttons-group';
import goalData from "./GoalData";
const WIDTH = Dimensions.get('window').width;
const HEIGH_MODAL = Dimensions.get('window').height;

const AddGoal = (props) => {

    
    

    const closeModal = (bool,data)=>{
        props.changeModalVisible(bool)
        
       }
       const setValue = (value) => {
        var newArray = value.filter((item)=>item.selected===true); //get the items that are selected
        setRadioButtons(newArray[0].value); //set the selected value in this Hook
      };
    
       const radioButtonsData = [
        {
            id: '1',
            label: 'Fitness',
            value: 'Fitness',
            color:'#77D199',
            labelStyle:styles.radioText
        },
        {
            id: '2',
            label: 'Dietary',
            value: 'Dietary',
            color:'#F9BB41',
            labelStyle:styles.radioText
        }
    ];
    const [radioButtons, setRadioButtons] = useState('fitness');
    const closeAndAdd = (bool,newGoalText,newDays,radioButtons)=>{

        function formatDate() {
            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
                console.log(day)
            return [year, month, day].join('-');
        }
        

        props.changeModalVisible(bool);
        console.log(radioButtons)
        goalData.push({
            
            id:goalData.length + 1,
            goal:newGoalText,
            dateStart : formatDate().toString(),
            days: newDays,
            progress:null,
            status: radioButtons
        })
        
    }

    function onPressRadioButton(value) {
        setRadioValue(value);
        
    }
    const [newGoalText, setGoalText] = useState("")
    const [newDays , setDays] = useState("")
    

    return(
        <TouchableOpacity
            disabled={true}
            style={styles.container}>

        <View style={styles.modal}>
        <TouchableOpacity onPress={()=>{closeModal(false,'cancel')}}  >
                <Icon name="close-circle" size={30} style={{color:'#77D199'}}></Icon>
                </TouchableOpacity>
        <Text style={styles.modalTitle}>Add Goal</Text>
        
        
                
                <RadioGroup 
                
                layout="row"
            radioButtons={radioButtonsData} 
            onPress={(value)=> setValue(value)}
             
        />

        <View style={styles.list}>
                <View style={styles.inputs}>
                        <Text style={styles.tags}>What is the daily goal?</Text>
                        <TextInput style={styles.name} placeholder="" onChangeText={(newGoalText)=>setGoalText(newGoalText)} value={newGoalText}></TextInput>
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.tags}>How many days will this goal be set for?</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput style={[styles.name,{width:70}]} placeholder="" keyboardType="numeric" onChangeText={(newDays)=>setDays(newDays)} value={newDays} ></TextInput>
                        
                        </View>
                    </View>
                    
            </View>
            
            <TouchableOpacity  style={styles.close} onPress={()=>closeAndAdd(false, newGoalText,newDays,radioButtons)} >
                    <Text style={{fontSize:20,fontFamily:'OpenSansSemiBold',color:'white'}}>Add</Text>
                </TouchableOpacity>
        </View>
        
            
            
       
        </TouchableOpacity>
    )

    
}
export {AddGoal}

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
    modalTitle:{
        fontFamily:'OpenSansBold',
        fontSize:35,
        paddingBottom:25,
        textAlign:'center'
    },
    radioText:{
        fontFamily:'OpenSansRegular',
        fontSize:18,
        
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
    
    tags:{
        fontFamily:'OpenSansRegular',
        fontSize:16
    },
    list:{
        paddingTop:20
    },
    close:{
        alignItems:'center',
        backgroundColor:'#77D199',
        padding:7,
        borderRadius:6,
        marginTop:20
    },
})