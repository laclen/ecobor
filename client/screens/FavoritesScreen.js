import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Product from "../component/Product";
import { useDispatch, useSelector } from "react-redux";
import * as customerActions from "../redux/customerSlice";
import * as productActions from "../redux/productSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FavoritesScreen = (props) => {
  const dispatch = useDispatch();

  const [favListToRender, setFavListToRender] = React.useState([]);

  // we need logged in customer's id to work with customer's favorites list in db
  const customerFavList = useSelector(
    (state) => state.customer.customer.favorites
  );
  // console.log("####### customerFavList #######");
  // console.log(customerFavList);

  // we need to create an array with the objects of products that are corresponding of the ids inside customerFavList
  React.useEffect(() => {
    customerFavList.map((productId) => {
      dispatch(productActions.getProductInfo(productId)).then((response) => {
        setFavListToRender((prevState) => [...prevState, response.payload]);
      });
    });
  }, [customerFavList]);

  // console.log("####### favListToRender #######");
  // console.log(favListToRender);

  const renderItem = ({ item }) => (
    <Product
      navigation={props.navigation}
      _id={item._id}
      image={item.image}
      name={item.name}
      price={item.price}
      description={item.description}
      stock={item.stock}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        contentContainerStyle={
          Platform.OS === "android"
            ? styles.listWrapperAndroid
            : styles.listWrapperIOS
        }
        columnWrapperStyle={{ justifyContent: "space-between" }}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={favListToRender}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapperAndroid: {
    paddingHorizontal: wp("2%"),
    // backgroundColor: "green",
    paddingBottom: hp("10%"),
  },
  listWrapperIOS: {
    alignSelf: "center",

    // backgroundColor: "green",
  },
});
