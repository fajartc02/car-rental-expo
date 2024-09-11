import { Stack } from "expo-router";
import DetailTitle from "@/components/DetailTitle";
import { ThemedText } from "@/components/ThemedText";

export default function ListCarLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: (props) => <DetailTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="details/payment"
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: (props) => (
            <DetailTitle
              {...props}
              title={
                <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
                  Pembayaran
                </ThemedText>
              }
            />
          ),
        }}
      />
    </Stack>
  );
}
