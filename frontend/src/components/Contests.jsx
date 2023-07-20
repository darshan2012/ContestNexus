import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tooltip,
  useColorMode,
  useColorModeValue,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';


const Contests = ({ contests, sites }) => {
  const [selectedSite, setSelectedSite] = useState('');
  const [showRunningContests, setShowRunningContests] = useState(false);
  const { colorMode } = useColorMode();


  const handleSiteFilter = (site) => {
    setSelectedSite(site);
  };

  const handleRunningContestsFilter = () => {
    setShowRunningContests(!showRunningContests);
  };

  const filteredContests = contests.filter((contest) => {
    if (selectedSite && contest.site !== selectedSite) {
      return false;
    }
    if (showRunningContests && contest.status !== 'CODING') {
      return false;
    }
    return true;
  });

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const formatDuration = (duration) => {
    const days = Math.floor(duration / (24 * 60 * 60));
    const hours = Math.floor((duration % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((duration % (60 * 60)) / 60);

    let formattedDuration = '';
    if (days > 0) {
      formattedDuration += `${days} d `;
    }
    if (hours > 0) {
      formattedDuration += `${hours} hrs `;
    }
    if (minutes > 0) {
      formattedDuration += `${minutes} min`;
    }
    return formattedDuration.trim();
  };

  const siteOptions = Object.keys(sites);

  return (
    <div>
      <div className='filter-container' style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Button onClick={handleRunningContestsFilter} colorScheme={showRunningContests ? 'teal' : 'gray'} marginRight='8px'>
          Show Running Contests
        </Button>
        <Menu>
          <MenuButton as={Button} colorScheme='gray' rightIcon={<ChevronDownIcon />}>
            {selectedSite || 'Filter by Site'}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleSiteFilter('')}>All Sites</MenuItem>
            {siteOptions.map((site) => (
              <MenuItem key={site} onClick={() => handleSiteFilter(site)}>
                {site}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <TableContainer  >
        <Table size='md'
          variant='simple'
          css={{
            th: {
              fontSize: '1em',
              color: colorMode === 'light' ? '#1F2937' : '#FFFFFF',
              backgroundColor: colorMode === 'light' ? '#F3F4F6' : '#4B5563',
            },
            td: {
              // Adjust the styles as per your requirement
              minWidth: '250px',
              maxWidth: '250px',
              color: colorMode === 'light' ? '#1F2937' : '#FFFFFF',
              backgroundColor: useColorModeValue('gray.200', 'gray.700'),
            },
          }}
        >
          <Thead>
            <Tr >
              <Th fontSize='lg'>Site</Th>
              <Th fontSize='lg'>Contest Name</Th>
              <Th isNumeric>Start Time</Th>
              <Th isNumeric>End Time</Th>
              <Th isNumeric>Duration</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredContests.length === 0 ? (
              <Tr>
                <Td colSpan={5} textAlign='center'>
                  No contests available.
                </Td>
              </Tr>
            ) : (
              filteredContests.map((contest) => (
                <Tr key={contest.name}>
                  <Td overflow='hidden' textOverflow='ellipsis'>
                    <Tooltip  label={contest.site} aria-label='site-name-tooltip'>
                      <Link href={sites[contest.site]?.url} isExternal>
                        <img height='50px' width={'30px'} src={sites[contest.site]?.logo} alt={contest.platform} className='platform-logo' />
                      </Link>
                    </Tooltip>
                  </Td>
                  <Td overflow='hidden' textOverflow='ellipsis'>
                    <Link href={contest.url} isExternal>
                      {contest.name}
                    </Link>
                  </Td>
                  <Td     isNumeric>{contest.status === 'CODING' ? 'Running' : formatDate(contest.start_time)}</Td>
                  <Td isNumeric>{formatDate(contest.end_time)}</Td>
                  <Td isNumeric>{formatDuration(contest.duration)}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Contests;
