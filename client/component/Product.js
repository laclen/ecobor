import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native-paper";

const Product = (props) => {
  const [isFavToggled, setIsFavToggled] = React.useState(false);
  const [iconName, setIconName] = React.useState("heart-outline");
  const [iconColor, setIconColor] = React.useState("black");

  useEffect(() => {
    if (isFavToggled) {
      setIconName("heart-sharp");
      setIconColor("#b70000");
    } else {
      setIconName("heart-outline");
      setIconColor("black");
    }
  }, [isFavToggled]);

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Product", { productId: props._id })
      }
    >
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: props.image }}
          resizeMode="contain"
          style={styles.imageWrapper}
          imageStyle={styles.image}
        >
          <Ionicons
            name={iconName}
            size={22}
            color={iconColor}
            style={styles.favIcon}
            onPress={() => {
              setIsFavToggled(!isFavToggled);
            }}
          />
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{props.name}</Text>
          {props.stock <= 3 ? (
            <Text style={styles.stock}>Sadece {props.stock} tane kaldı!</Text>
          ) : null}
          <Text style={styles.price}>{props.price}₺</Text>
        </View>

        <Text style={styles.description}>
          {props.description.length < 60
            ? props.description
            : props.description.slice(0, 60) + "..."}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 160,
    maxHeight: 400,
    marginVertical: 10,
    marginHorizontal: 5,

    backgroundColor: "white",

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,

    borderRadius: 8,
  },
  imageWrapper: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "flex-end",
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  stock: {
    fontSize: 11,
    paddingHorizontal: 10,
    color: Colors.redA700,
  },
  description: {
    fontSize: 14,
    fontStyle: "italic",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  infoContainer: {
    justifyContent: "space-between",
    marginTop: 5,
  },
  favIcon: {
    margin: 10,
  },
});

export default Product;
