import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';

function Legend() {
  return (
    <Box
      position="absolute"
      bottom="12px"
      left="50%"
      transform="translateX(-50%)"
      bg="white"
      p={2}
      borderRadius="lg"
      zIndex="1000"
      width="60%"
      maxWidth="400px"
    >
      <HStack justify="space-between" spacing={4}>
        <HStack spacing={2} alignItems="center">
          <Box bg="red" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" alignSelf="center">7.0+</Text>
        </HStack>
        <HStack spacing={2} alignItems="center">
          <Box bg="orange" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" alignSelf="center">6.0 - 6.9</Text>
        </HStack>
        <HStack spacing={2} alignItems="center">
          <Box bg="yellow" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" alignSelf="center">5.5 - 5.9</Text>
        </HStack>
        <HStack spacing={2} alignItems="center">
          <Box bg="green" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" alignSelf="center">4.5 - 5.4</Text>
        </HStack>
        <HStack spacing={2} alignItems="center">
          <Box bg="blue" w="15px" h="15px" borderRadius="50%" border="2px solid #fff" />
          <Text fontSize="sm" alignSelf="center">&lt; 4.5</Text>
        </HStack>
      </HStack>
    </Box>
  );
}

export default Legend;
