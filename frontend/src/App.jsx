import React, { useEffect, useState } from 'react';
import { Outlet, BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { Box, ChakraProvider, Link as LogoLink } from '@chakra-ui/react';
import ContestScreen from './screens/ContestScreen';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import EmailVerifyScreen from './screens/EmailVerifyScreen.jsx';
import NotFoundPage from './components/NotFoundPage';
import axios from 'axios';
import RedirectTO404 from './components/RedirectTO404';
import UserProfileScreen from './screens/UserProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SeachCoderScreen from './screens/SeachCoderScreen';

function App() {

  const [userData, setUserData] = useState(null);
  const location = window.location.pathname;
  const isPageNotFound = location.includes('/404'); // State variable for 404 Not Found
  const [showLogo,setShowlogo] = useState(location.includes('/users/'))

  useEffect(() => {
    // Check if the token exists in the local storage
    const token = localStorage.getItem('token');
    if (token) {
      // If the token exists, make a request to the backend to fetch user data
      axios
        .get('http://localhost:4000/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response.data.result);
          // Update the user data state with the fetched data
          setUserData(response.data.result);
        })
        .catch((error) => {
          console.error(error);
          // Handle any error during the API call
        });
    }
  }, []);

  const handleBackButton = () => {
    if (url.includes('users')) {
      // The URL contains 'login', do something here (e.g., redirect, show a message, etc.)
      // console.log('URL contains "login"');
      showLogo = true
    } else {
      showLogo = false
    }
  }

  

  // console.log(isEmailVerifyScreen);
  return (
    <>
      {/* <IDEScreen /> */}
      <ChakraProvider>
        <Router>
          {!isPageNotFound && (!showLogo ? <Header user={userData} /> : <Box float={'left'} ><LogoLink href={"/home"}><h1>ContestNexus</h1></LogoLink></Box>)}
          {/* <UserComponent /> */}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route index path={"/home"} element={<HomeScreen />} />
            <Route path="/users/login" element={<LoginScreen />} />
            <Route path="/users/register" element={<RegisterScreen />} />
            <Route path="/contests" element={<ContestScreen />} />
            <Route path="/stalk" element={<SeachCoderScreen />} />
            <Route path="/:username/editprofile" element={<EditProfileScreen />} />
            <Route path='/:username/userprofile' element={<UserProfileScreen />} />
            <Route path="/users/:username/verifyemail/:token" element={<EmailVerifyScreen />} />
            <Route path='/404' element={<NotFoundPage />} />
            <Route path='/*' element={<RedirectTO404 />} />
          </Routes>

          <ToastContainer />
          {/* <Container className="my-2">
          <Outlet />
        </Container> */}
          {!isPageNotFound && !showLogo && <Footer />}
        </Router>
      </ChakraProvider>
    </>
  );
}




export default App;
