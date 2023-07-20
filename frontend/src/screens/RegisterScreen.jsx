import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    method:'local',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setBackendError('');
  
    // Validate form fields
    const { username, firstName, email, password } = formData;
    if (!username || !firstName || !email || !password) {
      setBackendError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/auth/signup', formData);
      if (response.status === 200) {
        setVerificationEmailSent(true);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setBackendError(error.response.data.message);
      } else {
        setBackendError('An error occurred. Please try again.');
      }
    }
  
    setIsLoading(false);
  };
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" id="username" onChange={handleChange} />
              </FormControl>
            </Box>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" id="firstName" onChange={handleChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" id="lastName" onChange={handleChange} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" id="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  onChange={handleChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={isLoading}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            {backendError && (
              <Text color="red.500" fontSize="sm" align="center">
                {backendError}
              </Text>
            )}
            {verificationEmailSent && (
              <Text color="green.500" fontSize="sm" align="center">
                Verification email sent! Please check your inbox.
              </Text>
            )}
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link to={'/users/login'} color={'blue.400'}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
