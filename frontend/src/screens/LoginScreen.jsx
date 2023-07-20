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
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [backendError, setBackendError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe((prevValue) => !prevValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError('');

    try {
      const response = await axios.post('http://localhost:4000/auth/login', { email, password });
      
      const { token } = response.data;

      // Store JWT token in local storage
      localStorage.setItem('token', token);

      // Redirect to the homepage
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setBackendError(error.response.data.message);
      } else {
        setBackendError('An error occurred. Please try again.');
      }
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
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={handleEmailChange} />
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
