import React from 'react';
import Navigation from "./Navigation";
import { RenderBreadcrumps } from "./reusables/RenderLinks";

const AboutUs = () => (
    <div>
        <Navigation />
        <div className="about-us container-fluid px-md-5">
            <RenderBreadcrumps title="About us" title2="inventory"/>
        </div>
        About us
    </div>
);

export default AboutUs;