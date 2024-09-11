import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import CarList from "@/components/CarList";
import Constants from "expo-constants";
import { router } from "expo-router";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Colors } from "@/constants/Colors";

export default function ListCarScreen() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    setLoading(true); //loading state
    const getData = async () => {
      try {
        const response = await fetch(
          "https://api-car-rental.binaracademy.org/customer/car",
          { signal: signal } // UseEffect cleanup
        );
        const body = await response.json();
        setCars(body);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e); // Error Handling
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      }
    };
    getData();
    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text style={{ ...styles.title }}>Daftar Mobil</Text>
      <FlatList
        style={styles.container}
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingIndicator />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: Colors.primary.text, fontWeight: "bold" }}>
                Tidak Ada Mobil
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <CarList
            style={{ marginHorizontal: 20 }}
            key={item.id}
            image={{ uri: item.image }}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
            onPress={() => router.navigate("(list-car)/details/" + item.id)}
          />
        )}
        viewabilityConfig={{
          waitForInteraction: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});
