import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box className="full img3">
      <Center>
        <Box className="row full">
          <Box className="col center bg-white">
            <Box>
              <Heading as="h3" color="red.500" mb={2}>
                404 :(
              </Heading>
              <Heading as="h3" mb={2}>
                Page not found
              </Heading>
              <Button as={Link} to="/home" variant="link" mt={2}>
                Go back to Homepage
              </Button>
            </Box>
          </Box>
          <Box className="col"></Box>
        </Box>
      </Center>
    </Box>
  );
};

export default NotFoundPage;
