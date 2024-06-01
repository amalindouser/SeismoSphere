import React from 'react';
import {
  Box, Flex, Heading, Spacer, IconButton, Link,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

function HeaderNav() {
  const colorPalette = {
    background: '#FAFAFA',
    secondary: '#C7EEFF',
    highlight: '#0077C0',
    accent: '#1D242B',
  };

  return (
    <Box bg={colorPalette.background} p={4} boxShadow="md">
      <Flex alignItems="center" maxW="1200px" mx="auto">
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <Heading
            as="h1"
            size="lg"
            color={colorPalette.accent}
            fontFamily="'Poppins', sans-serif"
            fontWeight="600"
          >
            SeismoSphere
          </Heading>
        </Link>
        <Spacer />
        <IconButton
          aria-label="Menu"
          icon={<FaBars />}
          colorScheme="teal"
          variant="outline"
        />
      </Flex>
    </Box>
  );
}

export default HeaderNav;
