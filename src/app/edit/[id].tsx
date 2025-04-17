import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { Container } from "@/components/Container";
import { PetForm } from "@/components/PetForm";
import { Pet, getPetById } from "@/services/hostedPetsService";

export default function Edit() {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const [pet, setPet] = useState<Pet | null>(null);

  async function loadPet() {
    try {
      const data = await getPetById(id);
      setPet(data);
      console.log("Pet carregado:", data);
    } catch (error) {
      console.log("Erro ao carregar pet:", error, id);
    }
  }

  useEffect(() => {
    loadPet();
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={pet ? { title: "Editar" } : { title: "Carregando..." }}
      />
      <Container>
        <View style={styles.formContainer}>
          <PetForm mode="edit" existingPet={pet} />
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
