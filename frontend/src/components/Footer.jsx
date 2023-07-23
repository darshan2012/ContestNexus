import { Box, chakra, Container, Stack, Text, useColorModeValue, Link, Icon, Flex, HStack, Center } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <Flex
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      position="fixed"
      // marginTop={5}
      alignItems={"Center"}
      bottom={0}
      left={0}
      width="100%"
      height={"4VH"}
    >

      <Flex gap={2} ms={"110px"} >
        
      <Text  fontWeight="bold" fontSize="md">
        Keep coding
      </Text>
      <Icon as={FaHeart}  color="dark.500" boxSize={5} />
      </Flex>

    </Flex>
  );
}
