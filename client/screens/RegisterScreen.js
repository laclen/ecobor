import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import * as authActions from "../redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import Colors from "../utils/colors";
import * as CustomerActions from "../redux/customerSlice";

// validation schema
const formSchema = yup.object({
  fullName: yup.string().required("Bu alanı boş bırakmamalısınız."),
  email: yup
    .string()
    .email("Lütfen doğru bir e-posta giriniz.")
    .required("Bu alanı boş bırakmamalısınız."),
  password: yup
    .string()
    .required("Bu alanı boş bırakmamalısınız.")
    .min(8, "Şifreniz en az 8 karakterden oluşmalıdır."),
  phoneNumber: yup.string().required("Bu alanı boş bırakmamalısınız."),
  address: yup.string().required("Bu alanı boş bırakmamalısınız."),
});

const RegisterScreen = (navigator) => {
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          dispatch(authActions.registerCustomer(values)).then(
            async (response) => {
              if (response.payload.success) {
                try {
                  await AsyncStorage.setItem("token", response.payload.token);
                  navigator.navigation.navigate("Home");
                  dispatch(
                    CustomerActions.getCustomer(response.payload.data._id)
                  );
                } catch (error) {
                  console.log("Register error: " + error);
                }
              } else {
                Alert.alert(response.payload.message);
              }

              // console.log(response.payload);
            }
          );
        }}
      >
        {(props) => (
          <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <ImageBackground
                  source={require("../assets/logo.png")}
                  resizeMode="contain"
                  style={styles.imageWrapper}
                  imageStyle={styles.image}
                />

                <TextInput
                  mode="outlined"
                  style={styles.input}
                  outlineColor={Colors.lightGreen}
                  activeOutlineColor={Colors.darkGreen}
                  label="İsim & Soyisim"
                  keyboardType="default"
                  onChangeText={props.handleChange("fullName")}
                  value={props.values.fullName}
                  onBlur={props.handleBlur("fullName")}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <Ionicons
                          name={"person-circle-outline"}
                          size={24}
                          style={styles.icon}
                          color={Colors.lightGreen}
                        />
                      )}
                    />
                  }
                />
                <View style={styles.errorText}>
                  <Text
                    style={
                      props.touched.fullName && !props.isValid.fullName
                        ? styles.error
                        : styles.errorUnTouched
                    }
                  >
                    {props.touched.fullName && props.errors.fullName}
                  </Text>
                </View>

                <TextInput
                  mode="outlined"
                  style={styles.input}
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
                      style={styles.icon}
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
                  style={styles.input}
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
                      style={styles.icon}
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

                <TextInput
                  mode="outlined"
                  style={styles.input}
                  outlineColor={Colors.lightGreen}
                  activeOutlineColor={Colors.darkGreen}
                  label="Telefon numarası"
                  keyboardType="phone-pad"
                  onChangeText={props.handleChange("phoneNumber")}
                  value={props.values.phoneNumber}
                  onBlur={props.handleBlur("phoneNumber")}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <AntDesign
                          style={styles.icon}
                          name="phone"
                          size={24}
                          color={Colors.lightGreen}
                        />
                      )}
                    />
                  }
                />
                <View style={styles.errorText}>
                  <Text
                    style={
                      props.touched.phoneNumber && !props.isValid.phoneNumber
                        ? styles.error
                        : styles.errorUnTouched
                    }
                  >
                    {props.touched.phoneNumber && props.errors.phoneNumber}
                  </Text>
                </View>

                <TextInput
                  mode="outlined"
                  style={styles.input}
                  outlineColor={Colors.lightGreen}
                  activeOutlineColor={Colors.darkGreen}
                  label="Adres"
                  keyboardType="default"
                  onChangeText={props.handleChange("address")}
                  value={props.values.address}
                  onBlur={props.handleBlur("address")}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <AntDesign
                          name="home"
                          size={24}
                          style={styles.icon}
                          color={Colors.lightGreen}
                        />
                      )}
                    />
                  }
                />
                <View style={styles.errorText}>
                  <Text
                    style={
                      props.touched.address && !props.isValid.address
                        ? styles.error
                        : styles.errorUnTouched
                    }
                  >
                    {props.touched.address && props.errors.address}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.registerButtonText}>ÜYE OL</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={{ color: Colors.fadedBlack, marginTop: -5 }}>
                    Zaten bir hesabınız mı var?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigator.navigation.navigate("Login")}
                  >
                    <Text style={styles.loginText}>Giriş yapın</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }} />
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    flex: 4,
    width: "80%",
    height: 250,
    marginBottom: -30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 35,
    marginTop: -5,
  },
  registerButton: {
    borderRadius: 10,
    backgroundColor: Colors.lightGreen,
    width: 300,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -5,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    letterSpacing: 2,
  },
  errorText: {
    width: 300,
  },
  error: {
    color: Colors.error,
    marginLeft: 10,
    marginVertical: 2.5,
  },
  errorUnTouched: {
    width: 0,
    height: -10,
    marginVertical: 2,
  },
  loginContainer: {
    flexDirection: "row",
    margin: 20,
    width: 300,
    justifyContent: "space-between",
    marginBottom: 1,
  },
  loginText: {
    color: Colors.lightGreen,
    marginTop: -5,
  },
  icon: {
    paddingTop: 7,
  },
});
