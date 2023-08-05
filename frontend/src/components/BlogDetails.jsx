// BlogDisplay.jsx

import React, { useState } from 'react';
import { Box, Heading, Text, Textarea, Button, Divider, useColorMode, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import dummyBlogData from './dummyBlogData.json';

const BlogDisplay = () => {
  const [commentText, setCommentText] = useState('');
  const { title, author, description, content, published, comments } = dummyBlogData;
  const [showAllComments, setShowAllComments] = useState(false);
  const { colorMode } = useColorMode();

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      const newComment = {
        author: 'John Doe', // Replace this with the actual logged-in user's name or ID
        text: commentText,
      };
      setCommentText('');
      // For actual implementation, you can send the newComment object to the backend API for saving.
    }
  };

  const toggleShowAllComments = () => {
    setShowAllComments((prevShowAllComments) => !prevShowAllComments);
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  return (
    <Box my={8} mx="auto" maxWidth="100%" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        {title}
      </Heading>
      <Text fontSize="lg" mb={2} color="gray.600">
        By {author} | Published on {published}
      </Text>
      <Text fontSize="lg" mb={4}>
        {description}
      </Text>
      <Box p={4} border="1px solid" borderColor={colorMode === 'light' ? 'gray.300' : 'gray.700'} borderRadius="md" bg={colorMode === 'light' ? 'white' : 'gray.800'}>
        {/* Render blog content */}
        {content.map((item, index) => {
          if (item.type === 'heading') {
            return (
              <Heading key={index} as="h1" size="xl" mb={4}>
                {item.content}
              </Heading>
            );
          } else if (item.type === 'subheading') {
            return (
              <Heading key={index} as="h2" size="lg" mb={4}>
                {item.content}
              </Heading>
            );
          } else if (item.type === 'paragraph') {
            return (
              <Text key={index} fontSize="lg" mb={4}>
                {item.content}
              </Text>
            );
          }
          return null;
        })}
      </Box>
      <Box mt={8}>
        <Heading as="h3" size="md">
          Comments
        </Heading>
        {displayedComments.map((comment, index) => (
          <Box key={index} p={4} border="1px solid" borderColor={colorMode === 'light' ? 'gray.300' : 'gray.700'} borderRadius="md" bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} mt={4}>
            <Text fontWeight="bold" color={colorMode === 'light' ? 'black' : 'white'}>
              {comment.author}
            </Text>
            <Text color={colorMode === 'light' ? 'black' : 'white'}>{comment.text}</Text>
          </Box>
        ))}
        {comments.length > 5 && (
          <Button onClick={toggleShowAllComments} variant="link" colorScheme="teal" mt={4}>
            {showAllComments ? 'Show Less' : 'Read More'}
            {showAllComments ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
        )}
      </Box>
      <Divider my={8} />
      {/* Comment form */}
      <Box mt={4}>
        <Heading as="h3" size="md">
          Add a Comment
        </Heading>
        <Textarea
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Write your comment here..."
          resize="vertical"
          size="md"
          bg={colorMode === 'light' ? 'white' : 'gray.800'}
          color={colorMode === 'light' ? 'black' : 'white'}
        />
        <Button colorScheme="teal" onClick={handleCommentSubmit} mt={4}>
          Submit Comment
        </Button>
      </Box>
    </Box>
  );
};

export default BlogDisplay;
