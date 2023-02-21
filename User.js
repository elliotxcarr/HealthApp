import React, { useState } from "react";
import { Dimensions, StyleSheet , View, Text,} from "react-native";
import { Icon } from "react-native-vector-icons/Ionicons";

var windowWidth = Dimensions.get("window").width 

export default class User extends React.Component(props){

    // let[id,setId] = useState(props.id)
    // let [name, setName] = useState(props.name)
    // let [dosage, setDosage] = useState(props.dosage)
    // let [remaining, setRemaining] = useState(props.remaining)
    // let [isRemind, setIsRemind] = useState(props.isRemind)
    
    
    constructor(props){
        super(props)
        this.state = {
            id : props.id,
            name : props.name,
            dosage : props.dosage,
            remaining : props.remaining,
            isRemind : props.isRemind
        }
    }
        
    
    


    render(){
        return(
            <View style={styles.medCard}>
                    
                    <Icon name={this.state.isRemind} size={40} style={styles.bellIcon} color={'#77D199'} />
                    <View style={styles.medLabel}>
                        <Text style={styles.medText}>{this.state.name}</Text>
                        <Text style={styles.medDose}>{this.state.dosage}</Text>
                    </View>
                    <View style={styles.endSec}>
                        <Text style={styles.remainingText}>{this.state.remaining}</Text>
                        <Text style={styles.remainingUnder}>remaining</Text>
                    </View>
                    
                    
                </View>
        )
    
}
}



const styles = StyleSheet.create({
    medCard:{
        width: windowWidth - 20,
        height: 100,
        backgroundColor:'white',
        top:-50,
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
})

