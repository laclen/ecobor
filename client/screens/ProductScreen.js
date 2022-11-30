import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../redux/productSlice";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { AirbnbRating } from "react-native-ratings";
import Colors from "../utils/colors";
import AddCount from "../component/AddCount";
import MyStatusBar from "../component/MyStatusBar";

const ProductScreen = ({ route, navigation }) => {
  const id = route.params.productId;

  // we need the products array from redux storage
  // to get the selected item's props
  const dataStatus = useSelector((state) => state.product.status);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(productActions.fetchData());
    }
  }, [dispatch]);

  // get the products array, derive the chosen item and props through its productId
  const products = useSelector((state) => state.product.products);
  const product = products.find((item) => item._id === id);
  const { description, image, name, price, stock } = product;
  const imageURI = { uri: image };

  // to prevent extra printing of long texts
  const [numberOfLines, setNumberOfLines] = React.useState(3);
  const toggleReadMore = () => {
    numberOfLines !== undefined
      ? setNumberOfLines(undefined)
      : setNumberOfLines(3);
  };

  // to control scrollToEnd after "read more" button pressed
  const scrollViewRef = React.useRef();
  const scrollToBottom = () => {
    setTimeout(() => scrollViewRef.current.scrollToEnd(), 200);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
      <MyStatusBar />
      <ImageBackground
        resizeMode="cover"
        style={styles.imageWrapper}
        imageStyle={styles.image}
        source={imageURI}
      >
        <View style={styles.ratingWrapper}>
          <AirbnbRating showRating={false} size={18} />
        </View>

        <View style={styles.commentNumWrapper}>
          <Text style={styles.commentNum}>24</Text>
        </View>

        <View style={styles.stockWrapper}>
          {stock <= 3 ? (
            <View style={styles.stockCard}>
              <Text style={styles.stock}>Sadece {stock} adet kaldı!</Text>
            </View>
          ) : null}
        </View>
      </ImageBackground>

      <View style={styles.infoContainer}>
        <View style={styles.productNameWrapper}>
          <Text style={styles.productName}>{name}</Text>
        </View>

        <View style={styles.priceAndCountWrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>{`Fiyat: `}</Text>

            <Text style={styles.price}>{price}₺</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>{`Adet:  `}</Text>
            <AddCount stock={stock} />
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text numberOfLines={numberOfLines} style={styles.description}>
            {description}
          </Text>
          <TouchableOpacity
            onPress={() => {
              toggleReadMore();
              scrollToBottom();
            }}
          >
            {description.length >= 150 ? (
              <Text style={styles.readMore}>
                {numberOfLines >= 3 ? "Devamını oku" : "Daha az göster"}
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>SEPETE EKLE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
  },
  imageWrapper: {
    // backgroundColor: "red",

    width: wp("100%"),
    height: hp("50%"),
  },
  image: {},
  infoContainer: {
    // backgroundColor: "green",

    marginTop: hp("2%"),

    paddingVertical: hp("1%"),
    paddingHorizontal: hp("2%"),
  },
  ratingWrapper: {
    // backgroundColor: "green",

    marginRight: hp("1.5%"),

    flex: 0.1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  commentNumWrapper: {
    // backgroundColor: "blue",
    marginRight: hp("2%"),

    flex: 0.1,
    alignItems: "flex-end",
  },
  stockWrapper: {
    // backgroundColor: "gray",
    marginRight: hp("2%"),

    flex: 0.8,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  stockCard: {
    backgroundColor: "gainsboro",

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,

    borderRadius: 8,

    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("3%"),
  },
  stock: {
    fontSize: 14,
    color: Colors.red,
  },
  productNameWrapper: {
    marginBottom: hp("1%"),
  },
  productName: {
    fontSize: 24,
    fontWeight: "700",
  },
  priceAndCountWrapper: {
    // backgroundColor: "red",

    marginBottom: hp("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 22,
    fontWeight: "500",
  },
  descriptionWrapper: {
    marginBottom: hp("1%"),
  },
  description: {
    fontSize: 18,
    fontStyle: "italic",
  },
  readMore: {
    fontSize: 14,
    textAlign: "center",
    justifyContent: "center",
    marginTop: hp("1%"),
  },
  buttonContainer: {
    // backgroundColor: "gray",

    alignItems: "center",
    marginBottom: hp("2.5%"),
  },
  addToCartButton: {
    borderRadius: 10,
    backgroundColor: "#6CB242",
    width: wp("70%"),
    height: hp("6%"),
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    letterSpacing: 1,
  },
});
