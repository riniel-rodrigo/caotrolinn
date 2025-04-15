import { Stack, useLocalSearchParams, Link } from "expo-router";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import { Container } from "@/components/Container";
import { DetailCard } from "@/components/DetailCard";
import { Pet, getPetById } from "@/services/hostedPetsService";

export default function Details() {
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
        options={
          pet
            ? { title: `${pet?.petName} - ${pet?.petOwner}` }
            : { title: "Carregando..." }
        }
      />
      <Container>
        {pet ? (
          <>
            <DetailCard pet={pet} />

            <View style={styles.actionButtons}>
              <Button
                icon="delete"
                mode="outlined"
                textColor="#500101"
                onPress={() => console.log("Pressed")}
              >
                Apagar
              </Button>

              <Link href={{ pathname: "/edit/[id]", params: { id } }} asChild>
                <Button
                  icon="pencil"
                  mode="outlined"
                  textColor="#505f2f"
                  onPress={() => console.log("Pressed")}
                >
                  Editar
                </Button>
              </Link>
            </View>
          </>
        ) : (
          <ActivityIndicator
            animating
            color="#208BB5"
            size="large"
            style={{
              width: "100%",
              height: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
});
