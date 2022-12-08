import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
  Platform,
  Alert,
  ScrollView,
  Appearance,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import Colors from "../utils/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MyStatusBar from "../component/MyStatusBar";
import * as CustomerActions from "../redux/customerSlice";

const colorScheme = Appearance.getColorScheme();

// validation schema
const formSchema = yup.object({
  email: yup
    .string()
    .email("Lütfen doğru bir e-posta giriniz.")
    .required("Bu alanı boş bırakmamalısınız."),
  password: yup
    .string()
    .required("Bu alanı boş bırakmamalısınız.")
    .min(8, "Şifreniz en az 8 karakterden oluşmalıdır."),
});

const LoginScreen = (navigator) => {
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      onTouchStart={Keyboard.dismiss}
    >
      <MyStatusBar />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema} // add this to validate the schema
        onSubmit={(values) => {
          // console.log(values);
          dispatch(authActions.loginCustomer(values)).then(async (response) => {
            if (response.payload.success) {
              try {
                await AsyncStorage.setItem("token", response.payload.token);
                navigator.navigation.navigate("Home");
                dispatch(
                  CustomerActions.getCustomer(response.payload.data._id)
                );
              } catch (error) {
                console.log("Login error: " + error);
              }
            } else {
              Alert.alert(response.payload.msg);
            }
          });
        }}
      >
        {(props) => (
          <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
              source={require("../assets/logo.png")}
              resizeMode="contain"
              style={styles.imageWrapper}
              imageStyle={styles.image}
            />
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                style={{ width: 300, height: 35, marginBottom: -hp("1%") }}
                outlineColor={Colors.lightGreen}
                activeOutlineColor={Colors.darkGreen}
                label="E-posta"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
                left={
                  <TextInput.Icon
                    icon="email"
                    style={{ paddingTop: 7 }}
                    color={Colors.lightGreen}
                  />
                }
              />

              <View style={styles.errorText}>
                <Text
                  style={
                    props.touched.email && !props.isValid.email
                      ? styles.error
                      : styles.errorUnTouched
                  }
                >
                  {props.touched.email && props.errors.email}
                </Text>
              </View>

              <TextInput
                mode="outlined"
                style={{ width: 300, height: 35 }}
                outlineColor={Colors.lightGreen}
                activeOutlineColor={Colors.darkGreen}
                label="Şifre"
                secureTextEntry={secureTextEntry}
                right={
                  <TextInput.Icon
                    icon="eye"
                    style={{ paddingTop: 7 }}
                    color={Colors.lightGreen}
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry);
                      return false;
                    }}
                  />
                }
                left={
                  <TextInput.Icon
                    icon="key"
                    style={{ paddingTop: 7 }}
                    color={Colors.lightGreen}
                  />
                }
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />

              <View style={styles.errorText}>
                <Text
                  style={
                    props.touched.password && !props.isValid.password
                      ? styles.error
                      : styles.errorUnTouched
                  }
                >
                  {props.touched.password && props.errors.password}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={props.handleSubmit}
            >
              <Text style={styles.loginButtonText}>GİRİŞ YAP</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={{ color: Colors.fadedBlack }}>
                Yeni müşteri misiniz?
              </Text>
              <TouchableOpacity
                onPress={() => navigator.navigation.navigate("Register")}
              >
                <Text style={styles.registerText}>Üye olun</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  imageWrapper: {
    width: "80%",
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    marginTop: -40,
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightGreen,
    width: 300,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    letterSpacing: 2,
  },
  registerContainer: {
    flexDirection: "row",
    margin: 20,
    width: 300,
    justifyContent: "space-between",
  },
  registerText: {
    color: Colors.fadedGreen,
  },
  errorText: {
    width: 300,
  },
  error: {
    color: Colors.error,
    marginLeft: 10,
    marginTop: 8,
  },
  errorUnTouched: {
    width: 0,
    height: -10,
    marginVertical: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default LoginScreen;
