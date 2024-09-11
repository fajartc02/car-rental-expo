import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Col, Row } from "./Grid";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import formatCurrency from "@/utils/formatCurrency";
import React from "react";

export default function FooterPayment1({
  data,
  paymentIdSelected,
  onShowModal,
}) {
  return (
    <ThemedView style={styles.footer}>
      <Row>
        <Col
          style={{
            flexDirection: "row",
            textAlign: "left",
            gap: 8,
          }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>
            Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
          </ThemedText>
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "95%", gap: 24 }}>
          <TouchableOpacity
            style={styles.btnPayment}
            onPress={() => onShowModal(true)}
          >
            <ThemedText style={styles.textBtn}>
              Konfirmasi Pembayaran
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btnPayment,
              backgroundColor: "white",
            }}
            onPress={() => onChangeStep(-1)}
            // onPress={() => onShowModal(true)}
          >
            <ThemedText style={{ ...styles.textBtn, color: "#3D7B3F" }}>
              Lihat Daftar Pesanan
            </ThemedText>
          </TouchableOpacity>
        </Col>
      </Row>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "flex-start",
    padding: 16,
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#EEEEEE",
    gap: 8,
    zIndex: 1,
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
  },
  btnPayment: {
    backgroundColor: "#3D7B3F",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3D7B3F",
  },
});
