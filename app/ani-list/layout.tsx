import { Container } from "@chakra-ui/react";

export default function AniListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container py={{ base: '4', md: '6' }}>
      {children}
    </Container>
  );
}