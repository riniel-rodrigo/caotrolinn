import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

import { Container } from "@/components/Container";
import { PetForm } from "@/components/PetForm";

export default function Create() {
  return (
    <>
      <Stack.Screen options={{ title: "Criar novo" }} />
      <Container>
        <View style={styles.formContainer}>
          <PetForm mode="create" existingPet={{}} />
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "space-between",
    paddingTop: 30,
    height: "100%",
  },
});
