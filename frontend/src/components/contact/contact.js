import React, { useState } from 'react';
import './contact.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Contact = () => {
      const { portfolioData } = useSelector((state) => state.root);
      if (!portfolioData || !portfolioData.contact) {
        return <div className="p-5 text-center">Loading contact info...</div>;
    }
      const {email, Phone, location}=portfolioData.contact;
      const {socialLink}=portfolioData;

    const [formData, setFormData] = useState({ name: '', lastName: '', subject: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [errors, setErrors]=useState({})


    const validate=()=>{
        let tempErrors={};
        if(!formData.name) tempErrors.name = 'Name is required';
        if(!formData.lastName) tempErrors.lastName = 'LastName is required';
        if(!formData.subject) tempErrors.subject = 'Subject cannot be empty';
        if(!formData.message) tempErrors.message = 'message cannot be empty';

        // Regex for basic email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) tempErrors.email = "Email is invalid";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        if(validate()){     
            try {
                await axios.post('http://localhost:5000/api/portfolio/send-email', formData);
                setFormData({ name: '', lastName: '', email: '', subject: '', message: '' });
                setStatus('Email sent successfully!');
                setTimeout(()=>setStatus(''),3000)
            } catch (error) {
                console.error('Email send error:', error);
                // axios error handling often puts details in error.response
                const errorMessage = error.response?.data?.message || 'An error occurred.';
                setStatus(errorMessage);
            }
        }
            
    };
    
    return (
        <div className='container-fluid skills-bg text-white py-5' id="contact">
            <div className="container py-5">
                <div className='row'>
                    <div className="col-lg-12 col-md-12 mx-auto text-center pb-5">
                        <h1 className="fw-light text-white">Get In Touch</h1>
                        <div className="gradient-bar-contact mt-3"></div> 
                        <p className='mt-4 w-100 w-md-50 w-lg=50 mx-auto'>I'm always interested in new opportunities and interesting projects. Let's discuss how we can work together!</p>
                    </div>
                </div>
                <div className="row align-items-stretch g-5 contact-wrap">
                    <div className="col-md-6">
                        <div className="card contact-card text-light rounded-12">
                            <div className="card-body p-4">
                                <div className="form h-100">
                                    <h3 className='py-4'>Send us a message</h3>
                                    <form className="mb-5" id="contactForm" name="contactForm"  onSubmit={handleSubmit}>
                                        <div className="row">
                                                <div className="col-md-6 form-group mb-2">
                                                <label htmlFor="name" className="col-form-label">Name *</label>
                                                <input type="text" className="form-control" name="name" id="name" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required/>
                                                {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                                            </div>
                                            <div className="col-md-6 form-group mb-3">
                                                <label htmlFor="last Name" className="col-form-label">Last Name *</label>
                                                <input type="text" className="form-control" name="Last Name" id="Last Name" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                                                {errors.lastName && <p style={{color: 'red'}}>{errors.lastName}</p>}
                                            </div>
                                            <div className="col-md-12 form-group mb-3">
                                                <label htmlFor="email" className="col-form-label">Email *</label>
                                                <input type="text" className="form-control" name="email" id="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required pattern="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"/>
                                                {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="subject" className="col-form-label">Subject</label>
                                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                                                {errors.subject && <p style={{color: 'red'}}>{errors.subject}</p>}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="message" className="col-form-label">Message *</label>
                                                <textarea className="form-control" name="message" id="message" cols="30" rows="4" placeholder="Write your message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                                                {errors.message && <p style={{color: 'red'}}>{errors.message}</p>}
                                            </div>
                                            <div className="col-md-12 d-grid">
                                                <input type="submit" value="Send Message" className="btn rounded-12 py-2 px-4" />
                                                <span className="submitting"></span>
                                            </div>
                                        </div>
                                    </form>

                                    <div id="form-message-warning mt-4"></div>
                                    <div id="form-message-success">
                                        <p>{status}</p>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="col-md-6">
                        <div className="contact-info h-100">
                            <h3>Let's Connect</h3>
                            <p className="mb-5 mt-4">I'm currently available for freelance work and full-time opportunities. Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.</p>
                            <ul className="list-unstyled mb-5">
                                <li className="d-grid gap-2 mb-3">
                                    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="btn d-flex custom-contact-link btn-block" role="button" data-bs-toggle="button">
                                            <div className='col- h-100 d-grid gap-1'>                                             
                                            <button type="button" className="btn bg-emerald-500 rounded-80">
                                                 <i className="be bi-envelope fs-4"></i>
                                            </button>
                                            </div>
                                            <div className='col- d-grid'>
                                            <p className="text mb-0 mr-0 ml-5 text-gray">Email</p>
                                            <p className='text-light mb-0 ms-3'>{email}</p>
                                            </div>  
                                    </a>
                                </li>   
                                <li className="d-grid gap-2 mb-3">
                                    <a href="https://maps.app.goo.gl/LipusFYdkSzrQerj6" target="_blank" rel="noopener noreferrer" className="btn d-flex custom-contact-link btn-block" role="button" data-bs-toggle="button">
                                            <div className='col- h-100 d-grid gap-1'>                                             
                                            <button type="button" className="btn bg-emerald-500 rounded-80">
                                                 <i className="be bi-envelope fs-4"></i>
                                            </button>
                                            </div>
                                            <div className='col- d-grid'>
                                            <p className="text mb-0 mr-0 ml-5 text-gray">Location</p>
                                            <p className='text-light mb-0 ms-3'>{location}</p>
                                            </div>  
                                    </a>
                                </li>   
                                <li className="d-grid gap-2 mb-3">
                                    <a href="tel:8919526441" target="_self" className="btn d-flex custom-contact-link btn-block" role="button" data-bs-toggle="button">
                                            <div className='col- h-100 d-grid gap-1'>                                             
                                            <button type="button" className="btn bg-emerald-500 rounded-80">
                                                 <i className="be bi-envelope fs-4"></i>
                                            </button>
                                            </div>
                                            <div className='col- d-grid'>
                                            <p className="text mb-0 mr-0 ml-5 text-gray">Phone</p>
                                            <p className='text-light mb-0 ms-3'>{Phone}</p>
                                            </div>  
                                    </a>
                                </li>   
                            </ul>
                            <p className='pt-2'>Follow Me</p>
                                <div>
                                    {
                                        socialLink.map((item, index) => {
                                            return (
                                                <a key={index} href={item.url} className="btn btn-md btn-dark m-1 rounded-corner">
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
        </div>
    );
};

export default Contact;
