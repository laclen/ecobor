import React from "react";
import { StyleSheet, View, FlatList, StatusBar, Platform } from "react-native";
import Product from "../component/Product";
import { useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../redux/productSlice";

const FeedScreen = (props) => {
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

  const dataStatus = useSelector((state) => state.product.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(productActions.fetchData());
    }
  }, [dispatch]);

  const products = useSelector((state) => state.product.products);

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Marka, ürün veya kategori ara"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      <FlatList
        numColumns={2}
        contentContainerStyle={
          Platform.OS === "android"
            ? styles.listWrapperAndroid
            : styles.listWrapperIOS
        }
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarWrapper: {
    width: "100%",
    height: 90,

    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
    paddingHorizontal: 15,
  },
  searchBar: {
    borderRadius: 8,
  },
  listWrapperAndroid: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  listWrapperIOS: {
    alignSelf: "center",
  },
});
