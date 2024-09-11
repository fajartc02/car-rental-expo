import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Pressable } from "react-native";
import PAYMENT_METHODS from "@/constants/PaymentMethods";
import CarList from "@/components/CarList";
import { Row, Col } from "@/components/Grid";
import PromoCard from "@/components/PromoCard";
import { Ionicons } from "@expo/vector-icons";
import dateConverter from "@/utils/dateConverter";
import moment from "moment";
import "moment/locale/id";
import PaymentList from "../PaymentList";

export default function Step2Screen({
  data,
  paymentIdSelected,
  paymentMethodSelected,
}) {
  const [lastTimePaymentDate, setLastTimePaymentDate] = useState(
    moment("2024-09-02 00:00:00").add(1, "days")
  );
  const [countDownTime, setCountDownTime] = useState("00:00:00");
  const [dateToString, setDateToString] = useState(
    moment("2024-09-02 00:00:00").add(1, "days").locale("id").format("LLLL")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = moment();
      const lastTime = moment(lastTimePaymentDate);
      const diff = lastTime.diff(currentTime, "seconds");
      const formatDiffToTime = moment.utc(diff * 1000).format("HH:mm:ss");

      setCountDownTime(formatDiffToTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function splitterTimeToComponent(time) {
    const timeArray = time.split(":");
    return timeArray.map((item, index) => {
      return (
        <Col
          key={index}
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-evenly",
            flexDirection: "row",
          }}
        >
          <Text style={styles.clockStyle}>{item}</Text>
          {index !== timeArray.length - 1 && (
            <Text style={{ ...styles.bold, marginHorizontal: 4 }}>:</Text>
          )}
        </Col>
      );
    });
  }

  return (
    <ThemedView style={{ paddingHorizontal: 16 }}>
      <Row sty>
        <Col>
          <ThemedText style={styles.bold}>
            Selesaikan Pembayaran Sebelum
          </ThemedText>
        </Col>
        {splitterTimeToComponent(countDownTime)}
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
