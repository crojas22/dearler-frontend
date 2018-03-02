import React from 'react';
import Navigation from "./Navigation";
import { RenderBreadcrumps } from "./reusables/RenderLinks";
import FaCheckCircle from "react-icons/lib/fa/check-circle";
import Footer from "./reusables/Footer";

const AboutUs = props => (
    <div>
        <Navigation />
        <div className="about-us container-fluid px-md-5">
            <RenderBreadcrumps title="About us" title2="inventory"/>
            <div className="row pt-4 px-lg-5">
                <div className="col-lg-6 pr-xl-4 text-center pb-5">
                    <img className="img-fluid w-100" src="/images/background/mercedezbackground.jpeg" alt="key"/>
                </div>
                <div className="col-lg-6 pl-xl-4">
                    <h2 className="mb-4 mb-xl-5 ">WELCOME TO THE <span className="text-prime">MOTORS</span></h2>
                    <h6 className="mb-3">Before we get ahead of ourselves, we want to welcome you to Motors.
                        While nothing can replace thing on-the-lot experience.</h6>
                    <p>
                        We appreciate you taking the time today to visit our web site.
                        Our goal is to give you an interactive tour of our new and used inventory,
                        as well as allow you to conveniently get a quote, schedule a service appointment, or apply for financing.
                        The search for a luxury car is filled with high expectations.
                        Undoubtedly, that has a lot to do with the vehicles you are considering, but at Motors,
                        we think you should also have pretty high expectations for your dealership.
                    </p>
                    <p className="text-muted">
                        <em> — JOHN DOE, President of Motors</em>
                    </p>
                </div>
            </div>
            <div className="row pt-4 px-lg-5 mb-4">
                <div className="col-lg-6 pl-xl-4 text-center pb-5 order-lg-1">
                    <img className="img-fluid w-100" src="/images/background/pexels-photo-97079.jpeg" alt="key"/>
                </div>
                <div className="col-lg-6 pr-xl-4 order-lg-0">
                    <h2 className="mb-4 mb-xl-5 ">CORE <span className="text-prime">VALUES</span></h2>
                    <h6 className="mb-3">
                        We go through extensive factory training so that we may provide you with the knowledge you
                        need to make an educated decision in choosing the vehicle that is right for your lifestyle.
                    </h6>
                    <ul>
                        <li>
                            <FaCheckCircle/> Stress-free finance department.
                        </li>
                        <li>
                            <FaCheckCircle/> Robust selection of popular vehicles.
                        </li>
                        <li>
                            <FaCheckCircle/> 350 offers on site, trusted by a community.
                        </li>
                        <li>
                            <FaCheckCircle/> Maintain your car to stay safe on the road.
                        </li>
                        <li>
                            <FaCheckCircle/> We know how to handle a wide range of car services.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);

export default AboutUs;