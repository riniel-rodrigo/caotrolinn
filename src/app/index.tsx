import { useFocusEffect } from "@react-navigation/native";
import { Stack, Link } from "expo-router";
import { useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { FAB, ActivityIndicator } from "react-native-paper";

import { CardPet } from "@/components/Card";
import { Container } from "@/components/Container";
import { Separator } from "@/components/Separator";
import { formatDate } from "@/components/formatDate";
import { getAllPets, Pet } from "@/services/hostedPetsService";

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isloading, setIsLoading] = useState(true);

  async function loadPets() {
    try {
      const data = await getAllPets();
      setPets(data);
      setIsLoading(false);
      console.log("Pets carregados:", data);
    } catch (error) {
      console.log("Erro ao carregar pets:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [])
  );

  return (
    <>
      <Stack.Screen />
      <Container>
        {isloading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating color="#208BB5" size="large" />
          </View>
        ) : (
          <>
            {pets.length === 0 ? (
              <Text style={styles.loadingContainer}>
                Adicione um pet clicando no botão '+' abaixo.
              </Text>
            ) : (
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
                        specie={item.species}
                        title={item.petName}
                        subtitle={item.petOwner}
                        estimatedDeparture={formatDate(item.estimatedDeparture)}
                      />
                    </Link>
                  </TouchableOpacity>
                )}
              />
            )}
          </>
        )}

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
