import { Stack } from "expo-router";
import { Text } from "react-native";

import { Container } from "@/components/Container";

export default function Create() {
  return (
    <>
      <Stack.Screen options={{ title: "Criar novo" }} />
      <Container>
        <Text>Create screen</Text>
      </Container>
    </>
  );
}
