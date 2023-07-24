import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Spinner,
  Box,
  Text,
  Center,
  Flex,
  Heading,
  Grid,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import { Chart } from "react-google-charts";

const UserCodeforcesData = ({ handle }) => {
  const [codeforcesData, setCodeforcesData] = useState(null);
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const [nofound,setNotfound] = useState(false);
  useEffect(() => {
    // Make a GET request to the Express backend endpoint
    axios.get(`http://localhost:4000/users/${username}/codeforces`)
      .then(response => {
        // console.log("called");
        setCodeforcesData(response.data.result)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [username]);
  
    
  if (nofound) {
    return (
      <Box p="4" w={"100%"}>
        {/* <Heading fontWeight="bold" mb="4" color={isDarkMode ? 'white' : 'black'}>
          Codeforces Data for {handle}
        </Heading> */}
        <Text fontSize="xl" fontWeight="bold" mb="4" color={isDarkMode ? 'gray.300' : 'black'}>
          No data available for {handle} on Codeforces.
        </Text>
      </Box>
    );
  }

  if (!codeforcesData) {
    return (
      <Center height="20vh">
        <Spinner size={'lg'} />
      </Center>
    );
  }

  const { tags, levels, verdicts, ratings, langs, heatmap, handle } = codeforcesData;

  // Extract data for charts
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Data for Bar Chart (submission levels)
  const levelsChartData = [
    
    ["Element", "Solved", { role: "style" }],
    ...Object.entries(levels).map(([label, value]) => [label, value, getRandomColor()]),
  ];

  const tagsChartData = [
    ["Tag", "Solved"],
    ...Object.entries(tags).map(([label, value]) => [label, value]),
  ];

  const verdictsChartData = [
    ["Verdict", "Count"],
    ...Object.entries(verdicts).map(([label, value]) => [label, value]),
  ];

  // Data for Pie Chart (submission languages)
  const langsChartData = [
    ["Language", "Count"],
    ...Object.entries(langs).map(([label, value]) => [label, value]),
  ];

  const ratingsChartData = [
    ["Rating", "Solved", { role: "style" }],
    ...Object.entries(ratings).map(([label, value]) => [label, value, getRandomColor()]),
  ];

  return (
    <Box p="4" w={"100%"}>
      <Heading fontWeight="bold" mb="4" color={isDarkMode ? 'white' : 'black'}>
        Codeforces Data for {handle}
      </Heading>
      <Text fontSize="xl" fontWeight="bold" mb="4" color={isDarkMode ? 'gray.300' : 'black'}>
        Total problems solved: {Object.keys(codeforcesData.problems).length}
      </Text>

      {/* Total Submissions */}
      <Text fontSize="xl" fontWeight="bold" mb="4" color={isDarkMode ? 'gray.300' : 'black'}>
        Total Submissions: {codeforcesData.totalSub}
      </Text>

      
      

      {/* Bar Chart for Submission Levels */}
      <Box bg={isDarkMode ? 'gray.800' : 'white'} p="4" borderRadius="8px" boxShadow="sm">
        <Text fontSize="xl" fontWeight="bold" mb="4" color={isDarkMode ? 'white' : 'black'}>
          Submissions by Level
        </Text>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={levelsChartData} />
      </Box>

      <Divider my="6" />

      {/* Pie Chart for Tags */}
      <Box bg={isDarkMode ? 'gray.800' : 'white'} p="4" borderRadius="8px" boxShadow="sm">
        <Text fontSize="xl" fontWeight="bold" mb="4" color={isDarkMode ? 'white' : 'black'}>
          Tags of {handle}
        </Text>
        <Chart chartType="PieChart" width="100%" height="400px" data={tagsChartData} />
      </Box>

      <Divider my="6" />

      {/* Bar Chart for Ratings */}
      <Box bg={isDarkMode ? 'gray.800' : 'white'} p="4" borderRadius="8px" boxShadow="sm">
        <Text fontSize="xl" fontWeight="bold" mb="4" color={isDarkMode ? 'white' : 'black'}>
          Submissions by Rating
        </Text>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={ratingsChartData} />
      </Box>

      {/* Grid for Charts */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{md:"4"}}>

        {/* Pie Chart for Verdicts */}
        <Box bg={isDarkMode ? 'gray.800' : 'white'} p="4" borderRadius="8px" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" mb="4" color={isDarkMode ? 'white' : 'black'}>
            Submissions by Verdict
          </Text>
          <Chart chartType="PieChart" width="100%" height="300px" data={verdictsChartData} />
        </Box>

        {/* Pie Chart for Languages */}
        <Box bg={isDarkMode ? 'gray.800' : 'white'} p="4" borderRadius="8px" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" mb="4" color={isDarkMode ? 'white' : 'black'}>
            Submissions by Language
          </Text>
          <Chart chartType="PieChart" width="100%" height="300px" data={langsChartData} />
        </Box>
      </Grid>
    </Box>
  );
};

export default UserCodeforcesData;
