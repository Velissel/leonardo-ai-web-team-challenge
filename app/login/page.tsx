'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Field,
  Alert,
} from '@chakra-ui/react';
import { setUser } from '@/store/slices/userSlice';
import { RootState } from '@/store/store';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState(user.username || '');
  const [jobTitle, setJobTitle] = useState(user.jobTitle || '');
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the form submission.
   * This is a simple example for validation. In a real-world application,
   * consider using a battle-tested library like Formik or React Hook Form
   * for more robust form handling, validation, and state management.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && username.trim() && jobTitle && jobTitle.trim()) {
      setError(null);
      dispatch(setUser({ username, jobTitle }));
      // cookie hydrate is async, need to push page transition to next tick
      setTimeout(() => {
        router.push('/ani-list');
      }, 0);
    } else {
      setError('Username and Job Title cannot be empty.');
    }
  };

  return (
    <Container centerContent py={10}>
      <Box borderWidth="1px" borderRadius="lg" p={8} boxShadow="lg" minW="sm">
        <form onSubmit={handleSubmit}>
          <VStack gap={6}>
            <Heading as="h1" size="lg" textAlign="center">
              Login
            </Heading>
            {error && (
              <Alert.Root status="error" borderRadius="md">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Error!</Alert.Title>
                  <Alert.Description>{error}</Alert.Description>
                </Alert.Content>
              </Alert.Root>
            )}
            <Field.Root required>
              <Field.Label>
                Username <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Job Title <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Enter your job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </Field.Root>
            <Button type="submit" colorScheme="blue" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
