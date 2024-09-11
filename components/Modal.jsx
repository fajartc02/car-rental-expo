import { View, Text, Modal } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";

// props children is automaticaly load from parent when wrapped in ModalPopup
export default function ModalPopup({ visible, children }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        {children}
      </ThemedView>
    </Modal>
  );
}
