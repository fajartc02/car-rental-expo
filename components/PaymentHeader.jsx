import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Col, Row } from "./Grid";
import { ThemedText } from "./ThemedText";

import Constants from "expo-constants";
import { router } from "expo-router";

export default function PaymentHeader({ children, prevStep }) {
  return (
    <Row style={styles.header} gap={8}>
      <Col>
        <Pressable onPress={() => prevStep()}>
          <ThemedText>
            <Ionicons name="arrow-back" size={24} color="black" />
          </ThemedText>
        </Pressable>
      </Col>
      <Col style={{ justifyContent: "center" }}>{children}</Col>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 16,
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
  textBold: {
    fontWeight: "bold",
  },
  bold: {
    marginTop: 16,
  },
});
