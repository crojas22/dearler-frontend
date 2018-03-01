import React from 'react';
import { renderCarListing } from "../../functions/HelperFunctions";
import { NavControls } from "../reusables/NavControls";
import { TitleSeparator } from "../reusables/Div";
import CarListing from "../reusables/CarListing";

class SpecialsCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayFrom: 0,
            displayTo: 1,
            perPage: 1
        };
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    componentDidMount() {
        this.updateWindowSize();
        window.addEventListener("resize", this.updateWindowSize, false);
    }

    componentWillUnmount() {
        this.updateWindowSize();
        window.removeEventListener("resize", this.updateWindowSize, false)
    }

    updateWindowSize() {
        if (window.innerWidth < 768) {
            this.setState({
                displayFrom: 0,
                perPage: 1,
                displayTo: 1
            });
        } if (window.innerWidth > 768) {
            this.setState({
                displayFrom: 0,
                perPage: 2,
                displayTo: 2
            });
        } if (window.innerWidth > 1200) {
            this.setState({
                displayFrom: 0,
                perPage: 3,
                displayTo: 3
            });
        }
    }

    render() {
        const { displayFrom, displayTo, perPage } = this.state,
            arrayLength = this.props.newCars.length;

        const displayArray = (array) => (
            array.map((each, index) => {
                if (index >= displayFrom && index < displayTo) {
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

        const forward = () => {
            this.setState({
                displayFrom: (displayFrom + perPage) % arrayLength,
                displayTo: ((displayTo % arrayLength) + perPage)
            });
        };

        const backward = () => {
            if (displayFrom === 0) {
                this.setState({
                    displayFrom: arrayLength - perPage,
                    displayTo: arrayLength.length
                });
            } else {
                this.setState({
                    displayFrom: displayFrom - perPage,
                    displayTo: displayTo - perPage
                });
            }
        };

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
                        displayArray(this.props.newCars)
                    }
                </div>
                <NavControls add={forward} remove={backward}/>
            </div>
        )
    }
}

export default SpecialsCarousel;