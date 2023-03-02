import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal  } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import GoalData from "./components/GoalData";
import AnimatedProgressWheel from 'react-native-progress-wheel'
import { AddGoal } from "./components/addGoal";

var width = Dimensions.get("window").width



const listTab = [
    {
        status: 'All'
    },
    {
        status:'Fitness'
    },
    {
        status:'Dietary'
    }
]



export default function Goals({navigation}){

    const [data, setData] = useState(GoalData);
    const [dataList, setDataList] = useState(data)
    const [status,setStatus] = useState('All')
    const [isModalVisible, setModalVisible] = useState(false);


    const setStatusFilter = status =>{
        if(status !== 'All'){
            setDataList([...data.filter(e=> e.status === status)])
        }else{
            setDataList(data)
        }
        setStatus(status)
    }

    const changeModalVisible = (bool)=>{
        setModalVisible(bool)
    }

    const calculateProgress= (date,days)=>{
        
        var endDate = new Date(date);
        var today = new Date();
        var oneDay = 24 * 60 * 60 * 1000;
        

        return(

             (Math.round(Math.abs((today.getTime() - endDate.getTime())/ oneDay))) / days *100
            
             );
    }
    const daysRemain = (date,days)=>{
        var endDate = new Date(date);
        var today = new Date();
        var oneDay = 24 * 60 * 60 * 1000;
        return( days - (Math.round(Math.abs((today.getTime() - endDate.getTime())/ oneDay)))
        )
    }

    const formatDate = (date) =>{

        
        var day = date.slice(8,10)
        var month = date.slice(5,7)
        var year = date.slice(0,4)
        return(
            day + " / " + month + " / " + year
        )
        
    }



    const renderItem = ({item,index})=>{
        return(
            
                <View key={index} style={styles.card}>
                <Text style={styles.goalTitle}>{item.goal}</Text>
                <View style={{flexDirection:'row'}}>

                
                <View style={styles.wheel}>
                    <AnimatedProgressWheel 
                    
                    size={180} 
                    width={35} 
                    
                    color={item.status =='Fitness' ? '#77D199' : '#F9BB41'}
                    animateFromValue={0}
                    duration={2000}
                    progress={calculateProgress(item.dateStart,item.days)}
                    
                    backgroundColor={item.status == 'Fitness'  ? '#C3EAD7' : '#EFDBB4'}
                />
                
                    <Text style={{position:'absolute', top:'50%', fontFamily:'OpenSansSemiBold', fontSize:23}}>{Math.round(calculateProgress(item.dateStart,item.days))} %</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.target}>Days Remaining:</Text>
                        <Text style={ {fontSize:25,alignSelf:'center',paddingBottom:20, fontFamily:'OpenSansSemiBold'}}>{daysRemain(item.dateStart, item.days)}</Text>
                        
                        <Text style={styles.target}>Started:</Text>
                        <Text style={{fontSize:20,alignSelf:'center', fontFamily:'OpenSansSemiBold'}}>{formatDate(item.dateStart)}</Text>
                        
                    </View>
                </View>
                
                </View>
                
        )
    }

    

    return(
    <View style={styles.container}>
    <View style= {styles.toolbar}>
        <StatusBar style='auto'></StatusBar>
           
          <Text style={styles.titleText}>Goals</Text>
          <TouchableOpacity style={styles.addButton} onPress={()=>{changeModalVisible(true)}}>
            <Icon name='add' size={50} color='white'></Icon>
          </TouchableOpacity>
          
          
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around',}}>
        {listTab.map((e, index)=> (
            <TouchableOpacity key={index} style={[styles.btnTab ,  status === e.status && styles.activeButton]} onPress={()=>{setStatusFilter(e.status)}}>
            <Text style={[styles.tabText,[styles.inactiveText ,  status === e.status && styles.activeText]]} >{e.status}</Text>
            </TouchableOpacity>
        ))}
            
            
        </View>

        <FlatList
        data={dataList}
        keyExtractor ={ (e,i) => i.toString()}
        renderItem={renderItem}>

        </FlatList>
      <TouchableOpacity>
        <Icon name={'add'} size={57}></Icon>
      </TouchableOpacity>
      
      <Modal
                transparent ={true}
                animationType={"fade"}
                visible={isModalVisible}
                nRequestClose={()=>changeModalVisible(false)}
                avoidKeyboard={true}
                >
                    <AddGoal
                        changeModalVisible={changeModalVisible}
                        

                    />
                </Modal>

      <View style={styles.menuBar}>
            <Icon name="person" size={37} color={"white"} ></Icon>
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
        height:160,
        alignItems:'center',
        marginBottom:-40,
        paddingTop:40,
       
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
  

    },
    titleText:{
        fontSize:40,
        fontFamily:'OpenSansBold',
        color:'white'
    },
    card:{
        height:280,
        width: width-10,
        alignSelf:'center',
        alignItems:'flex-start',
        borderRadius:20,
        backgroundColor:'white',
        
       marginBottom:10,
       
        
        
    },
    inactiveText:{
        
        fontFamily:'OpenSansRegular',
        fontSize:17,
        color:'white',
        
        
        
    },
    btnTab:{
        flexDirection:'row',
         width:110,
          top:-10,
          padding:10,
          alignItems:'center',
          justifyContent:'center',
          
          
          
    },
    activeButton:{
        backgroundColor:'#6AB687',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        
    },
    menuBar:{
        width:'100%',
        height:57,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        bottom:0,
        position:'absolute',
        flexDirection:'row',
        backgroundColor:'#77D199',
        justifyContent:'space-around',
        alignItems:"center"
      },
      activeText:{
        fontSize:20,
        fontFamily:'OpenSansSemiBold',
        alignSelf:'center'
      },
      wheel:{
        alignItems:'center',
        padding:15

      },
      goalTitle:{
        fontFamily:'OpenSansSemiBold',
        fontSize:27,
        alignSelf:'center',
        paddingTop:10,
        paddingBottom:10
      },
      info:{
        paddingTop:20,
        paddingLeft:20
       
      },
      target:{
        fontFamily:'OpenSansRegular',
        paddingBottom:4,
        fontSize:16
      },
      addButton:{
        position:'absolute',
        right:20,
        top:40
      }
})