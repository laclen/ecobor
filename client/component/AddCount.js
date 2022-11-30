import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "../utils/colors";
const AddCount = (props) => {
  const [addCount, setAddCount] = React.useState(0);
  const incrementCount = () => setAddCount(addCount + 1);
  const decrementCount = () => setAddCount(addCount - 1);

  return (
    <View style={styles.addCount}>
      <TouchableOpacity
        style={styles.minusSymbol}
        onPress={addCount !== 0 ? decrementCount : null}
      >
        <Text style={{ fontSize: 16 }}>-</Text>
      </TouchableOpacity>

      <Text style={styles.addCountText}>
        <Text>{addCount}</Text>
      </Text>
      <TouchableOpacity
        style={styles.plusSymbol}
        onPress={addCount !== props.stock ? incrementCount : null}
      >
        <Text style={{ fontSize: 16 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCount;

const styles = StyleSheet.create({
  addCount: {
    flexDirection: "row",
    justifyContent: "center",

    borderRadius: 360,

    backgroundColor: Colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,

    width: wp("11%"),
    height: wp("11%"),

    alignItems: "center",
    marginHorizontal: wp("3%"),
  },
  minusSymbol: {
    borderRadius: 360,

    backgroundColor: Colors.white,

    width: wp("6%"),
    height: wp("6%"),

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  addCountText: {
    fontSize: 22,
    marginHorizontal: wp("2%"),
  },
  plusSymbol: {
    borderRadius: 360,

    backgroundColor: Colors.white,

    width: wp("6%"),
    height: wp("6%"),

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
});
