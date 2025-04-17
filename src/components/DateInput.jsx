import moment from "moment";
import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { TextInput, Button, Modal, Portal, Text } from "react-native-paper";

export const DateInput = ({ value, onChange, label, icon }) => {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  const addDay = () => {
    const newDate = new Date(tempDate);
    newDate.setDate(newDate.getDate() + 1);
    setTempDate(newDate);
  };

  const subtractDay = () => {
    const newDate = new Date(tempDate);
    newDate.setDate(newDate.getDate() - 1);
    setTempDate(newDate);
  };

  const confirmDate = () => {
    onChange(tempDate);
    setShow(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput
          label={label}
          activeUnderlineColor="#708841"
          style={{ backgroundColor: "#c7d5bb5a" }}
          value={value ? moment(value).format("DD/MM/YYYY") : ""}
          left={<TextInput.Icon icon={icon} />}
          editable={false}
        />
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={show}
          onDismiss={() => setShow(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.title}>Selecione a data</Text>
          <Text style={styles.dateDisplay}>
            {moment(tempDate).format("DD/MM/YYYY")}
          </Text>

          <View style={styles.controls}>
            <Button textColor="#1F8CB7" onPress={subtractDay} icon="minus">
              Dia anterior
            </Button>
            <Button textColor="#1F8CB7" onPress={addDay} icon="plus">
              Próximo dia
            </Button>
          </View>

          <Button
            mode="contained"
            style={styles.confirmButton}
            onPress={confirmDate}
          >
            Confirmar
          </Button>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateDisplay: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#708841",
  },
});
