import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '@/components/Container';

export default function Details() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
      <Text>Details screen</Text>
      <Link href={{ pathname: '/edit', params: { name: 'Dan' } }} asChild>
          <Text>Editar registro</Text>
      </Link>
      </Container>
    </>
  );
}
