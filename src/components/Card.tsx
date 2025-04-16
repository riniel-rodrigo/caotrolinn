import { View, StyleSheet, Text } from "react-native";
import { Avatar, Card } from "react-native-paper";

export const CardPet: React.FC<{
  title: string;
  subtitle: string;
  estimatedDeparture: string;
  specie: string;
}> = ({ title, subtitle, estimatedDeparture, specie }) => {

  console.log(specie);
  return (
    <View style={styles.cardContainer}>
      <Card.Title
        title={title}
        subtitle={subtitle}
        titleStyle={{ color: "#0A263B" }}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="paw"
            color="#FFF"
            style={{ backgroundColor: specie === "dog" ? "#8BC3D2" : "#E3ADAD" }}
          />
        )}
        right={(props) => (
          <View style={styles.dateBox}>
            <Text style={styles.date}>{String(estimatedDeparture)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
  },
  dateBox: {
    flex: 1,
    marginTop: 5,
  },
  date: {
    color: "#0a263b94",
    fontSize: 12,
  },
});
