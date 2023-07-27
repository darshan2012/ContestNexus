import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios';

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    author: '',
    description: '',
    content: '',
    published: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/blogs/create', blogData);
      // Redirect to the blog list after successful creation
    //   navigate('/blogs');
    } catch (error) {
      console.log('Error creating blog:', error);
    }
  };

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Heading as="h1" mb={4}>Create Blog</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" onChange={handleChange} value={blogData.title} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Author</FormLabel>
          <Input type="text" name="author" onChange={handleChange} value={blogData.author} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Input type="text" name="description" onChange={handleChange} value={blogData.description} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Content</FormLabel>
          <Textarea name="content" onChange={handleChange} value={blogData.content} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Create</Button>
      </form>
    </Box>
  );
};

export default CreateBlog;
