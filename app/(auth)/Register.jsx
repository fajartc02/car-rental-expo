import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import CustomInput from "../../components/FormInputs/CustomInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import ModalPopup from "../../components/Modal";
// import { Button, Snackbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export default function Signin() {
  const [fullname, onChangeFullname] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const [err, setErr] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);

  const inputContainer = [
    {
      label: "Name",
      placeholder: "Contoh: jhon doe",
      secureTextEntry: false,
      onChangeText: (fullname) => {
        onChangeFullname(fullname);
      },
    },
    {
      label: "Email*",
      placeholder: "Contoh: johndee@gmail.com",
      secureTextEntry: false,
      onChangeText: (email) => {
        onChangeEmail(email);
      },
    },
    {
      label: "Create Password*",
      placeholder: "6+ karakter",
      secureTextEntry: true,
      onChangeText: (password) => {
        onChangePassword(password);
      },
    },
  ];

  async function handleSignUp(values) {
    try {
      setErr(null);
      setLoading(true);
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            role: "Customer",
          }),
        }
      );

      const data = await req.json();
      if (data.message || Object.keys(data).length === 0) {
        let errorMsg = data?.message || "Please fill all the fields";
        throw new Error(errorMsg);
      }
      setLoading(false);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        router.navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
      setErr(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Image source={require("../../assets/images/toyota.png")} />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <ThemedText style={{ fontWeight: "bold", fontSize: 24 }}>
                  Sign Up
                </ThemedText>
              </View>
              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={(values) => handleSignUp(values)}
                validationSchema={SignupSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "80%",
                      }}
                    >
                      <ThemedText
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Name
                      </ThemedText>
                      <TextInput
                        onBlur={handleBlur("name")}
                        onChangeText={handleChange("name")}
                        style={styles.input}
                        placeholder="name"
                      />
                      {errors.name && touched.name ? (
                        <Text style={styles.validatorText}>{errors.name}</Text>
                      ) : null}
                    </View>

                    {/* email */}
                    <View
                      style={{
                        flexDirection: "column",
                        width: "80%",
                      }}
                    >
                      <ThemedText
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Email
                      </ThemedText>
                      <TextInput
                        onBlur={handleBlur("email")}
                        onChangeText={handleChange("email")}
                        style={styles.input}
                        placeholder="email"
                      />
                      {errors.email && touched.email ? (
                        <ThemedText style={styles.validatorText}>
                          {errors.email}
                        </ThemedText>
                      ) : null}
                    </View>

                    {/* password */}
                    <View
                      style={{
                        flexDirection: "column",
                        width: "80%",
                      }}
                    >
                      <ThemedText
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Password
                      </ThemedText>
                      <View style={styles.inputContainer}>
                        <TextInput
                          onBlur={handleBlur("password")}
                          onChangeText={handleChange("password")}
                          style={styles.inputStyle}
                          placeholder="password"
                          secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                          style={{
                            position: "absolute",
                            right: 10,
                            top: 10,
                          }}
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Ionicons
                              name="eye-off-outline"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <Ionicons
                              name="eye-outline"
                              size={24}
                              color="black"
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      {errors.password && touched.password ? (
                        <ThemedText style={styles.validatorText}>
                          {errors.password}
                        </ThemedText>
                      ) : null}
                    </View>
                    <View style={{ marginTop: 20, width: "80%" }}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <ThemedText style={styles.buttonText}>
                            Loading...
                          </ThemedText>
                        ) : (
                          <ThemedText style={styles.buttonText}>
                            Sign Up
                          </ThemedText>
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <ThemedText style={{ fontWeight: "bold" }}>
                  Already have an account?
                </ThemedText>
                <Link
                  style={{
                    fontWeight: "bold",
                    marginLeft: 5,
                    textDecorationLine: "underline",
                    color: "#0D28A6",
                  }}
                  href="/"
                >
                  Sign in here!
                </Link>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ThemedView>
      <ModalPopup visible={modalVisible}>
        <ThemedView style={styles.modalBackground}>
          {err ? (
            <Ionicons name="close-circle" size={34} color="red" />
          ) : (
            <Ionicons name="checkmark-circle" size={34} color="#3D7B3F" />
          )}
          <ThemedText
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 10,
            }}
          >
            {err?.message ||
              "You have successfully registered. You will redirect to sign in. Please wait..."}
          </ThemedText>
        </ThemedView>
      </ModalPopup>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
  },
  inputStyle: {
    flex: 1,
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  header: {
    flex: 1,
    // backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 20,
  },
  formContainer: {
    flex: 5,
    // backgroundColor: "yellow",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#3D7B3F",
  },
  validatorText: {
    color: "red",
    fontSize: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalBackground: {
    width: "90%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    borderRadius: 4,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
