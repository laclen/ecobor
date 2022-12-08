import React, { useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/colors";
import { AirbnbRating } from "react-native-ratings";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import * as CustomerActions from "../redux/customerSlice";

const Product = (props) => {
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.customer.customer);
  const customerId = customer._id;
  const customerFavorites = customer.favorites;

  const inFavorites =
    customerFavorites.indexOf(props._id) === -1 ? false : true;

  const [isFavToggled, setIsFavToggled] = React.useState(inFavorites);
  const [iconName, setIconName] = React.useState("heart-outline");
  const [iconColor, setIconColor] = React.useState("black");

  useLayoutEffect(() => {
    if (isFavToggled) {
      setIconName("heart-sharp");
      setIconColor("#b70000");
    } else {
      setIconName("heart-outline");
      setIconColor("black");
    }

    // dispatch(CustomerActions.updateFavorites(customerId, props._id));
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
          <View style={styles.favStockWrapper}>
            <View style={styles.favWrapper}>
              <Ionicons
                name={iconName}
                size={22}
                color={iconColor}
                style={styles.favIcon}
                onPress={() => {
                  setIsFavToggled(!isFavToggled);
                }}
              />
            </View>
          </View>
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text numberOfLines={2} style={styles.name}>
            {props.name}
          </Text>

          <View style={styles.ratingWrapper}>
            <AirbnbRating showRating={false} size={12} />
          </View>

          <Text style={styles.price}>{props.price}₺</Text>
          <View style={styles.stockCard}>
            {props.stock <= 3 ? (
              <Text
                style={
                  Platform.OS === "ios" ? styles.stock : styles.stockAndroid
                }
              >
                Sadece {props.stock} adet kaldı!
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("45%"),
    height: hp("45%"),
    marginVertical: hp("3%"),
    marginBottom: -hp("1%"),
    marginHorizontal: wp("1%"),
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
    height: hp("22.5%"),
    borderRadius: 10,
  },
  favStockWrapper: {
    flex: 1,

    paddingHorizontal: "0.5%",
    paddingTop: hp("0.1%"),
    flexDirection: "column",
  },

  favWrapper: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  favIcon: {
    margin: wp("1%"),
    justifyContent: "flex-end",
    opacity: 0.6,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
    height: "100%",
    marginTop: hp("2%"),
  },
  infoContainer: {
    // backgroundColor: "blue",

    marginTop: hp("2.25%"),
    height: hp("20%"),
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  ratingWrapper: {
    alignItems: "flex-start",
    paddingHorizontal: 9,
  },
  price: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: Colors.darkGreen,
  },
  stockCard: {
    // backgroundColor: "green",

    alignItems: "flex-end",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  stock: {
    fontSize: 11,
    paddingHorizontal: 10,
    color: Colors.red,
    marginTop: hp("5%"),
  },
  stockAndroid: {
    fontSize: 11,
    paddingHorizontal: 10,
    color: Colors.red,
    marginTop: hp("2%"),
  },
});

export default Product;
