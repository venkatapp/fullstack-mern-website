import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ReactTyped } from "react-typed";


import '../intro/intro.css';

function Intro() {
    const { portfolioData } = useSelector((state) => state.root);
    const { intro } = portfolioData;
    const { firstName, captions, description, welcomeText } = intro;
    const splitCaptions = captions.split(',');

    const { socialLink } = portfolioData;
    const [currentIndex, setCurrentIndex]=useState(0);
    return (
        <div className="bg-dark text-secondary px-4 py-5 text-center heroGredBackground pt-5 d-flex justify-content-center align-items-center" id="home">
            <div className="py-5">
                <h6 className='welcome-text' data-aos="fade-up" data-aos-easing="ease-in-sine">{welcomeText}</h6>
                <h1 className="display-1 fw-normal text-white" data-aos="fade-up" data-aos-easing="ease-in-sine">{firstName}</h1>
                <div data-aos="fade-up" data-aos-easing="ease-in-sine">
                    <div className='intro-typed-text-one'>
                       <span className='hero-title-gradient-text' >I'm a</span> {' '}
                        <ReactTyped
                        strings={splitCaptions} // Pass the array directly here
                        typeSpeed={100}
                        backSpeed={50}
                       loop
                        // This function runs every time a new string starts typing
                        preStringTyped={(index) => setCurrentIndex(index)}
                        // Apply the dynamic class here
                        className={`hero-title-gradient-text-${currentIndex}`}
                        />
                    </div>
                    </div>
                                    
                    <div className="col-lg-12 mx-auto mt-3">
                    <p className="fs-5 mb-4" data-aos="fade-up" data-aos-easing="ease-in-sine">{description}</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <a href='#projects' className="btn btn-primary btn-sm custom-into-btn " data-aos="fade-left" data-aos-easing="ease-in-sine">View My Work</a>
                        <div>
                            {
                                socialLink.map((item, index) => {
                                    return (
                                        <a key={index} href={item.url} className="btn btn-md btn-dark m-1 rounded-circle" data-aos="fade-right" data-aos-easing="ease-in-sine">
                                            <i className={`be bi-${item.icon}`}></i>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro