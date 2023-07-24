import { Box, Input, Select, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import UserCodeforcesData from '../components/UserCodeforcesData';
import UserLeetCodeData from '../components/UserLeetcodeData';

const SearchCoderScreen = () => {
  const [site, setSite] = useState('leetcode');
  const [handle, setHandle] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSiteChange = (event) => {
    setShowResult(false);
    setHandle('');
    setSite(event.target.value);
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
    setShowResult(false);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  return (
    <Box p={4}>
      <Select value={site} onChange={handleSiteChange}>
        <option value="leetcode">LeetCode</option>
        <option value="codeforces">Codeforces</option>
      </Select>
      <Input value={handle} onChange={handleHandleChange} placeholder="Enter Handle" mt={4} />
      <Button onClick={handleSubmit} mt={4} colorScheme="teal">
        Submit
      </Button>

      {showResult && site === 'leetcode' && handle && <UserLeetCodeData handle={handle} />}
      {showResult && site === 'codeforces' && handle && <UserCodeforcesData handle={handle} />}
    </Box>
  );
};

export default SearchCoderScreen;
