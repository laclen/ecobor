import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  RefreshControl,
  Text,
} from "react-native";
import Product from "../component/Product";
import { useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../redux/productSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../utils/colors";
import MyStatusBar from "../component/MyStatusBar";

/*
we don't want feedscreen to refresh everytime the customerFavorites updated
so we should print every product in favoritescreens just like we did in the feedscreen
but in return statement check if the productid is in favorites list of customer
return the product if it is, if it's not return null
*/

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const FeedScreen = (props) => {
  const customer = useSelector((state) => state.customer.customer);

  const dataStatus = useSelector((state) => state.product.status);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const searchFilter = (query) => {
    if (query) {
      const data = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(data);
      setSearchQuery(query);
    } else {
      setFilteredData(masterData);
      setSearchQuery(query);
    }
  };

  const renderItem = ({ item }) => (
    <Product
      navigation={props.navigation}
      _id={item._id}
      image={item.image}
      name={item.name}
      price={item.price}
      description={item.description}
      stock={item.stock}
      customer={customer}
    />
  );

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(productActions.fetchData());
    }
  }, [dispatch]);

  const products = useSelector((state) => state.product.products);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(products);
  const [masterData, setMasterData] = React.useState(products);

  useEffect(() => {
    setFilteredData(products);
    setMasterData(products);
  }, [products]);

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <View style={styles.searchBarWrapper}>
        <Searchbar
          style={styles.searchBar}
          iconColor={Colors.darkGreen}
          placeholder="Ürün veya kategori ara"
          value={searchQuery}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>

      <FlatList
        numColumns={2}
        contentContainerStyle={
          Platform.OS === "android"
            ? styles.listWrapperAndroid
            : styles.listWrapperIOS
        }
        columnWrapperStyle={{ justifyContent: "space-between" }}
        maxToRenderPerBatch={7}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={filteredData}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        extraData={refreshing}
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
    width: wp("100%"),
    height: hp("10%"),

    justifyContent: "center",
    paddingHorizontal: wp("3.6%"),

    // backgroundColor: "red",
  },
  searchBar: {
    borderRadius: 8,
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
