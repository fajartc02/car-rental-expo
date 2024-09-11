import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function CustomInput(props) {
  return (
    <View
      style={{
        flexDirection: "column",
        width: props.width ? props.width : "80%",
      }}
    >
      {!props?.isLabel ? (
        <ThemedText
          style={{
            marginVertical: 9,
            fontWeight: props?.isNotBoldLabel ? "normal" : "bold",
          }}
        >
          {props.label}
        </ThemedText>
      ) : (
        ""
      )}
      {props?.icon ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            placeholder={props.placeholder}
            placeholderTextColor={"grey"}
            value={props?.value}
            editable={props.editable}
          />
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            <Ionicons name={props.icon} size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={{ ...styles.input, ...props.styles }}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          placeholder={props.placeholder}
          placeholderTextColor={"grey"}
          value={props?.value}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
  },
  inputStyle: {
    flex: 1,
  },
});
