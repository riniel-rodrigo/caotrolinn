import moment from "moment";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";

import { Separator } from "@/components/Separator";
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

        <Separator />

        <View style={styles.petInfo}>
          <View style={styles.petInfoText}>
            <Text>
              <TextInput.Icon icon="calendar" />
            </Text>
            <Text>Data de entrada: </Text>
            <Text style={styles.span}>
              {moment(pet.inputDate).format("DD/MM/YYYY")}
            </Text>
          </View>

          <View style={styles.petInfoText}>
            <Text>
              <TextInput.Icon icon="calendar-clock" />
            </Text>
            <Text>Diárias até o momento: </Text>
            <Text style={styles.span}>{pet.currentDailyCount}</Text>
          </View>

          <View style={styles.petInfoText}>
            <Text>
              <TextInput.Icon icon="calendar-check" />
            </Text>
            <Text>Previsão de data de saída: </Text>
            <Text style={styles.span}>
              {moment(pet.estimatedDeparture).format("DD/MM/YYYY")}
            </Text>
          </View>

          <View style={styles.petInfoText}>
            <Text>
              <TextInput.Icon icon="clock-outline" />
            </Text>
            <Text>Diárias totais previstas: </Text>
            <Text style={styles.span}>{pet.totalExpectedDaily}</Text>
          </View>
        </View>
      </Surface>

      <Surface style={styles.surfaceOwner} elevation={1}>
        <View style={styles.petInfo}>
          <View style={styles.petInfoText}>
            <Text>
              <TextInput.Icon icon="account" />
            </Text>
            <Text style={styles.petInfoText}>
              Nome do tutor: <Text style={styles.span}>{pet.petOwner}</Text>
            </Text>
          </View>

          <View style={styles.petInfoText}>
            <Text>
              <TextInput.Icon icon="phone" />
            </Text>
            <Text style={styles.petInfoText}>
              Contato: <Text style={styles.span}>{pet.contact}</Text>
            </Text>
          </View>
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
    height: "50%",
    width: "100%",
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
    gap: 18,
  },
  petInfoText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
    justifyContent: "space-around",
  },
  OwnerContact: {
    fontSize: 18,
    color: "#0A263B",
  },
});
