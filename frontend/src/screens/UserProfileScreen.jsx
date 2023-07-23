import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Spinner,
    Link,
    Box,
    Text,
    Avatar,
    Center,
    Container,
    Grid,
    GridItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode,
    Button,
} from '@chakra-ui/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import UserCodeforcesData from '../components/UserCodeforcesData';
import UserLeetCodeData from './UserLeetcodeData';

const UserProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const params = useParams();
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // Fetch user data from the backend API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/users/${params.username}`);
                setUserData(response.data.result);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [params.username]);

    if (!userData) {
        return (
            <Center height="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    const { leetcodeHandle, codeforcesHandle } = userData.handles || {};

    const handleTabChange = (index) => {
        setSelectedTabIndex(index);
    };

    return (
        <Box>
            <Box bg={isDarkMode ? 'gray.900' : 'gray.100'}>
                <Container maxW="container.lg" py={8}>
                    <Center>
                        <Avatar size="xl" name={`${userData.firstname} ${userData.lastname}`} />
                    </Center>
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center" color={isDarkMode ? 'white' : 'black'}>
                        {userData.firstname} {userData.lastname}
                    </Text>
                    <Text fontSize="lg" textAlign="center" color="gray.500" mt={2}>
                        @{userData.username}
                    </Text>
                    <Text fontSize="lg" textAlign="center" mt={2} color={isDarkMode ? 'gray.300' : 'black'}>
                        Email: {userData.email}
                    </Text>
                    <Text fontSize="lg" textAlign="center" mt={2} color={isDarkMode ? 'gray.300' : 'black'}>
                        Bio: {userData.bio || 'No bio available'}
                    </Text>

                    <Box display="flex" justifyContent="center" mt={4}>
                        {leetcodeHandle && (
                            <Link href={`https://leetcode.com/${leetcodeHandle}`} isExternal color={isDarkMode ? 'teal.300' : 'blue.500'}>
                                <Text fontSize="lg" fontWeight="bold" mx={2}>
                                    LeetCode Handle
                                </Text>
                            </Link>
                        )}
                        {codeforcesHandle && (
                            <Link href={`https://codeforces.com/profile/${codeforcesHandle}`} isExternal color={isDarkMode ? 'teal.300' : 'blue.500'}>
                                <Text fontSize="lg" fontWeight="bold" mx={2}>
                                    Codeforces Handle
                                </Text>
                            </Link>
                        )}
                    </Box>
                    <Box my={4} textAlign="center">
                        <RouterLink to={`/${params.username}/editprofile`}>
                            <Button colorScheme={isDarkMode ? 'teal' : 'blue'}>Edit Profile</Button>
                        </RouterLink>
                    </Box>
                </Container>
            </Box>
            <Box bg={isDarkMode ? 'gray.800' : 'gray.100'} py={10}>
                <Tabs isFitted variant="enclosed" colorScheme={isDarkMode ? 'teal' : 'blue'} onChange={handleTabChange} >
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: isDarkMode ? 'teal.500' : 'blue.500' }}>LeetCode</Tab>
                        <Tab _selected={{ color: 'white', bg: isDarkMode ? 'teal.500' : 'blue.500' }}>Codeforces</Tab>
                    </TabList>
                    <TabPanels mt={8}>
                        <TabPanel>
                            <Box
                                bg={isDarkMode ? 'gray.800' : 'white'}
                                p={4}
                                borderRadius="lg"
                                boxShadow="lg"
                                border="1px solid"
                                borderColor={isDarkMode ? 'gray.600' : 'gray.200'}
                            >
                                <UserLeetCodeData username={params.username} />
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box
                                bg={isDarkMode ? 'gray.800' : 'white'}
                                p={4}
                                borderRadius="lg"
                                boxShadow="lg"
                                border="1px solid"
                                borderColor={isDarkMode ? 'gray.600' : 'gray.200'}
                            >
                                <UserCodeforcesData username={params.username} />
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </Box>
    );
};

export default UserProfileScreen;
