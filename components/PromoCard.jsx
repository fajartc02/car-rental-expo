import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Row, Col } from "./Grid";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import CustomInput from "./FormInputs/CustomInput";

const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export default function PromoCard(props) {
  return (
    <View style={{ ...styles.card }}>
      <Row>
        <Col
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ThemedText style={{ fontWeight: "bold", fontSize: 20 }}>
            %
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold" }}>
            Pakai Kode Promo
          </ThemedText>
        </Col>
      </Row>
      <Row style={{ alignItems: "center", justifyContent: "center" }}>
        <Col style={{ width: "60%" }}>
          <TextInput
            style={[styles.input, { color: "#8A8A8A", fontWeight: "bold" }]}
            placeholder="Tulis catatanmu di sini"
          />
        </Col>
        <Col>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {}}
            disabled={props?.disabled}
          >
            <ThemedText style={styles.buttonText}>Terapkan</ThemedText>
          </TouchableOpacity>
        </Col>
      </Row>
    </View>
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
    padding: 16,
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,

    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "100%",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#3D7B3F",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
