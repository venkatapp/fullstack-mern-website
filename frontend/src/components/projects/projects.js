import React from 'react';
import { useSelector } from 'react-redux';
import './project.css';

const LatestProjects = () => {
    // Access the root state
    const { portfolioData } = useSelector((state) => state.root);
    
    if (!portfolioData || !portfolioData.projects) {
        return (
            <div className="projects-bg text-white d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const { projects } = portfolioData;

    const sortedProjects = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));

    // 4. Split the projects for your two sections
    const latestTwo = sortedProjects.slice(0, 2);
    const oldprojects = sortedProjects.slice(2);

    return (
        <div className='projects-bg text-white'>
            <section className="text-center container text-white" id="projects">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light" data-aos="fade-up" data-aos-easing="ease-in-sine">Featured Projects</h1>
                        <div className="gradient-bar mt-3" data-aos="fade-up" data-aos-easing="ease-in-sine"></div>
                        <p className="lead text-white mt-5" data-aos="fade-up" data-aos-easing="ease-in-sine">
                            Explore my most recent work and technical experiments.
                        </p>
                    </div>
                </div>
            </section>

            <div className="album">
                <div className="container">
                    {/* Featured Section (Latest 2) */}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-5">
                        {latestTwo.map((project, index) => (
                            <div key={project._id || index} className="col d-flex align-items-stretch">
                                <div className="card shadow-sm custom-project-card-bg h-100" data-aos="flip-right">
                                    <div className="position-relative">
                                        <img src={project.image} alt={project.title} className='card-img'/>
                                        <div className="card-img-overlay">
                                            <div className='d-flex justify-content-end'>        
                                                <a href={project.link} target='_blank' rel="noreferrer" className="btn btn-dark rounded-circle">
                                                    <i className="bi bi-link"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-text mt-4 mb-3">{project.title}</h5>
                                        <p className='card-text' style={{color:'oklch(.707 .022 261.325)'}}>{project.description}</p>
                                        <div className="mt-auto">
                                            {project.technologies?.split(',').map((item, i) => (
                                                <button key={i} className="btn cursor-not-allowed btn-primary rounded-pill mx-1 btn-sm projects-card-skills-btn mb-2">
                                                    {item.trim()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Other Projects Section */}
                    <h3 className="fw-light pt-5 mt-5 text-center" data-aos="fade-up">Other Projects</h3>
                    <div className="mt-2 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pb-5">
                        {oldprojects.map((project, index) => (
                            <div key={project._id || index} className="col d-flex align-items-stretch">
                                <div className="card h-100 shadow-sm custom-project-card-bg" data-aos="fade-up">
                                    <div className="position-relative">
                                        <img src={project.image} alt={project.title} className='card-img'/>
                                        <div className="card-img-overlay">
                                            <div className='d-flex justify-content-end'>        
                                                <a href={project.link} target='_blank' rel="noreferrer" className="btn btn-dark rounded-circle">
                                                    <i className="bi bi-link"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-text mt-4 mb-3">{project.title}</h5>
                                        <p className='card-text' style={{color:'oklch(.707 .022 261.325)'}}>{project.description}</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        {project.technologies?.split(',').map((item, i) => (
                                            <button key={i} className="btn mb-2 cursor-not-allowed btn-primary mx-1 btn-sm custom-other-projects-btn">
                                                {item.trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProjects;