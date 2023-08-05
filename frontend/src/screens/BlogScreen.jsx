import React, { useState } from 'react';
import { Box, Container, Heading, SimpleGrid, Button, Input } from '@chakra-ui/react';
import BlogDisplay from '../components/BlogDetails';
// import BlogMenu from './BlogMenu';
// import BlogPost from './BlogPost';

const BlogScreen = () => {
  // Sample blog data for demonstration
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'Blog 1', content: 'Content of Blog 1' },
    { id: 2, title: 'Blog 2', content: 'Content of Blog 2' },
    // Add more blogs as needed
  ]);

  // State for the selected blog
  const [selectedBlog, setSelectedBlog] = useState(null);

  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the blogs based on the search term
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BlogDisplay />
    // <Container maxW="container.lg" mt={8}>
    //   {/* <Heading as="h1" size="xl" mb={4}>
    //     My Blog
    //   </Heading> */}
    //   <Box mb={4}>
    //     {/* Search input */}
    //     <Input
    //       type="text"
    //       placeholder="Search blogs..."
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     />
    //   </Box>
    //   <SimpleGrid columns={2} spacing={8}>
    //     <Box>
    //       {/* Blog menu */}
    //       {/* <BlogMenu blogs={filteredBlogs} setSelectedBlog={setSelectedBlog} /> */}
    //     </Box>
    //     <Box>
    //       {/* Display selected blog post */}
    //       {/* <BlogPost blog={selectedBlog} /> */}
    //       {/* Button to create a new blog (you can link to a separate page or use a modal) */}
    //       <Button mt={4} colorScheme="teal">
    //         Create New Blog
    //       </Button>
    //     </Box>
    //   </SimpleGrid>
    // </Container>
  );
};

export default BlogScreen;
