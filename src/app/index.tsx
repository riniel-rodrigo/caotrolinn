import { Stack, Link } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '@/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Caotrolinn' }} />
      <Container>
      <Text>Home screen</Text>
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Text>Ver detalhes do registro</Text>
        </Link>
      </Container>
    </>
  );
}
