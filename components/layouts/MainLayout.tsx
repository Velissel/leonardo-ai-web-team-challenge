import { Box, Flex } from "@chakra-ui/react";
import Footer from "../Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex direction='column' minH='100%'>
      <Box as="main" flex={1}>
        {children}
      </Box>
      <Footer/>
    </Flex>
  );
}