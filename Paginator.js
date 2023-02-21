import React from "react";
import { View, Animated, StyleSheet,useWindowDimensions } from "react-native";


export default Paginator = ({data, scrollX})=>{
    const {width} = useWindowDimensions()
    return(
        <View style={{flexDirection:'row', height:64}}>
            {data.map((_,i)=>{
                const inputRange = [(i-1) * width, i*width, (i+1)*width]

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange :[15,30,15],
                    extrapolate:'clamp'
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange :[0.3,1,0.3],
                    extrapolate:'clamp',
                

                })
                return <Animated.View style={[styles.dot,{width:dotWidth, opacity}]} key ={i.toString()}></Animated.View>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    dot:{
        height:15,
        borderRadius:7,
        backgroundColor:'#77D199',
        marginHorizontal:8,
        
    }
})