import { Stack, useLocalSearchParams, Redirect } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '@/components/Container';

export default function Edit() {
  const { id } = useLocalSearchParams();

  if (!id) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: `Editar ${id}` }} />
      <Container>
        <Text>Details screen - {id}</Text>
      </Container>
    </>
  );
}
