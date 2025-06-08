import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid minH='100%' gridTemplateRows='1fr auto'>
      <GridItem as="main">
        {children}
      </GridItem>
      <Footer/>
    </Grid>
  );
}