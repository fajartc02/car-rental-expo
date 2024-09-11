import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Row, Col } from "./Grid";
import { Ionicons } from "@expo/vector-icons";

const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export default function CarList({
  image,
  carName,
  passengers,
  baggage,
  price,
  style,
  onPress,
}) {
  return (
    <Pressable style={{ ...styles.card }} onPress={onPress}>
      <View>
        <Row
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={16}
          style={{ padding: 16 }}
        >
          <Col>
            <Image style={styles.img} source={image} />
          </Col>
          <Col style={styles.descContainer}>
            <Text style={styles.carName}>{carName}</Text>
            <Row>
              <Col style={styles.subContainer}>
                <Ionicons name="people-outline" size={16} color="#8A8A8A" />
                <Text style={styles.subText}>{passengers}</Text>
              </Col>
              <Col style={styles.subContainer}>
                <Ionicons name="bag-outline" size={16} color="#8A8A8A" />
                <Text style={styles.subText}>{baggage}</Text>
              </Col>
            </Row>
            <Text style={styles.price}>{formatCurrency(price)}</Text>
          </Col>
        </Row>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    borderRadius: 4,
    shadowColor: "rgba(0,0,0,0.2)",
    // android
    elevation: 0.5,
    // ios
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  img: {
    width: 40,
    height: 40,
    // resizeMode: "contain",
    objectFit: "contain",
  },
  carName: {
    fontSize: 14,
  },
  descContainer: {
    gap: 10,
  },
  subContainer: {
    flexDirection: "row",
    gap: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  subText: {
    color: "#8A8A8A",
    fontWeight: "bold",
    marginRight: 10,
  },
  price: {
    fontSize: 14,
    color: "#5CB85F",
  },
});
