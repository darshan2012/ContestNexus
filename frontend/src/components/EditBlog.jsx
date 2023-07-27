// import React, { useEffect, useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
// import axios from 'axios';

// const EditBlog = () => {
//   const { id } = useParams();
//   const history = useHistory();
//   const [blogData, setBlogData] = useState(null);

//   useEffect(() => {
//     fetchBlog();
//   }, []);

//   const fetchBlog = async () => {
//     try {
//       const response = await axios.get(`/blogs/get/${id}`);
//       setBlogData(response.data);
//     } catch (error) {
//       console.log('Error fetching blog:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/blogs/update/${id}`, blogData);
//       // Redirect to the blog details after successful update
//       history.push(`/blogs/${id}`);
//     } catch (error) {
//       console.log('Error updating blog:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setBlogData({
//       ...blogData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <Box>
//       {blogData ? (
//         <Box>
//           <Heading as="h1" mb={4}>Edit Blog</Heading>
//           <form onSubmit={handleSubmit}>
//             <FormControl mb={4}>
//               <FormLabel>Title</FormLabel>
//               <Input type="text" name="title" onChange={handleChange} value={blogData.title} />
//             </FormControl>
//             <FormControl mb={4}>
//               <FormLabel>Description</FormLabel>
//               <Input type="text" name="description" onChange={handleChange} value={blogData.description} />
//             </FormControl>
//             <FormControl mb={4}>
//               <FormLabel>Content</FormLabel>
//               <Textarea name="content" onChange={handleChange} value={blogData.content} />
//             </FormControl>
//             <Button type="submit" colorScheme="blue">Update</Button>
//           </form>
//         </Box>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </Box>
//   );
// };

// export default EditBlog;
