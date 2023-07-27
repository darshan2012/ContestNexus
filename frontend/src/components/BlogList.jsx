import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.log('Error fetching blogs:', error);
    }
  };

  return (
    <Box>
      <Heading as="h1" mb={4}>All Blogs</Heading>
      {blogs.map((blog) => (
        <Box key={blog._id} border="1px solid #ccc" p={4} mb={4}>
          <Link to={`/blogs/${blog._id}`}>
            <Heading as="h2" size="md">{blog.title}</Heading>
          </Link>
          <Text>{blog.description}</Text>
          <Text color="gray.500">Author: {blog.author}</Text>
        </Box>
      ))}
      <Link to="/blogs/create">
        <Button colorScheme="blue">Create Blog</Button>
      </Link>
    </Box>
  );
};

export default BlogList;
