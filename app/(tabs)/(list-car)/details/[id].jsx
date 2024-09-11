import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Col, Row } from "@/components/Grid";

import IncludesConstant from "@/constants/Includes";
import ExcludesConstant from "@/constants/Excludes";
import UnOrderList from "@/components/UnOrderList";

import { useSelector, useDispatch } from "react-redux";
import {
  selectDetailCar,
  getCarDetail,
} from "@/redux/reducers/car/carDetailsSlice";

const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

export default function details() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, errorMassage } =
    useSelector(selectDetailCar);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup
    if (id) {
      dispatch(getCarDetail(id, signal));
    }
    return () => {
      // cancel request sebelum component di close
      // setLoading(false);
      controller.abort();
    };
  }, [id]);

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <ThemedView
          style={styles.container}
          lightColor="white"
          darkColor="black"
        >
          <Row style={{ flex: 1 }}>
            <Col>
              <Image style={styles.image} source={{ uri: data?.image }} />
            </Col>
          </Row>
          <Row style={{ flex: 1, ...styles.card }}>
            <Col style={styles.aboutContainer}>
              <ThemedText style={styles.bold}>Tentang Paket</ThemedText>
              <ThemedText style={styles.bold}>Includes</ThemedText>
              {IncludesConstant.map((item, index) => {
                return <UnOrderList key={index} text={item.label} />;
              })}
              <ThemedText style={styles.bold}>Excludes</ThemedText>
              {ExcludesConstant.map((item, index) => {
                return <UnOrderList key={index} text={item.label} />;
              })}
            </Col>
          </Row>
        </ThemedView>
      </ScrollView>
      <Row style={styles.footer}>
        <Col style={{ padding: 16, gap: 8, width: "100%" }}>
          <ThemedText style={styles.bold}>
            {formatCurrency(data?.price)}
          </ThemedText>
          <TouchableOpacity
            style={styles.btnPayment}
            onPress={() => router.push("/details/payment")}
          >
            <ThemedText style={styles.textBtn}>Lanjutkan Pembayaran</ThemedText>
          </TouchableOpacity>
        </Col>
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 190,
    height: 190,
    objectFit: "contain",
  },
  aboutContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 8,
  },
  card: {
    width: "90%",
    padding: 16,
    borderRadius: 4,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 3 },
    // android
    elevation: 1.5,
    // ios
    shadowOpacity: 1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    height: 104,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  btnPayment: {
    backgroundColor: "#3D7B3F",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
  },
});
