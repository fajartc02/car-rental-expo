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
  onChangeStep,
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
            {formatCurrency(data?.price)}
          </ThemedText>
          <Ionicons name="chevron-down" size={24} color="black" />
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "95%" }}>
          {!paymentIdSelected ? (
            <TouchableOpacity
              style={{
                ...styles.btnPayment,
                backgroundColor: "#C9E7CA",
              }}
              disabled
            >
              <ThemedText style={styles.textBtn}>Bayar</ThemedText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnPayment}
              onPress={() => onChangeStep()}
            >
              <ThemedText style={styles.textBtn}>Bayar</ThemedText>
            </TouchableOpacity>
          )}
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
  },
});
