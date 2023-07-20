import { Box, chakra, Container, Stack, Text, useColorModeValue, Link, Icon, Flex, HStack, Center } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <Flex
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      position="fixed"
      // marginTop={5}
      // alignItems={"Center"}
      bottom={0}
      left={0}
      width="100%"
      justifyContent={'space-around'}
    >

      
      <Text fontWeight="bold" fontSize="xs">
        Keep coding
      </Text>
      <Icon as={FaHeart} color="red.500" boxSize={5} />

    </Flex>
  );
}
