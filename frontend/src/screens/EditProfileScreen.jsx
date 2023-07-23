// Import necessary dependencies and styles
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Input, Button, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

const EditProfileScreen = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        bio: '',
        handles: {
            leetcodeHandle: '',
            codeforcesHandle: '',
        },
    });

    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from the backend and populate the form fields
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:4000/users/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const res = response.data.result;
                    setFormData({
                        firstname: res.firstname,
                        lastname: res.lastname,
                        bio: res.bio || '',
                        handles: {
                            leetcodeHandle: res.handles?.leetcodeHandle || '',
                            codeforcesHandle: res.handles?.codeforcesHandle || '',
                        },
                    });
                })
                .catch((error) => {
                    console.error(error);
                    // Handle any error during the API call
                });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'leetcodeHandle' || name === 'codeforcesHandle') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                handles: {
                    ...prevFormData.handles,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        };
    }


        const handleSubmit = (e) => {
            e.preventDefault();

            const token = localStorage.getItem('token');
            if (token) {
                // Make the PUT request to update the user profile
                axios
                    .put(`http://localhost:4000/users/${params.username}/update-profile`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        console.log('Profile updated successfully:', response.data.result);
                        navigate(`/${params.username}/userprofile`);
                        window.location.reload();
                        // Handle successful update if needed
                    })
                    .catch((error) => {
                        console.error('Error updating profile:', error);
                        // Handle any error during the API call
                    });
            }
        };

        return (
            <Box p={4}>
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
                    Edit Profile
                </Text>
                <Box bg={isDarkMode ? 'gray.800' : 'white'} p={4} borderRadius="lg" boxShadow="lg">
                    <form onSubmit={handleSubmit}>
                        <Box mb={4}>
                            <Text fontWeight="bold">First Name:</Text>
                            <Input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                color={isDarkMode ? 'white' : 'black'}
                            />
                        </Box>
                        <Box mb={4}>
                            <Text fontWeight="bold">Last Name:</Text>
                            <Input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                color={isDarkMode ? 'white' : 'black'}
                            />
                        </Box>

                        <Box mb={4}>
                            <Text fontWeight="bold">Bio:</Text>
                            <Input
                                type="text"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                color={isDarkMode ? 'white' : 'black'}
                            />
                        </Box>
                        <Box mb={4}>
                            <Text fontWeight="bold">LeetCode Handle:</Text>
                            <Input
                                type="text"
                                name="leetcodeHandle"
                                value={formData.handles.leetcodeHandle}
                                onChange={handleChange}
                                color={isDarkMode ? 'white' : 'black'}
                            />
                        </Box>
                        <Box mb={4}>
                            <Text fontWeight="bold">Codeforces Handle:</Text>
                            <Input
                                type="text"
                                name="codeforcesHandle"
                                value={formData.handles.codeforcesHandle}
                                onChange={handleChange}
                                color={isDarkMode ? 'white' : 'black'}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Button type="submit" colorScheme={isDarkMode ? 'teal' : 'blue'}>
                                Save Changes
                            </Button>
                            <RouterLink to="/">
                                <Button ml={2} colorScheme={isDarkMode ? 'gray' : 'blue'} variant="outline">
                                    Cancel
                                </Button>
                            </RouterLink>
                        </Box>
                    </form>
                </Box>
            </Box>
        );
    };

    export default EditProfileScreen;
