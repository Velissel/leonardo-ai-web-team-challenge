import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Container py={{ base: '4', md: '6' }}>
      <Stack
          as={Box}
          textAlign={'center'}
          gap={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Leonardo AI, <br />
            <Text as={'span'} color={'green.400'}>
              Web Team Challenge v3.5
            </Text>
          </Heading>
          <Stack
            direction={'column'}
            gap={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              
            >
              <Link href='/login'>Login</Link>
            </Button>
            <Button colorScheme={'blue'} size={'sm'}>
              <Link href='/ani-list'>View List</Link>
            </Button>
          </Stack>
        </Stack>
    </Container>
  );
}
