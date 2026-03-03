/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import '../about/about.css';

const About = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { heading, description, skills } = about;
  const skill = skills.split(',');
  const { coreSkills } = portfolioData;
  return (
    <div className='container-fluid about-bg pb-5'>
      <div className="container py-4" id="about">
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-bold text-white" data-aos="fade-up" data-aos-easing="ease-in-sine">About Me</h1>
                  <div className="gradient-bar mt-3" data-aos="fade-up" data-aos-easing="ease-in-sine"></div>
            </div>
          </div>
        </section>
        <div className="row align-items-center">
          <div className="col-md-6 pe-3 pe-md-5 pe-lg-5 mb-5 mb-md-3 mb-lg-0">
            <div className="h-100 text-white rounded-0">
              <h2 data-aos="fade-up" data-aos-easing="ease-in-sine">{heading}</h2>
              <p data-aos="fade-right" data-aos-easing="ease-in-sine">{description}</p>
              {
                skill.map((item, index) => (
                  <button key={index} className="btn cursor-not-allowed btn-primary rounded-pill mx-2 about-card-skills mb-3 mb-md-2 mb-lg-0" data-aos="fade-right" data-aos-easing="ease-in-sine">{item.trim()}</button>
                ))
              }
            </div>
          </div>
          <div className='col-md-6'>
            <div className="row">
              {
                coreSkills.map((item, index) => (
                  <div key={index} className="col-md-6 mb-4">
                    <div className="card h-100 about-core-skills-cards p-2" data-aos="zoom-in" data-aos-easing="ease-in-sine">
                      <div className="card-body">
                        <p className='mb-5 about-card-icon'>
                          <i className={`be bi-${item.icon} fs-5`}></i>
                        </p>
                        <h5 className="card-title my-4">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
