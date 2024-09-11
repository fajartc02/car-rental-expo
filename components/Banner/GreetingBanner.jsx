import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Constants from "expo-constants";
import GeoLocation from "../GeoLocation";
export default function GreetingBanner(props) {
  return (
    <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.textBanner}>Hi, {props.fullname}</Text>
          <GeoLocation styles={styles.textLocation} />
        </View>
        <View>
          <Image source={require("../../assets/images/profile.png")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
  },
  textBanner: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  textLocation: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
