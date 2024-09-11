import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Col, Row } from "./Grid";

export default function DetailTitle({ title = false, ...props }) {
  const { id } = useGlobalSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("DETAIL TITLE");
  console.log(props);

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup
    const fetchCarDetail = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await fetch(
            `http://api-car-rental.binaracademy.org/customer/car/${id}`,
            { signal: signal }
          );
          const data = await response.json();
          setCars(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Failed to fetch cars:", error);
        }
      }
    };
    fetchCarDetail();
    return () => {
      // cancel request sebelum component di close
      setLoading(false);
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, gap: 8 }}>
      <Row
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Col style={{ marginRight: 30 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </Col>
        {title ? (
          <Col
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            {title}
          </Col>
        ) : (
          <Col
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: -30,
              gap: 4,
            }}
          >
            <Row
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Col>
                <Text>{cars.name}</Text>
              </Col>
            </Row>
            <Row
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Col style={styles.subContainer}>
                <Ionicons name="people-outline" size={16} color="#000" />
                <Text style={styles.subText}>{10}</Text>
              </Col>
              <Col style={styles.subContainer}>
                <Ionicons name="bag-outline" size={16} color="#000" />
                <Text style={styles.subText}>{5}</Text>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
