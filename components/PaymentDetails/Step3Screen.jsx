import { Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import CarList from "@/components/CarList";
import { Row, Col } from "@/components/Grid";
import moment from "moment";
import "moment/locale/id";
import PaymentList from "../PaymentList";
import CountdownPayment from "./CountdownPayment";
import CustomInput from "@/components/FormInputs/CustomInput";
import ImagePickerExample from "../ImgPicker";
import { TouchableOpacity } from "react-native";
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import { useSelector } from "react-redux";
import LoadingIndicator from "@/components/LoadingIndicator";
const windowWidth = Dimensions.get("window").width;

export default function Step3Screen({ data, paymentIdSelected, dataSlip }) {
  const orderSlice = useSelector(selectOrder);
  console.log(dataSlip?.slip);

  return (
    <ThemedView style={{ paddingHorizontal: 16, gap: 16 }}>
      <Row>
        <Col style={{ width: "100%" }}>
          <CustomInput
            label="Invoice"
            isNotBoldLabel={true}
            value={"INV/xx/xx-xxxx/"}
            width="100%"
            icon={"download-outline"}
            onPress={() => {}}
            editable={false}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "100%" }}>
          <ThemedText>E-Ticket</ThemedText>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image
            width={windowWidth * 0.9}
            height={200}
            source={{ uri: dataSlip.slip }}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "100%" }}>
          <ThemedText>
            Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
          </ThemedText>
        </Col>
      </Row>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    alignItems: "flex-start",
    padding: 16,
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#FFF",
    gap: 8,
    zIndex: 1,
  },

  textLight: {
    color: "white",
    fontWeight: "bold",
  },
  textSuccess: {
    color: "#3D7B3F",
    fontWeight: "bold",
  },
  btnSuccess: {
    backgroundColor: "#3D7B3F",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3D7B3F",
    width: "100%",
  },
  btnOutlineSuccess: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3D7B3F",
    width: "100%",
  },
});
