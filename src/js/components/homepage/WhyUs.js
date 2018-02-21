import React from 'react';
import FaTags from 'react-icons/lib/fa/tags';
import FaMoney from 'react-icons/lib/fa/money';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaWrench from 'react-icons/lib/fa/wrench';
import { BtnLink } from "../reusables/Buttons";

const WhyUs = () => (
    <div className="why-us container-fluid py-4 bg-light px-lg-5">
        <div className="text-center">
            <h2 className="font-weight-bold mb-lg-5">WHY CHOOSE US</h2>
        </div>
        <div className="row">
            <div className="col-md-3 d-lg-flex mb-2">
                <div className="my-3 my-lg-0 mx-lg-3">
                    <FaMoney size={45}/>
                </div>
                <div>
                    <h6 className="font-weight-bold">Financing made easy</h6>
                    <p className="text-muted mb-3">
                        Our stress-free finance department that can find financial solutions to save you money.
                    </p>
                </div>
            </div>
            <div className="col-md-3 d-lg-flex mb-2">
                <div className="my-3 my-lg-0 mx-lg-3">
                    <FaTags size={45}/>
                </div>
                <div>
                    <h6 className="font-weight-bold">Wide range of brands</h6>
                    <p className="text-muted mb-3">
                        With a robust selection of popular vehicles on hand, as well as leading vehicles from BMW and Ford.
                    </p>
                </div>
            </div>
            <div className="col-md-3 d-lg-flex mb-2">
                <div className="my-3 my-lg-0 mx-lg-3">
                    <FaThumbsOUp size={45}/>
                </div>
                <div>
                    <h6 className="font-weight-bold">Trusted by thousands</h6>
                    <p className="text-muted mb-3">
                        10 new offers every day. 350 offers on site, trusted by a community of thousands of users.
                    </p>
                </div>
            </div>
            <div className="col-md-3 d-lg-flex mb-2">
                <div className="my-3 my-lg-0 mx-lg-3">
                    <FaWrench size={45}/>
                </div>
                <div>
                    <h6 className="font-weight-bold">Car service & maintenance</h6>
                    <p className="text-muted mb-3">
                        Our service department maintain your car to stay safe on the road for many more years.
                    </p>
                </div>
            </div>
        </div>
        <div className="d-flex w-100 my-4">
            <BtnLink title="LEARN MORE" to="/about-us" classes="btn-primary d-block mx-auto"/>
        </div>
    </div>
);

export default WhyUs;