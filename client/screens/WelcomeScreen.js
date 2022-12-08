import {
  StyleSheet,
  Appearance,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import React from "react"
import { MaterialIcons } from "@expo/vector-icons"
import MyStatusBar from "../component/MyStatusBar"
import Colors from "../utils/colors"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

const colorScheme = Appearance.getColorScheme()

const WelcomeScreen = (navigator) => {
  console.log("colosrScheme: " + colorScheme)
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={styles.container}>
        <ImageBackground
          source={
            colorScheme === "dark"
              ? require("../assets/logoDark.png")
              : require("../assets/logo.png")
          }
          resizeMode="contain"
          style={styles.imageWrapper}
          imageStyle={styles.image}
        />

        <View style={styles.nextButtonWrapper}>
          <TouchableOpacity
            onPress={() => navigator.navigation.navigate("Login")}
          >
            <MaterialIcons
              name="navigate-next"
              size={54}
              color={
                colorScheme === "dark" ? Colors.liveGreen : Colors.niceBlack
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colorScheme === "dark" ? Colors.fadedBlack : null,
  },
  imageWrapper: {
    // backgroundColor: "red",

    flex: 1,
    width: wp("80%"),
    height: wp("80%"),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nextButtonWrapper: {
    flex: 0.15,
    alignItems: "flex-end",
    width: "100%",
    height: "20%",
    paddingBottom: hp("1.5%"),
    paddingRight: wp("5%"),
    backgroundColor: colorScheme === "dark" ? Colors.fadedBlack : null,
  },
})
