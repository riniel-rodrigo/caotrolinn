import React from "react";
import { View, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

import { formatDate } from "@/components/formatDate";
import { Pet } from "@/services/hostedPetsService";

type DetailCardProps = {
  pet: Pet;
};

export const DetailCard: React.FC<DetailCardProps> = ({ pet }) => {
  return (
    <View style={styles.infoPetContainer}>
      <Surface style={styles.surfacePet} elevation={1}>
        <View style={styles.petHeader}>
          <Text style={styles.petName}>{pet.petName}</Text>

          <View style={styles.petCharacter}>
            <Text>{pet.species === "dog" ? "Cachorro" : "Gato"}</Text>
            <Text>{pet.breed}</Text>
          </View>
        </View>

        <View style={styles.petInfo}>
          <Text style={styles.petInfoText}>
            Data de entrada:{" "}
            <Text style={styles.span}>{formatDate(pet.inputDate)}</Text>
          </Text>

          <Text style={styles.petInfoText}>
            Diárias até o momento:{" "}
            <Text style={styles.span}>{pet.dailyRate}</Text>
          </Text>

          <Text style={styles.petInfoText}>
            Previsão de data de saída:{" "}
            <Text style={styles.span}>
              {formatDate(pet.estimatedDeparture)}
            </Text>
          </Text>

          <Text style={styles.petInfoText}>
            Diárias totais previstas:{" "}
            <Text style={styles.span}>{pet.totalExpectedDaily}</Text>
          </Text>
        </View>
      </Surface>

      <Surface style={styles.surfaceOwner} elevation={1}>
        <View style={styles.petInfo}>
          <Text style={styles.petInfoText}>
            Nome do tutor: <Text style={styles.span}>{pet.petOwner}</Text>
          </Text>

          <Text style={styles.petInfoText}>
            Contato: <Text style={styles.span}>{pet.contact}</Text>
          </Text>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  infoPetContainer: {
    flex: 1,
    paddingTop: 50,
    gap: 30,
  },
  surfacePet: {
    padding: 16,
    borderRadius: 10,
    height: "35%",
    width: "100%",
    backgroundColor: "#d9e7eb",
    justifyContent: "space-around",
  },
  petHeader: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petName: {
    fontSize: 40,
    color: "#0A263B",
  },
  petCharacter: {
    alignItems: "center",
    justifyContent: "center",
    color: "#0A263B",
  },
  petInfo: {
    gap: 8,
  },
  petInfoText: {
    fontSize: 17,
  },
  span: {
    fontWeight: "bold",
    color: "#0A263B",
  },
  surfaceOwner: {
    padding: 16,
    borderRadius: 10,
    height: "20%",
    width: "100%",
    backgroundColor: "#d9e7eb",
    justifyContent: "space-around",
  },
  OwnerContact: {
    fontSize: 18,
    color: "#0A263B",
  },
});
