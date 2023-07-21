import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Box, Text, Avatar, Center, Stack, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const UserProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const [leetcodeData, setLeetcodeData] = useState(null);
    const params = useParams();

    // Fetch user data from the backend API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/users/${params.username}`);
                const leetcode = await axios.get(`http://localhost:4000/users/${params.username}/leetcode`);
                setLeetcodeData(leetcode.data.result); // Update to use leetcode.data directly
                console.log(leetcode)
                setUserData(response.data.result);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [params.username]);

    if (!userData || !leetcodeData) {
        return <div>Loading...</div>;
    }

    const { leetcodeHandle, codeforcesHandle } = userData.handles || {};

    return (
        <Box>
            <Box p={4} boxShadow="md" maxW="500px" mx="auto">
                <Center>
                    <Avatar size="xl" name={userData.firstname} />
                </Center>
                <Text mt={4} fontSize="xl" fontWeight="bold" textAlign="center">
                    {userData.firstname} {userData.lastname}
                </Text>
                <Text mt={2} fontSize="md" textAlign="center">
                    Username: {userData.username}
                </Text>
                <Text mt={2} fontSize="md" textAlign="center">
                    Email: {userData.email}
                </Text>
                <Text mt={2} fontSize="md" textAlign="center">
                    Bio: {userData.bio || 'No bio available'}
                </Text>
                <Text mt={2} fontSize="md" textAlign="center">
                    LeetCode Handle: {leetcodeHandle ? <Link href={`https://leetcode.com/${leetcodeHandle}`} isExternal>{leetcodeHandle}</Link> : 'Not available'}
                </Text>
                <Text mt={2} fontSize="md" textAlign="center">
                    Codeforces Handle: {codeforcesHandle ? <Link href={`https://codeforces.com/profile/${codeforcesHandle}`} isExternal>{codeforcesHandle}</Link> : 'Not available'}
                </Text>
            </Box>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
                        LeetCode Data
                    </Text>
            {leetcodeData && leetcodeData.length > 0 && (
                <HStack spacing={4} mt={4} justify="center"> {/* Add `justify="center"` to center align the items */}
                    
                    {leetcodeData.map((item, index) => (
                        <Box key={index} p={2} borderRadius="md" boxShadow="md">
                            <Text fontSize="md">
                                <strong>Difficulty:</strong> {item.difficulty}
                            </Text>
                            <Text fontSize="md">
                                <strong>Count:</strong> {item.count}
                            </Text>
                            <Text fontSize="md">
                                <strong>Submissions:</strong> {item.submissions}
                            </Text>
                        </Box>
                    ))}
                </HStack>
            )}

        </Box>
    );
};

export default UserProfileScreen;
