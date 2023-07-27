import React, { useEffect, useState } from 'react';
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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

export default function RegisterScreen({showLogo,setShowlogo}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    method: 'local',
    handles: {
      leetcodeHandle: '',
      codeforcesHandle: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  useEffect(()=>{
    setShowlogo(true);
  },[])
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'leetcodeHandle' || id === 'codeforcesHandle') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        handles: {
          ...prevFormData.handles,
          [id]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setBackendError('');

    const { username, firstname, email, password, handles } = formData;
    if (!username || !firstname || !email || !password) {
      setBackendError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/users/signup', formData);
      if (response.status === 200) {
        setVerificationEmailSent(true);
      } else if (response.status === 409) {
        setBackendError(response.err);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.err) {
        setBackendError(error.response.data.err);
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
                <FormControl id="firstname" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" id="firstname" onChange={handleChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastname">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" id="lastname" onChange={handleChange} />
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
            <FormControl id="leetcodeHandle">
              <FormLabel>LeetCode Handle</FormLabel>
              <Input type="text" id="leetcodeHandle" onChange={handleChange} />
            </FormControl>
            <FormControl id="codeforcesHandle">
              <FormLabel>Codeforces Handle</FormLabel>
              <Input type="text" id="codeforcesHandle" onChange={handleChange} />
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
