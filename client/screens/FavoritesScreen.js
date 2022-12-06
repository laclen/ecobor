import { FlatList, StyleSheet, Text, View } from "react-native"
import React from "react"
import Product from "../component/Product"
import { useDispatch, useSelector } from "react-redux"
import * as ProductActions from "../redux/productSlice"
import * as AuthActions from "../redux/authSlice"

const FavoritesScreen = (navigator) => {
  // we will use dispatch for fetching favorites of customer from customer object and updating favorites array in the redux store
  const dispatch = useDispatch()
  // get the customer - NO INTERNET - CHECK WHETHER TO GET CUSTOMER FROM REDUX OR DB, CHECK HOW IT IS STORED IN REDUX CUSTOMER STORE
  const customerId = dispatch(AuthActions.getCustomer())

  let favoritesList
  React.useEffect(() => {
    favoritesList = customer.favorites.map((item) =>
      dispatch(ProductActions.fetchProduct(item))
    )
  })

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
  )

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
        data={favoritesList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  )
}

export default FavoritesScreen

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
})
