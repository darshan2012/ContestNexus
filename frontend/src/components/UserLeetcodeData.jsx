import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Center, HStack, Spinner, Heading, Flex, Divider } from "@chakra-ui/react";
import { Chart } from "react-google-charts";

const UserLeetCodeData = ({ handle }) => {
  const [leetcodeData, setLeetcodeData] = useState(null);

  const [nofound, setNotfound] = useState(false);

  useEffect(() => {
    if (handle !== undefined && handle !== null) {
        
      // Make a GET request to the Express backend endpoint
      axios.get(`http://localhost:4000/users/leetcode/${handle}`)
        .then(response => {
          setLeetcodeData(response.data.result);
          setNotfound(false);
        })
        .catch(error => {
          // console.log(error.response.status)
          // if(error.response.status == 404)
          setNotfound(true)
          setLeetcodeData({});
          console.error('Error fetching LeetCode data:', error);
        });
    }
  }, [handle]);

  if (nofound) {
    return (
      <Box p="4" w={"100%"}>
        {/* <Heading fontWeight="bold" mb="4" color={isDarkMode ? 'white' : 'black'}>
          Codeforces Data for {handle}
        </Heading> */}
        <Text fontSize="xl" fontWeight="bold" mb="4" >
          No data available for {handle} on leetcode.
        </Text>
      </Box>
    );
  }

  if (!leetcodeData || !handle) {
    return (
      <Center height="100vh">
        <Spinner size={'lg'}></Spinner>
      </Center>
    );
  }

  // Filter "All" difficulty data
  const allDifficulty ={};
  const otherDifficulties = {};

  // Data for Bar Chart

  let chartData;
  if (!nofound) {
    const allDifficulty = leetcodeData.find(item => item.difficulty === 'All');
    const otherDifficulties = leetcodeData.filter(item => item.difficulty !== 'All');

    // Data for Bar Chart

    const chartData = [
      ["Difficulty", "Count", "Submissions"],
      ...otherDifficulties.map(item => [item.difficulty, item.count, item.submissions]),
    ];
  }
  return (
    <Box width={"100%"} p={4} >
      <Heading fontWeight="bold">LeetCode Data</Heading>
      <Divider my="6" />
      {/* Display All difficulty data */}
      {allDifficulty && (
        <Box textAlign="center" flex="1" p={2} borderRadius="md" >
          <Text fontSize="md">
            <strong>All:</strong> {allDifficulty.count}
          </Text>
          <Text fontSize="md">
            <strong>Submissions:</strong> {allDifficulty.submissions}
          </Text>
        </Box>
      )}

      {/* Display other difficulties data in tabular format */}
      {otherDifficulties.length > 0 && (
        <Flex flex="1" direction="column">
          <HStack spacing={4} justify="center">
            {otherDifficulties.map((item, index) => (
              <Box key={index} p={2} borderRadius="md" boxShadow="md">
                <Text fontSize="md">
                  <strong>Difficulty:</strong> {item.difficulty}
                </Text>
                <Text fontSize="md">
                  <strong>Count:</strong> {item.count}
                </Text>
                <Text fontSize="md">
                  <strong>Submissions:</strong> {item.submissions}
                </Text>
              </Box>
            ))}
          </HStack>
        </Flex>
      )}
      <Divider my="6" />
      {/* Display the Pie Chart */}
      {otherDifficulties.length > 0 && (
        <Box mt={8}>
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={chartData}
            options={{
              title: "LeetCode Problems Count and Submissions by Difficulty",
              hAxis: {
                title: "Difficulty",
                titleTextStyle: { color: "transperent" },
              },
              vAxis: {
                minValue: 0,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default UserLeetCodeData;
