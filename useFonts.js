import * as Font from "expo-font";
 
export default useFonts = async () =>

  await Font.loadAsync({
        OpenSansBold: require('./assets/Fonts/OpenSans-Bold.ttf'),
        OpenSansLight: require('./assets/Fonts/OpenSans-Light.ttf'),
        OpenSansRegular: require('./assets/Fonts/OpenSans-Regular.ttf'),
        OpenSansSemiBold: require('./assets/Fonts/OpenSans-SemiBold.ttf')
  });