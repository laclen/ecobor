import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet } from "react-native";
import Colors from "../utils/colors";

const MyStatusBar = () => (
  <View style={[styles.statusBar]}>
    <SafeAreaView>
      <StatusBar barStyle={"light-content"} translucent />
    </SafeAreaView>
  </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default MyStatusBar;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: Colors.fadedGreen,
  },
});
