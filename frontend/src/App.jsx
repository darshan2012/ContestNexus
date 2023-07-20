import React, { useEffect, useState } from 'react';
import { Outlet, BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { Box, ChakraProvider,Link as LogoLink } from '@chakra-ui/react';
import ContestScreen from './screens/ContestScreen';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import EmailVerifyScreen from './screens/EmailVerifyScreen.jsx';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const location = window.location.pathname;

  const [showLogo,setShowLogo] = useState(location.includes('/users/'));
  useEffect(()=>{setShowLogo(location.includes('/users/'))},[window.location.pathname]);
  // console.log(isEmailVerifyScreen);
  return (
    <>
    {/* <IDEScreen /> */}
    <ChakraProvider>
      <Router>
        {!showLogo?  <Header /> :<Box float={'left'} ><LogoLink href={"/home"}><h1>logo</h1></LogoLink></Box>}
        {/* <UserComponent /> */}
        <Routes>
        <Route path="/" element={<HomeScreen />} />
          <Route index path={"/home"} element={<HomeScreen />} />
          <Route path="/users/login" element={<LoginScreen />} />
          <Route path="/users/register" element={<RegisterScreen />} />
          <Route path="/contests" element={<ContestScreen />} />
          {/* <Route path='/contact' /> */}
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>

        <ToastContainer />
        {/* <Container className="my-2">
          <Outlet />
        </Container> */}
        {!showLogo && <Footer />}
      </Router>
    </ChakraProvider>
</>
  );
}




export default App;
