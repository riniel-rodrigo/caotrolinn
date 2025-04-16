import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export default function Layout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerTintColor: "#0C283D",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitleAlign: "center",
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18, color: "#09526e" }}>
                  Cãotrolinn{" "}
                </Text>
                <Ionicons name="paw-outline" size={22} color="#09526e" />
              </View>
            ),
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
