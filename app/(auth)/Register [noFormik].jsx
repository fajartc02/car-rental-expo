import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
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

export default function Signin() {
  const [fullname, onChangeFullname] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const [err, setErr] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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

  async function handleSignUp() {
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
            email: email,
            password: password,
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

              {inputContainer.map((input, index) => (
                <CustomInput key={index} {...input} />
              ))}

              <View style={{ marginTop: 20, width: "80%" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSignUp}
                  disabled={loading}
                >
                  {loading ? (
                    <ThemedText style={styles.buttonText}>
                      Loading...
                    </ThemedText>
                  ) : (
                    <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
                  )}
                </TouchableOpacity>
              </View>
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
