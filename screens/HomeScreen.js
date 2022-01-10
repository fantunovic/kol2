import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import * as Google from "expo-google-app-auth";

export function HomeScreen({ route, navigation }) {

const handleGoogleSignIn = () => {
  const config ={
    iosClientId: "43210928779-2cpp01ggda8uauqkkbuh6dvne9008veq.apps.googleusercontent.com",
    androidClientId: "43210928779-67ummr81diqbv4h722e4bkmniqu0qsmf.apps.googleusercontent.com",
    scope: ["profile", "email"]
  };
  Google.logInAsync(config).then((result)=>{
    const{type, user} = result;
    if (type == "success") {
      const {email, name} = user;
      console.log("SignIn Successfull");
      setTimeout(()=> navigation.navigate("Settings", {email, name}), 1000)
    }else{
      console.log("SignIn Failed")
    }
  }).catch((error)=>{console.log("Error")})
}

  function handleSettingsPress() {
    navigation.navigate("Settings");
  }

  return (
    <View style={styles.screen}>
      <Text>The Home Screen!</Text>
      <View style={styles.button}>
      <Button
        title="Google SignIn"
        onPress={handleGoogleSignIn}
     
      />
    </View>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    width: 200,
    height: 200
  }
});
