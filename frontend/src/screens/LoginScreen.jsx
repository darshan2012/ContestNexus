import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [method,setMethod] = useState('local');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUsingEmail, setIsUsingEmail] = useState(true);
  const navigate = useNavigate();

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe((prevValue) => !prevValue);
  };

  const handleLoginTypeChange = () => {
    setIsUsingEmail((prevValue) => !prevValue);
    setBackendError('');
    setIdentifier('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError('');
    setIsLoading(true); // Start loading state

    try {
      const loginData = isUsingEmail
        ? { email: identifier, password, method }
        : { username: identifier, password, method };
      const response = await axios.post('http://localhost:4000/auth/signin', loginData);

      if (response.status === 200) {
        console.log(response.data);
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/');
        window.location.reload(); // This will force a page refresh
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.err) {
        console.log("Error:", error);
        setBackendError(error.response.data.err);
      } else {
        console.log(error);
        setBackendError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false); // End loading state after API call is completed
    }
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
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="identifier" isRequired>
                <FormLabel>{isUsingEmail ? 'Email address' : 'Username'}</FormLabel>
                <Input type={isUsingEmail ? 'email' : 'text'} value={identifier} onChange={handleIdentifierChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={handlePasswordChange} />
              </FormControl>
              <Stack spacing={6}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Checkbox isChecked={rememberMe} onChange={handleRememberMeChange}>
                    Remember me
                  </Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
          {backendError && (
            <Text color="red.500" fontSize="sm" align="center">
              {backendError}
            </Text>
          )}
          <Stack pt={6}>
            <Text align={'center'}>
              New user? <Link to={'/users/register'} style={{ color: 'lightblue' }}>Sign up</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
