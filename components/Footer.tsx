import { Container, Image, Stack, Text, VStack, HStack } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import AuthButton from "./ui/AuthButton";

export default function Footer() {
  return (
    <Container as="footer" py={{ base: '4', md: '6' }}>
      <Stack direction="row" justify="space-between" align="center">
        <VStack align='start'>
          <Image h={55} src='https://leonardo.ai/wp-content/uploads/2023/07/logo-leonardo-ai.svg'/>
          <Text>Leonardo AI, Web Team Challenge v3.5</Text>
        </VStack>
        <HStack gap={2}>
          <AuthButton />
          <ColorModeButton />
        </HStack>
      </Stack>
    </Container>
  );
}
