import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Text,
  RadioButton,
} from "react-native-paper";
import * as yup from "yup";

import { DateInput } from "@/components/DateInput";
import { editPet, createPet } from "@/services/hostedPetsService";

const schema = yup.object({
  petName: yup.string().required("Nome do pet é obrigatório"),
  species: yup.string().required("Espécie é obrigatória"),
  breed: yup.string().required("Raça é obrigatória"),
  inputDate: yup
    .date()
    .required("Antes de continuar, confirme a datade de entrada"),
  estimatedDeparture: yup
    .date()
    .min(
      yup.ref("inputDate"),
      "Data de saída não pode ser anterior à data de entrada"
    ),
  totalExpectedDaily: yup.number().positive("Deve ser um número positivo"),
  petOwner: yup.string().required("Nome do tutor é obrigatório"),
  contact: yup.string().required("Contato é obrigatório"),
});

export const PetForm = ({ existingPet, mode = "create" }) => {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: existingPet || {},
  });

  useEffect(() => {
    if (mode === "edit" && existingPet) {
      reset(existingPet);
    }
  }, [existingPet, reset, mode]);

  const handleSave = async (data) => {
    console.log("Form data:", data);
    try {
      if (mode === "create") {
        await createPet(data);
        console.log("Pet criado com sucesso:", data);
        setVisible(true);
      } else {
        await editPet(data._id, data);
        console.log("Pet atualizado com sucesso:", data);
        setVisible(true);
      }
    } catch (error) {
      console.error("Erro ao salvar pet:", error);
      setError(true);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Form}>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>{error ? "Erro" : "Sucesso!"}</Dialog.Title>
              <Dialog.Content>
                {error ? (
                  <Text variant="bodyMedium">
                    Um erro ocorreu ao salvar o pet.
                  </Text>
                ) : (
                  <Text variant="bodyMedium">
                    {mode === "create"
                      ? "Um novo pet foi cadastrado."
                      : " O pet foi atualizado."}
                  </Text>
                )}
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => router.back()}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Controller
            control={control}
            name="petName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nome do pet"
                activeUnderlineColor="#708841"
                style={{ backgroundColor: "#c7d5bb5a" }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                left={<TextInput.Icon icon="tag" />}
              />
            )}
          />
          {errors.petName && (
            <Text style={styles.labelError}>{errors.petName?.message}</Text>
          )}

          <Controller
            control={control}
            name="species"
            render={({ field: { onChange, value } }) => (
              <View>
                <RadioButton.Group onValueChange={onChange} value={value}>
                  <View style={styles.radioButton}>
                    <View style={styles.radioButtonContainer}>
                      <RadioButton color="#8BC3D2" value="dog" />
                      <Text>Cachorro</Text>
                    </View>
                    <View style={styles.radioButtonContainer}>
                      <RadioButton color="#E3ADAD" value="cat" />
                      <Text>Gato</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            )}
          />
          {errors.species && (
            <Text style={styles.labelError}>{errors.species?.message}</Text>
          )}

          <Controller
            control={control}
            name="breed"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Raça"
                activeUnderlineColor="#708841"
                style={{ backgroundColor: "#c7d5bb5a" }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                left={<TextInput.Icon icon="paw" />}
              />
            )}
          />
          {errors.breed && (
            <Text style={styles.labelError}>{errors.breed?.message}</Text>
          )}

          <Controller
            control={control}
            name="inputDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <DateInput
                label="Data de entrada"
                icon="calendar"
                value={value || new Date()}
                onChange={onChange}
              />
            )}
          />
          {errors.inputDate && (
            <Text style={styles.labelError}>{errors.inputDate?.message}</Text>
          )}

          <Controller
            control={control}
            name="estimatedDeparture"
            render={({ field: { onChange, onBlur, value } }) => (
              <DateInput
                label="Data de saída"
                icon="calendar-check"
                value={value || new Date()}
                onChange={onChange}
              />
            )}
          />
          {errors.estimatedDeparture && (
            <Text style={styles.labelError}>
              {errors.estimatedDeparture?.message}
            </Text>
          )}

          <Controller
            control={control}
            name="petOwner"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nome do tutor"
                activeUnderlineColor="#708841"
                style={{ backgroundColor: "#c7d5bb5a" }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                left={<TextInput.Icon icon="account" />}
              />
            )}
          />
          {errors.petOwner && (
            <Text style={styles.labelError}>{errors.petOwner?.message}</Text>
          )}

          <Controller
            control={control}
            name="contact"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Contato"
                activeUnderlineColor="#708841"
                style={{ backgroundColor: "#c7d5bb5a" }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                left={<TextInput.Icon icon="phone" />}
              />
            )}
          />
          {errors.contact && (
            <Text style={styles.labelError}>{errors.contact?.message}</Text>
          )}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(handleSave)}
          >
            <Button mode="contained" style={{ backgroundColor: "#708841" }}>
              {mode === "create" ? "Salvar" : "Atualizar"}
            </Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  Form: {
    gap: 30,
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#91162c",
    fontSize: 12,
  },
  saveButton: {
    marginTop: 35,
    alignSelf: "center",
    width: "70%",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
