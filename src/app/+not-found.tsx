import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { Container } from "@/components/Container";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Container>
        <Text style={styles.title}>Essa tela não existe.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Voltar para tela inicial!</Text>
        </Link>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    paddingVertical: 16,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
