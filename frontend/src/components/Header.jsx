import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  // Link,
  useColorMode,
  useColorModeValue,
  Stack,
  Center,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

const NavLink = ({ children, to }) => (
  <Link
    to={to}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}  
    color={useColorModeValue('gray.800', 'gray.200')}
    fontWeight="bold"
  >
    {children}
  </Link>
);

export default function Header({user}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn,setIsLoggedIn] = useState(user != undefined);

  const handleLogout = () => {
    // Perform logout logic and remove the JWT token from local storage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    user = null;
    window.location.reload();
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Link to="/">ContestNexus</Link>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            
              <NavLink to="/home">Home</NavLink>
            
            <NavLink to="/contests">Contests</NavLink>
            <NavLink to="/stalk">SearchCoder</NavLink>
            <NavLink to="http://localhost:3000">Code</NavLink>
            {/* <NavLink to="/about">About us</NavLink> */}
            {/* <NavLink to="/contact">Contact</NavLink> */}
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7} align="center">
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={{
                      // sm:'sm',
                      md:'md'}}
                    name={user.firstname}
                    colorScheme='coffee'
                    // src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <Center>
                    <Avatar
                      size={'2xl'}
                      name={user.firstname}
                      // src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <Center>
                    <p>{user.username}</p>
                  </Center>
                  <MenuDivider />
                  <Link to={'/'+user.username+'/userprofile'}><MenuItem>Account Settings</MenuItem></Link>
                  <Link to={'/'+user.username+'/editprofile'}><MenuItem>Edit Profile</MenuItem></Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Stack alignItems={'center'} flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
                <Link to={'/users/login'}>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  >
                  Sign In
                </Button>
                  </Link>
                <Link to={'/users/register'}>
                
                <Button
                  as={'a'}
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'teal'}
                  _hover={{
                    bg: 'teal.300',
                  }}
                  >
                  Sign Up
                </Button>
                  </Link>
              </Stack>
            )}
          </Stack>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            
              <NavLink to="/home">Home</NavLink>
           
            <NavLink to="/contests">Contests</NavLink>
            <NavLink to="/about">About us</NavLink>
            {/* <NavLink to="/contact">Contact</NavLink> */}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
