import React from 'react';
import FormWithTab from "../hoc/FormWithTab";
import Navigation from "./Navigation";

const PreApproval = () => {
    return(
        <div>
            <Navigation/>
            Hello
        </div>
    )
};

export default FormWithTab(PreApproval);