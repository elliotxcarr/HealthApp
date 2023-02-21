import { useRef, useState, useEffect } from "react";
import { StyleSheet,Text } from "react-native";

export default function AnimatedTyping(props){
    let [text, setText] = useState("");
    let [messageIndex, setMessageIndex] = useState(0);
    let[textIndex, setTextIndex]= useState(0);
    let [timeouts, setTimeouts] = useState({
        typingTimeout : undefined,
        firstNewLineTimeout : undefined,
        secondNewLineTimeout : undefined
    });

    let textRef = useRef(text);
    textRef.current = text;

    let messageRef = useRef(messageIndex);
    messageRef.current = messageIndex;

    let textIndexRef = useRef(textIndex);
    textIndexRef.current = textIndex;

    let timeoutsRef = useRef(timeouts);
    timeoutsRef.current = timeouts;



    let typingAnimation = ()=>{
        if(textIndexRef.current < props.text[messageRef.current].length){
            setText(textRef.current + props.text[messageRef.current].charAt(textIndexRef.current));
            setTextIndex(textIndexRef.current + 1);

            let updatedTimeouts = { ...timeoutsRef.current};
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation,20);
            setTimeouts(updatedTimeouts)
        }else if( messageRef.current + 1 < props.text.length){
            setMessageIndex(messageRef.current + 1);
            setTextIndex(0);

            let updatedTimeouts = {...timeoutsRef.current};
            updatedTimeouts.firstNewLineTimeout = setTimeouts(newLineAnimation, 120);
            updatedTimeouts.secondNewLineTimeout = setTimeout(newLineAnimation, 200);
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation,280);
            setTimeouts(updatedTimeouts)

        }else{
            if(props.onComplete){
                props.onComplete();
            }
        }
    };

    let newLineAnimation = ()=>{
        setText(textRef.current );
    };

    useEffect(()=>{
        let updatedTimeouts = {...timeoutsRef.current};
        updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
       setTimeouts(updatedTimeouts);

       return ()=>{
        clearTimeout(timeoutsRef.current.typingTimeout);
        clearTimeout(timeoutsRef.current.firstNewLineTimeout);
        clearTimeout(timeoutsRef.current.secondNewLineTimeout);
       }
    },[]);

    return(
        <Text style={styles.tips}>{text}</Text>
    )
}

const styles = StyleSheet.create({

    tips:{
        alignSelf:'center',
        padding:15,
        fontSize:17
      }
      
})