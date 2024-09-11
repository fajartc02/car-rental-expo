import {
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import GreetingBanner from "@/components/Banner/GreetingBanner";
import CarList from "@/components/CarList";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import LoadingIndicator from "@/components/LoadingIndicator";

// useSelector: take data
// useDispatch: function
import { useSelector, useDispatch } from "react-redux";
import { getCar, selectCars } from "@/redux/reducers/car/carSlice";
import { selectLogin } from "@/redux/reducers/auth/loginSlice";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const { data, isLoading, isError, errorMassage } = useSelector(selectCars);
  const { user } = useSelector(selectLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCar(signal));

    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);
  // parameter yang di stream

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A43333", dark: "#1D3D47" }}
      headerImage={<GreetingBanner fullname={user?.email} />}
    >
      {/* BANNER */}
      <ThemedView style={styles.bannerContent}>
        <View style={{ width: "40%", padding: 10 }}>
          <ThemedText
            style={{ fontSize: 16 }}
            lightColor="#fff"
            darkColor="#fff"
          >
            Sewa Mobil Berkualitas di kawasanmu
          </ThemedText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/(tabs)");
            }}
          >
            <ThemedText
              lightColor="#fff"
              darkColor="#fff"
              style={styles.buttonText}
            >
              Sewa Mobil
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            style={styles.bannerImage}
            source={require("@/assets/images/zenix3.png")}
          />
        </View>
      </ThemedView>
      {/* MENU */}
      <ThemedView
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <View>
          <View style={styles.buttonMenu}>
            <Ionicons color={"#fff"} size={24} name="car" />
          </View>
          <View style={{ alignItems: "center" }}>
            <ThemedText style={{ fontSize: 12, fontWeight: "bold" }}>
              Sewa Mobil
            </ThemedText>
          </View>
        </View>
        <View>
          <View style={styles.buttonMenu}>
            <Ionicons color={"#fff"} size={24} name="cube" />
          </View>
          <View style={{ alignItems: "center" }}>
            <ThemedText style={{ fontSize: 12, fontWeight: "bold" }}>
              Oleh - Oleh
            </ThemedText>
          </View>
        </View>
        <View>
          <View style={styles.buttonMenu}>
            <Ionicons color={"#fff"} size={24} name="key" />
          </View>
          <View style={{ alignItems: "center" }}>
            <ThemedText style={{ fontSize: 12, fontWeight: "bold" }}>
              Penginapan
            </ThemedText>
          </View>
        </View>
        <View>
          <View style={styles.buttonMenu}>
            <Ionicons color={"#fff"} size={24} name="camera" />
          </View>
          <View style={{ alignItems: "center" }}>
            <ThemedText style={{ fontSize: 12, fontWeight: "bold" }}>
              Wisata
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView>
        <ThemedText style={styles.titleCarList}>
          Daftar Mobil Pilihan
        </ThemedText>
        {data.length > 0 ? (
          data.map((car, index) => (
            <CarList
              key={index}
              image={{ uri: car.image }}
              carName={car.name}
              passengers={10}
              baggage={2}
              price={car.price}
              onPress={() => router.navigate("(list-car)/details/" + car.id)}
            />
          ))
        ) : isLoading ? (
          <LoadingIndicator />
        ) : isError ? (
          <ThemedText>{"errorMassage"}</ThemedText>
        ) : (
          <ThemedText
            style={{ color: Colors.primary.text, fontWeight: "bold" }}
          >
            Tidak ada mobil
          </ThemedText>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    zIndex: 2,
    alignItems: "center",
    gap: 8,
    marginTop: -80,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  bannerContent: {
    backgroundColor: "#AF392F",
    marginTop: -160,
    padding: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerImage: {
    flex: 1,
    resizeMode: "contain",
    height: 150,
    width: 150,
    margin: 8,
    // overflow: "hidden",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: "#3D7B3F",
  },
  buttonMenu: {
    padding: 20,
    backgroundColor: "#A43333",
    borderRadius: 8,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  titleCarList: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
