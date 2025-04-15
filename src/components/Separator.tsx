import { View, StyleSheet } from "react-native";

export const Separator: React.FC = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
});
