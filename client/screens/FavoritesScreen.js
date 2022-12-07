import { FlatList, StyleSheet, Text, View } from "react-native"
import React from "react"
import Product from "../component/Product"
import { useDispatch, useSelector } from "react-redux"
import * as customerActions from "../redux/customerSlice"
import * as productActions from "../redux/productSlice"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const FavoritesScreen = (props) => {
  // we will use dispatch for fetching favorites of customer from customer object, and updating favorites array in the redux store
  const dispatch = useDispatch()
  // get the customer - NO INTERNET - CHECK WHETHER TO GET CUSTOMER FROM REDUX OR DB, CHECK HOW IT IS STORED IN REDUX CUSTOMER STORE
  // const customer = dispatch(AuthActions.getCustomer())
  // console.log(customer)

  // get the customer id
  const customerId = useSelector((state) => state.auth.customer.data._id)
  // console.log(customerId)

  // fetch full info of customer into customer redux store to after derive the favorites list
  React.useEffect(() => {
    dispatch(customerActions.getCustomer(customerId))
  }, [customerId])

  const customer = useSelector((state) => state.customer.customer)
  console.log(customer)
  const favoritesArr = typeof customer.favorites // BU OBJE OLARAK GELİYOR BUNU ÇÖZ ÖNCE
  console.log(favoritesArr)

  // const favoritesList = favoritesArr.map((productId) => {
  //   console.log(productId)
  // })

  // console.log(favoritesList)
  // let favoritesList
  // React.useEffect(() => {
  //   favoritesList = favoritesArr.map((item) =>
  //     dispatch(ProductActions.fetchProduct(item))
  //   )
  // })

  const renderItem = ({ item }) => (
    <Product
      navigation={props.navigation}
      _id={item._id}
      image={item.image}
      name={item.name}
      price={item.price}
      description={item.description}
      stock={item.stock}
      customer={customerId}
    />
  )

  return (
    <View style={styles.container}>
      {/* <FlatList
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
      /> */}
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
