import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const WelcomeScreen = (navigator) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={styles.imageWrapper}
        imageStyle={styles.image}
      />

      <View style={styles.nextButtonWrapper}>
        <TouchableOpacity
          onPress={() => navigator.navigation.navigate("Login")}
        >
          <MaterialIcons name="navigate-next" size={54} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageWrapper: {
    flex: 1,
    width: "80%",
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nextButtonWrapper: {
    flex: 0.09,
    alignItems: "flex-end",
    width: "100%",
    height: "20%",
    paddingBottom: 20,
    paddingRight: 10,
  },
});
