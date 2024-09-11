import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import CarList from "@/components/CarList";
import { Row, Col } from "@/components/Grid";
import moment from "moment";
import "moment/locale/id";
import PaymentList from "../PaymentList";
import CountdownPayment from "./CountdownPayment";
import { selectOrder, PUT_ORDER_SLIP } from "@/redux/reducers/order/orderSlice";
import { useSelector } from "react-redux";

export default function Step2Screen({
  data,
  paymentIdSelected,
  paymentMethodSelected,
}) {
  const orderSlice = useSelector(selectOrder);
  const currentDate = moment().format("YYYY-MM-DD");
  const [lastTimePaymentDate, setLastTimePaymentDate] = useState(
    moment(`${currentDate} 00:00:00`).add(1, "days")
  );
  const currentTime = moment();
  const lastTime = moment(orderSlice.data.finish_rent_at);
  const diff = lastTime.diff(currentTime, "seconds");
  const [countDownTime, setCountDownTime] = useState(diff);
  const [dateToString, setDateToString] = useState(
    moment(`${currentDate} 00:00:00`).add(1, "days").locale("id").format("LLLL")
  );

  return (
    <ThemedView style={{ paddingHorizontal: 16 }}>
      <Row>
        <Col>
          <ThemedText style={styles.bold}>
            Selesaikan Pembayaran Sebelum
          </ThemedText>
        </Col>
        <CountdownPayment lastTimeDate={countDownTime} />
      </Row>
      <ThemedText style={styles.bold}>{dateToString}</ThemedText>
      <CarList
        image={{ uri: data.image }}
        carName={data.name}
        passengers={10}
        baggage={2}
        price={data.price}
      />
      <ThemedText style={styles.bold}>Lakukan Transfer ke</ThemedText>
      <PaymentList
        price={data.price}
        payment={paymentMethodSelected}
        paymentIdSelected={paymentIdSelected}
        isCheckActive={false}
      />
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
  clockStyle: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#FA2C5A",
    fontWeight: "bold",
    padding: (0, 2, 0, 2),
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
