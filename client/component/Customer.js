import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Customer = (props) => {
  const { fullName, email, password, phoneNumber, address } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fullname: {fullName}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Password: {password}</Text>
      <Text style={styles.text}>Mobile phone: {phoneNumber}</Text>
      <Text style={styles.text}>Address: {address}</Text>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({
   container: {
      padding: 15,
   }
});
