import { View, ActivityIndicator } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

export default function LoadingIndicator() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
      }}
    >
      <ActivityIndicator size="large" color="#A43333" />
      <ThemedText style={{ marginTop: 16 }}>Loading...</ThemedText>
    </View>
  );
}
