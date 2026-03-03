import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './project.css';

const LatestProjects = () => {

    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const sortedProjects = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestTwo = sortedProjects.slice(0, 2);
    const oldprojects = sortedProjects.slice(2);
    const [sortProjects, setSortProjects] = useState(latestTwo);
    const [otherProjects, setOtherProjects] = useState(oldprojects);


    return (
        <div className='projects-bg text-white'>
            <section className=" text-center container text-white" id="projects">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light" data-aos="fade-up" data-aos-easing="ease-in-sine">Featured Projects</h1>
                         <div className="gradient-bar mt-3" data-aos="fade-up" data-aos-easing="ease-in-sine"></div>
                        <p className="lead text-white mt-5" data-aos="fade-up" data-aos-easing="ease-in-sine">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                    </div>
                </div>
            </section>

            <div className="album">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-8 g-5">
                        {
                            sortProjects.map((project, index) => (
                                    <div key={index} className="col d-flex align-items-stretch">
                                        <div className="card shadow-sm custom-project-card-bg h-100" data-aos="flip-right" data-aos-easing="ease-in-sine">
                                            <div className="position-relative">
                                            <img src={`${project.image}`} alt={`${project.title}`} className='card-img'/>
                                              <div className="card-img-overlay">
                                                <div className='d-flex justify-content-end'>        
                                                    <a href={`${project.link}`} target='self' className="btn btn-dark rounded-circle">
                                                    <i className="bi bi-link"></i>
                                                </a>
                                                </div>
                                                </div>
                                                </div>
                                              <div className="card-body">
                                                <h5 className="card-text mt-4 mb-3">{project.title}</h5>
                                                <p className='card-text' style={{color:'oklch(.707 .022 261.325)'}}>{project.description}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        {
                                                            project.technologies.split(',').map((item, index) => (
                                                                <button key={index} className="btn cursor-not-allowed btn-primary rounded-pill mx-2 btn-sm btn-outline-secondary projects-card-skills-btn mb-3 mb-md-3 mb-lg-0">
                                                                    {item.trim()}
                                                                </button>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            ))
                        }

                    </div>
                    {/* other projects section */}
                     <h3 className="fw-light pt-5 mt-5 text-center" data-aos="fade-up" data-aos-easing="ease-in-sine">Other Projects</h3>
                    <div className="mt-2 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pb-5">
                        {
                            otherProjects.map((project, index) => (
                                    <div key={index} className="col d-flex align-items-stretch">
                                        <div className="card h-100 shadow-sm custom-project-card-bg" data-aos="fade-up" data-aos-easing="ease-in-sine">
                                            <div className="position-relative">
                                            <img src={`${project.image}`} alt={`${project.title}`} className='card-img'/>
                                              <div className="card-img-overlay">
                                                <div className='d-flex justify-content-end'>        
                                                    <a href={`${project.link}`} target='self' className="btn btn-dark rounded-circle">
                                                    <i className="bi bi-link"></i>
                                                </a>
                                                </div>
                                                </div>
                                                </div>
                                            <div className="card-body d-flex flex-column">
                                            <h5 className="card-text mt-4 mb-3">{project.title}</h5>
                                                <p className='card-text' style={{color:'oklch(.707 .022 261.325)'}}>{project.description}</p>
                                            </div>
                                        <div className="card-footer">
                                        <div className="btn-wrapper d-block">
                                                        {
                                                            project.technologies.split(',').map((item, index) => (
                                                                <button key={index} className=" btn mb-3 cursor-not-allowed btn-primary mx-2 btn-sm custom-other-projects-btn">
                                                                    {item.trim()}
                                                                </button>
                                                            ))

                                                        }
                                             </div>
                                             </div>
                                        </div>
                                    </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProjects;
