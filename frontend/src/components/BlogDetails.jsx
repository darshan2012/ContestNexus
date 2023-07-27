import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);
  
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/blogs/get/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.log('Error fetching blog:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/blogs/delete/${id}`);
      // Redirect to the blog list after successful deletion
      window.location.replace('/blogs');
    } catch (error) {
      console.log('Error deleting blog:', error);
    }
  };

  return (
    <Box>
      {blog ? (
        <Box border="1px solid #ccc" p={4} mb={4}>
          <Heading as="h2" size="md">{blog.title}</Heading>
          <Text>{blog.description}</Text>
          <Text color="gray.500">Author: {blog.author}</Text>
          <Text mt={4}>{blog.content}</Text>
          <Link to={`/blogs/edit/${id}`}>
            <Button colorScheme="blue" mt={4}>Edit Blog</Button>
          </Link>
          <Button colorScheme="red" mt={4} onClick={handleDelete}>Delete Blog</Button>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default BlogDetails;
