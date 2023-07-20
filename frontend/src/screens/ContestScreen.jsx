import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contests from '../components/Contests';
import '../CSS/ContestScreen.css';
import { Heading } from '@chakra-ui/react';

const ContestScreen = () => {
  const [sites, setSites] = useState([]);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetchSites();
    fetchContests();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await axios.get('https://kontests.net/api/v1/sites');
      const sitesData = response.data;
      // console.log(sitesData);
      const sitesWithLogo = await Promise.all(
        sitesData.map(async (site) => {
          const url = site[2] || ''; // Set default value as an empty string if site.url is undefined
          const doubleSlashIndex = url.indexOf('//');
          const urlWithoutProtocol = doubleSlashIndex !== -1 ? url.slice(doubleSlashIndex + 2) : url;
          
          return {
            [site[0]]: {
              url: url,
              logo: `https://logo.clearbit.com/${urlWithoutProtocol}`,
            },
          };
        })
      );
  
      const combinedSites = sitesWithLogo.reduce((accumulator, current) => {
        return { ...accumulator, ...current };
      }, {});
  
      setSites(combinedSites);
      // console.log(sites);
    } catch (error) {
      console.error('Error fetching sites:', error);
    }
  };
  const fetchContests = async () => {
    try {
      const response = await axios.get('https://kontests.net/api/v1/all', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.data);
      const data = response.data;
      if (data) {
        setContests(data);
      } else {
        console.log('No contest data available');
      }
    } catch (error) {
      console.log('Error fetching contests:', error);
    }
  };

  return (
    <div  className="mb-5 contest-screen">
      <Heading as={"h1"}>Upcoming Contests</Heading>
      <div className="contest-list">
        <Contests contests={contests} sites={sites} contestsPerPage={9} />
      </div>
    </div>
  );
};

export default ContestScreen;
