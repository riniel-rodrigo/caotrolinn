import { Stack, Link } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FAB } from "react-native-paper";

import { CardPet } from "@/components/Card";
import { Container } from "@/components/Container";
import { Separator } from "@/components/Separator";
import { getAllPets, Pet } from "@/services/hostedPetsService";

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);

  async function loadPets() {
    try {
      const data = await getAllPets();
      setPets(data);
      console.log("Pets carregados:", data);
    } catch (error) {
      console.log("Erro ao carregar pets:", error);
    }
  }

  useEffect(() => {
    loadPets();
  }, []);

  return (
    <>
      <Stack.Screen />
      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          keyExtractor={(item) => item._id}
          data={pets}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Link
                href={{
                  pathname: "/details/[id]",
                  params: { id: item._id },
                }}
              >
                <CardPet
                  title={item.petName}
                  subtitle={item.petOwner}
                  estimatedDeparture={item.estimatedDeparture}
                />
              </Link>
            </TouchableOpacity>
          )}
        />

        <Link href={{ pathname: "/create" }} asChild>
          <FAB color="#FFF" style={styles.fab} icon="plus" />
        </Link>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#1F8CB7",
  },
});
