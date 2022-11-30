import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MyStatusBar from "../component/MyStatusBar";

const CartScreen = (navigator) => {
  return (
    <View style={styles.container}>
      <MyStatusBar />
      <Text>CartScreen</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
