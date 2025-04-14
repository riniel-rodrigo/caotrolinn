import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '@/components/Container';

export default function Edit() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Editar' }} />
      <Container>
          <Text>Edit screen for {name}</Text>
      </Container> 
    </>
  );
}
