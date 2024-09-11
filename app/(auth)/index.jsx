import {
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";
import CustomInput from "../../components/FormInputs/CustomInput";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalPopup from "../../components/Modal";
import { Ionicons } from "@expo/vector-icons";
import GoogleButton from "../../components/GoogleButton";

import { useSelector, useDispatch } from "react-redux";
import { POST_LOGIN, selectLogin } from "@/redux/reducers/auth/loginSlice";

export default function Signin() {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const { user, isLoading, isError, errorMassage } = useSelector(selectLogin);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = React.useState(false);

  const inputContainer = [
    {
      label: "Email",
      placeholder: "Contoh: johndee@gmail.com",
      secureTextEntry: false,
      onChangeText: (email) => {
        onChangeEmail(email);
      },
    },
    {
      label: "Password",
      placeholder: "6+ karakter",
      secureTextEntry: true,
      onChangeText: (password) => {
        onChangePassword(password);
      },
    },
  ];

  async function handleSignIn() {
    await dispatch(POST_LOGIN({ email, password }));
  }

  useEffect(() => {
    if (user) {
      if (!isError && user) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          router.navigate("/(tabs)");
        }, 1000);
      } else if (isError) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      }
    }
  }, [user, isError]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Image source={require("../../assets/images/toyota.png")} />
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <ThemedText
              style={{
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              Welcome Back!
            </ThemedText>
          </View>

          {inputContainer.map((input, index) => (
            <CustomInput key={index} {...input} />
          ))}

          <View style={{ marginTop: 20, width: "80%" }}>
            {isLoading ? (
              <TouchableOpacity
                style={{ ...styles.button, opacity: 0.5 }}
                activeOpacity={0.8}
                disabled={true}
              >
                <ThemedText style={styles.buttonText}>Loading...</ThemedText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleSignIn}
              >
                <ThemedText style={styles.buttonText}>Sign In</ThemedText>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginTop: 20, flexDirection: "row" }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Don’t have an account?
            </ThemedText>
            <Link
              style={{
                fontWeight: "bold",
                marginLeft: 5,
                textDecorationLine: "underline",
                color: "#0D28A6",
              }}
              href="/Register"
            >
              Sign up for free
            </Link>
          </View>
          <GoogleButton />
        </View>
      </ThemedView>
      <ModalPopup visible={modalVisible}>
        <ThemedView style={styles.modalBackground}>
          {isError ? (
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
            {isError ? errorMassage : "Success to login."}
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
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 20,
  },
  formContainer: {
    flex: 5,
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
