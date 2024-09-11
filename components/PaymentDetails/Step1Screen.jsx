import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Pressable } from "react-native";
import PAYMENT_METHODS from "@/constants/PaymentMethods";
import CarList from "@/components/CarList";
import { Row, Col } from "@/components/Grid";
import PromoCard from "@/components/PromoCard";
import { Ionicons } from "@expo/vector-icons";
import PaymentList from "../PaymentList";

export default function Step1Screen({
  data,
  paymentIdSelected,
  onChangePaymentId,
}) {
  return (
    <ThemedView style={{ paddingHorizontal: 16 }}>
      <CarList
        image={{ uri: data.image }}
        carName={data.name}
        passengers={10}
        baggage={2}
        price={data.price}
      />
      <ThemedText style={styles.bold}>Pilih Bank Transfer</ThemedText>
      <ThemedText style={styles.bold}>
        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
        Mobile Banking
      </ThemedText>
      {PAYMENT_METHODS.map((item, index) => {
        return (
          <Pressable key={index} onPress={() => onChangePaymentId(item.id)}>
            <PaymentList payment={item} paymentIdSelected={paymentIdSelected} />
          </Pressable>
        );
      })}
      <PromoCard />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listPayment: {
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    borderWidth: 1,
    marginVertical: 4,
    borderRadius: 4,
    shadowColor: "rgba(0,0,0,0.2)",
    // android
    elevation: 0.5,
    // ios
    shadowOpacity: 1,
    shadowRadius: 4,
    width: 80,
  },

  bold: {
    fontWeight: "bold",
    marginTop: 16,
  },
});
