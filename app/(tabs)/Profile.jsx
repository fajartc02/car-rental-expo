import { StyleSheet, Text, FlatList, Image, Button } from "react-native";
import { Row, Col } from "@/components/Grid";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";

import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, selectLogin } from "@/redux/reducers/auth/loginSlice";

export default function Profile() {
  const { user, isLoading, isError, errorMassage } = useSelector(selectLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)");
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {user ? (
        <ThemedView style={styles.container}>
          <Row>
            <Col style={styles.titleContainer}>
              <ThemedText style={styles.titleText}>Profile</ThemedText>
            </Col>
          </Row>
          <Row style={styles.containerSub}>
            <Col style={styles.titleContainer}>
              <ThemedText style={styles.titleText}>
                <Image source={require("../../assets/images/profile.png")} />
              </ThemedText>
            </Col>
            <Col style={styles.titleContainer}>
              <ThemedText style={styles.titleText}>
                Halo, {user.email}
              </ThemedText>
            </Col>
            <Col style={styles.titleContainer}>
              <Button
                color={"red"}
                title="Logout"
                onPress={() => {
                  dispatch(LOGOUT());
                }}
              />
            </Col>
          </Row>
        </ThemedView>
      ) : (
        <ThemedView style={styles.container}>
          <Row>
            <Col style={styles.titleContainer}>
              <ThemedText style={styles.titleText}>Profile</ThemedText>
            </Col>
          </Row>
          <Row style={styles.containerSub}>
            <Col style={styles.imageContainer}>
              <Image source={require("../../assets/images/profile1.png")} />
              <Text style={styles.textStyle}>
                Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
                TMMIN Car Rental lebih mudah
              </Text>
              <Button
                color={"#3D7B3F"}
                title="Register"
                onPress={() => {
                  router.navigate("/(auth)/Register");
                }}
              />
            </Col>
          </Row>
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  containerSub: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
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
});
