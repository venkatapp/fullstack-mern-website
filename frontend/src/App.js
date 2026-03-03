import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPortfolioData } from './redux/rootSlice';
import Intro from './components/intro/Intro';
import AppNavbar from './components/navbar/Navbar.js';
import About from './components/about/about.js';
import Footer from './components/footer/footer.js';
import LatestProjects from './components/projects/projects.js';
import TestSkills from './components/skills/testSkills.js';
import Contact from './components/contact/contact.js';

import AOS from 'aos';
import 'aos/dist/aos.css';  
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const { portfolioData, loader } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getProtfolioData = async () => {
    try {
      const response = await axios.get("/api/protfolio/get-protfolio-data");
      // console.log(response.data);
      dispatch(setPortfolioData(response.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProtfolioData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration:1000,
      once:true
    })
    AOS.refresh();
  }, []);

  return (
    <div>
      {loader ? <loader /> : null}
      <div>
        {
          portfolioData && (
            <>
              <AppNavbar />
              <Intro />
              <About />
              <TestSkills />
              <LatestProjects />
              <Contact />
              <Footer />
            </>
          )}
      </div>
    </div>
  )
}

export default App