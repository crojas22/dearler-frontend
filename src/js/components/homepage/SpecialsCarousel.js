import React from 'react';
import { NavControls } from "../reusables/NavControls";
import { TitleSeparator } from "../reusables/Div";
import CarListing from "../reusables/CarListing";
import CarouselControl from "../../hoc/CarouselControl";

const SpecialsCarousel = props => {
    const displayArray = (array) => (
        array.map((each, index) => {
            if (index >= props.displayFrom && index < props.displayTo) {
                return(
                    <div key={each.id} className="col-8 col-md-5 col-xl-3 mx-auto">
                        <CarListing {...each} mainClass="home-carousel-listing"/>
                    </div>
                )
            } else {
                return(
                    <div key={each.id} className="col-8 col-md-5 col-xl-3 mx-auto d-none">
                        <CarListing {...each} mainClass="home-carousel-listing"/>
                    </div>
                )
            }
        })
    );

    return(
        <div className="bg-black container-fluid py-4">
            <div>
                <h3 className="text-white text-center mb-4">
                    SPECIALS
                    <TitleSeparator/>
                </h3>
            </div>
            <div className="row d-flex vertical-align-center flex-nowrap">
                {
                    displayArray(props.newCars)
                }
            </div>
            <NavControls add={() => props.forward(props.newCars.length)} remove={() => props.backward(props.newCars.length)}/>
        </div>
    )
};

export default CarouselControl(SpecialsCarousel);