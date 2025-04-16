import { Stack, useLocalSearchParams, Link, useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";

import { Container } from "@/components/Container";
import { DetailCard } from "@/components/DetailCard";
import { Pet, getPetById, deletePet } from "@/services/hostedPetsService";

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
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

  async function handleDeletePet() {
    try {
      await deletePet(id);
      router.back();
      console.log("Pet deletado com sucesso:", id);
    } catch (error) {
      console.log("Erro ao deletar pet:", error, id);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPet();
    }, [id])
  );

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
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                  <Text variant="bodyMedium">
                    Tem certeza que deseja apagar este pet?
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    onPress={() => {
                      setVisible(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onPress={() => handleDeletePet()}>Deletar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            <DetailCard pet={pet} />

            <View style={styles.actionButtons}>
              <Button
                icon="delete"
                mode="outlined"
                textColor="#500101"
                onPress={() => {
                  setVisible(true);
                }}
              >
                Apagar
              </Button>

              <Link href={{ pathname: "/edit/[id]", params: { id } }} asChild>
                <Button icon="pencil" mode="outlined" textColor="#505f2f">
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
