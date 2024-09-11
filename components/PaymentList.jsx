import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Row, Col } from "./Grid";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "./FormInputs/CustomInput";
import formatCurrency from "@/utils/formatCurrency";
import * as Clipboard from "expo-clipboard";
// import SnackBar from "react-native-snackbar-component";

export default function PaymentList({
  payment,
  isCheckActive = true,
  paymentIdSelected = null,
  carDetail,
  price = 0,
}) {
  const [isCopied, setIsCopied] = React.useState(false);
  const copyToClipboard = async (payload, message = "Copied!") => {
    await Clipboard.setStringAsync(`${payload}`);
  };

  return (
    <Row
      style={{
        ...styles.listPayment,
        borderBottomWidth: isCheckActive ? 1 : 0,
        marginBottom: 24,
      }}
      gap={8}
    >
      {isCheckActive ? (
        <>
          <Col
            style={{
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedView style={styles.card}>
              <ThemedText style={{ fontSize: 12 }}>{payment.label}</ThemedText>
            </ThemedView>
            <ThemedText>{payment.desc}</ThemedText>
          </Col>
          {payment.id === paymentIdSelected ? (
            <Col>
              <Ionicons name="checkmark" size={24} color="#5CB85F" />
            </Col>
          ) : null}
        </>
      ) : (
        <Col style={{ width: "100%" }}>
          <Row gap={8} style={{ marginBottom: 30 }}>
            <Col>
              <ThemedView style={styles.card}>
                <ThemedText style={{ fontSize: 12 }}>
                  {payment.label}
                </ThemedText>
              </ThemedView>
            </Col>
            <Col>
              <ThemedText>{payment.desc}</ThemedText>
              <ThemedText>a.n. {payment.owner}</ThemedText>
            </Col>
          </Row>
          <CustomInput
            label="Nomer Rekening"
            isNotBoldLabel={true}
            value={payment.norek}
            width="100%"
            icon={"copy-outline"}
            onPress={() => copyToClipboard(payment.norek.replaceAll("-", ""))}
            editable={false}
          />
          <CustomInput
            label="Total Bayar"
            isNotBoldLabel={true}
            value={formatCurrency(price)}
            width="100%"
            icon={"copy-outline"}
            onPress={() => copyToClipboard(price)}
            editable={false}
          />
        </Col>
      )}
      {/* <SnackBar
        visible={isCopied}
        textMessage="Hello There!"
        actionHandler={() => {
          console.log("snackbar button clicked!");
        }}
        actionText="let's go"
      /> */}
    </Row>
  );
}

const styles = StyleSheet.create({
  listPayment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
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
});
