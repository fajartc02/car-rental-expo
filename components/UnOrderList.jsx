import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

export default function UnOrderList(props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.textLabel}>{"\u2022"}</ThemedText>
      <ThemedText style={styles.textLabel}>{props.text}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingLeft: 15,
  },
  textLabel: {
    fontSize: 14,
    color: "#8A8A8A",
    fontWeight: "bold",
  },
});
