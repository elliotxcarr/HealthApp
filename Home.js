import React, { useEffect, useRef, useState, useCallback, Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Video, Audio} from "expo-av";

import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import useFonts from "./useFonts";
import * as Font from "expo-font";
import { auth, database } from "./firebase";
import { onValue, ref } from "firebase/database";
import registerNNPushToken from "native-notify";

const factsApi =
  "https://health.gov/myhealthfinder/api/v3/itemlist.json?Type=topic";
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function Home({ navigation }) {




  registerNNPushToken(6813, "v7d0uboRutxTFJIBN9iBtV");

  const [fontsloaded, setFontsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [currentFName, setCurrentFName] = useState("");
  const progress = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const factsArray = [];


  const [sound, setSound] = useState(new Audio.Sound())

  useEffect(()=>{
    Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        
        playsInSilentModeIOS:true,
        shouldDuckAndroid:true,
        staysActiveInBackground:true,
       
    })
    sound.loadAsync(require('./assets/Select.mp3'))
    
},[])

const status = { shouldPlay:false};



const playSound=()=>{
    sound.playAsync();
    sound.setPositionAsync(0)
}


  const handleSignout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    fetch(factsApi)
      .then((response) => response.json())
      .then((json) => {
        setData(json.Result.Items.Item);
      })
      .catch((error) => alert(error));
  }, []);

  data.map((item, index) => {
    factsArray.push(data[index].Title);
  });

  function MyComponent() {
    const [newName, setnewName] = useState("");

    const shuffle = useCallback(() => {
      const index = Math.floor(Math.random() * factsArray.length);
      setnewName(factsArray[index]);
    }, []);

    useEffect(() => {
      const intervalID = setInterval(shuffle, 7000);
      return () => clearInterval(intervalID);
    }, [shuffle]);

    return <Text style={styles.speechText}>{newName}</Text>;
  }

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      useNativeDriver: false,
      duration: 800,
      delay: 7000,
    }).start();
    Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: false,
      duration: 800,
      delay: 9000,
    }).start();
  }, []);

  useEffect(() => {
    const currentUser = auth.currentUser.uid;

    const starCountRef = ref(database, "users/" + currentUser);
    onValue(starCountRef, (snapshot) => {
      const item = snapshot.val();
      setCurrentFName(item.firstName);
      console.log(currentFName);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require("./assets/avatar.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        style={styles.backgroundVideo}
      />
      <StatusBar style="auto" />
      <View style={styles.title}>
        <Text style={styles.titleText}>Welcome {currentFName}!</Text>
        <Icon
          name="log-out"
          style={styles.profile}
          size={45}
          onPress={() => {
            handleSignout();
          }}
        ></Icon>
        <Icon name="settings" style={styles.profile} size={45}></Icon>
      </View>

      <Animated.View
        style={[
          styles.speechBubble,
          { opacity: progress, transform: [{ scale }] },
        ]}
      >
        <ImageBackground
          source={require("./assets/speech.png")}
          style={{ width: 250, height: 130 }}
        >
          <MyComponent />
        </ImageBackground>
      </Animated.View>
      <View style={styles.buttons}>
        <TouchableOpacity>
          <Text
            style={styles.buttonText}
            onPress={() => {navigation.navigate("DailyCheck");playSound()}}
          >
            Daily Check
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.buttonText}
            onPress={() => {navigation.navigate("Medication");playSound()}}
          >
            Medication
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.buttonText}
            onPress={() => {navigation.navigate("Goals");playSound()}}
          >
            Goals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.buttonText}
            onPress={() => {navigation.navigate("Vitals");playSound()}}
          >
            Vitals
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#77D199",
  },

  backgroundVideo: {
    position: "absolute",
    width: 389,
    top: 0,
    left: 20,
    bottom: 0,
    right: 0,
  },
  title: {
    width: "100%",
    paddingLeft: 25,
    justifyContent: "flex-start",
    flex: 3,
    paddingTop: 50,
  },
  titleText: {
    fontFamily: "OpenSansBold",
    fontSize: 55,
    color: "white",
  },
  buttons: {
    width: 200,
    flex: 8,
    top: 130,
    alignContent: "center",
  },
  buttonText: {
    fontFamily: "OpenSansRegular",
    backgroundColor: "#77D199",
    fontSize: 30,
    justifyContent: "center",
    height: 60,
    paddingLeft: 20,
    marginTop: 30,
    paddingTop: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    color: "white",
  },
  speechBubble: {
    flex: 0.2,
    alignItems: "flex-start",
    paddingLeft: 35,
  },
  speechText: {
    fontFamily: "OpenSansRegular",
    fontSize: 15,
    padding: 10,
    alignSelf: "center",
  },
  profile: {
    alignSelf: "flex-end",
    color: "white",
    backgroundColor: "#77D199",
    padding: 5,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingRight: 15,
    bottom: 40,
    marginBottom: 25,
  },
});
