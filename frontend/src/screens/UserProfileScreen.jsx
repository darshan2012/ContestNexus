import React, { useState, useEffect } from 'react';
import { useColorMode, Box, Heading, Text, Button, Icon } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';

const UserProfileScreen = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [userProfile, setUserProfile] = useState({});
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [leetCodeData, setLeetCodeData] = useState({});

    const axiosInstance = axios.create({
        baseURL: 'https://leetcode.com/graphql',
        withCredentials: true, // Set this option to true to enable CORS requests with credentials
      });
      
    useEffect(() => {
        // Fetch user profile data from the backend and set it to userProfile state
        axios.get('http://localhost:4000/user/profile').then((response) => {
            setUserProfile(response.data);
        });

        // Fetch user's recent blogs from the backend and set them to recentBlogs state
        axios.get('http://localhost:4000/blogs/recent').then((response) => {
            setRecentBlogs(response.data);
        });

        const query = `
      {
        matchedUser(username: "darshanparmar200d") {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `;

    axiosInstance
            .post('https://leetcode.com/graphql', { query })
            .then((response) => {
                setLeetCodeData(response.data.data.matchedUser);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Function to handle dark/light mode toggling
    const handleModeToggle = () => {
        toggleColorMode();
    };

    return (
        <Box p={4}>
            <Heading as="h1" size="xl">
                User Profile
            </Heading>

            {/* Display user's profile information */}
            <Text>Username: {userProfile.username}</Text>
            <Text>First Name: {userProfile.firstname}</Text>
            <Text>Last Name: {userProfile.lastname}</Text>
            <Text>Bio: {userProfile.bio}</Text>

            {/* Display the option to choose preferred mode */}
            <Button onClick={handleModeToggle}>
                {colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </Button>

            {/* Display user's recent blogs */}
            <Heading as="h2" size="lg" mt={4}>
                Recent Blogs
            </Heading>
            {/* {recentBlogs && recentBlogs.map((blog) => (
            <Box key={blog.id} p={2} border="1px solid" borderColor="gray.200" mt={2}>
            <Text fontSize="lg" fontWeight="bold">
                {blog.title}
            </Text>
            <Text>{blog.content}</Text>
            </Box>
        ))} */}
            <Heading as="h2" size="lg" mt={4}>
                LeetCode Profile
            </Heading>
            <Box p={2} border="1px solid" borderColor="gray.200" mt={2}>
                <Text fontSize="lg" fontWeight="bold">
                    Username: {leetCodeData.username}
                </Text>
                <Text>Reputation: {leetCodeData.reputation}</Text>
                <Link href={`https://leetcode.com/${leetCodeData.username}`} isExternal>
                    View Profile on LeetCode <Icon as={FaCode} />
                </Link>
            </Box>

            {/* Display Codeforces profile data */}
            {/* <Heading as="h2" size="lg" mt={4}>
                Codeforces Profile
            </Heading>
            <Box p={2} border="1px solid" borderColor="gray.200" mt={2}>
                <Text fontSize="lg" fontWeight="bold">
                    Handle: {codeforcesData.handle}
                </Text>
                <Text>Rating: {codeforcesData.rating}</Text>
                <Link href={`https://codeforces.com/profile/${codeforcesData.handle}`} isExternal>
                    View Profile on Codeforces <Icon as={FaGithub} />
                </Link>
            </Box> */}
    </Box >
  );
};

export default UserProfileScreen;
