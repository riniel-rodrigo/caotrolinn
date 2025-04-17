import { useFocusEffect } from "@react-navigation/native";
import { Stack, Link } from "expo-router";
import moment from "moment";
import { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Button,
} from "react-native";
import { FAB, ActivityIndicator } from "react-native-paper";

import { CardPet } from "@/components/Card";
import { Container } from "@/components/Container";
import { Separator } from "@/components/Separator";
import { getAllPets, Pet } from "@/services/hostedPetsService";

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [showRetry, setShowRetry] = useState(false);

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

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isloading) {
      timeout = setTimeout(() => {
        setShowRetry(true);
      }, 10000);
    }
    return () => clearTimeout(timeout);
  }, [isloading]);

  return (
    <>
      <Stack.Screen />
      <Container>
        {isloading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating color="#208BB5" size="large" />
            {showRetry && (
              <View style={{ marginTop: 40 }}>
                <Button
                  title="Tentar novamente"
                  onPress={loadPets}
                  color="#208BB5"
                />
              </View>
            )}
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
