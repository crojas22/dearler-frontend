import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { RenderLinks } from "./reusables/RenderLinks";
import RenderCarListing from "./homepage/RenderCarListing";
import { BtnLink } from "./reusables/Buttons";
import WhyUs from "./homepage/WhyUs";
import SpecialsCarousel from "./homepage/SpecialsCarousel";
import BackgroundSellBuy from "./homepage/BackgroundSellBuy";
import { fetchData, fetchDataAction } from "../actions";
import { fetchDataFunction, windowTop } from "../functions/HelperFunctions";
import Navigation from "./Navigation";
import Footer from "./reusables/Footer";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTabActive: "New Cars"
        };
        this.changeTab = this.changeTab.bind(this);
    }

    componentDidMount() {
        this.props.fetchDataAction("v1/home/inventory?page=0&size=6", "GET");
        fetchDataFunction(this.props.url, this.props.sort.sortBy, this.props.sort.direction, this.props.fetchData);
    }

    changeTab(e) {
        e.preventDefault();
        this.setState({currentTabActive: e.target.innerHTML})
    }

    render() {
        return(
            <div>
                <Navigation/>
                <div className="image-background">
                </div>
                <div className="welcome container-fluid">
                    <div>
                        <h2 className="pb-3 pt-4 my-0">
                            <span className="text-white">WELCOME TO </span>
                            <span>MOTORS WORLD</span>
                        </h2>
                    </div>
                    <div className="pt-3">
                        <RenderLinks links={["New Cars", "Used Cars", "Search Inventory"]}
                                     classUL="nav-tab-menu m-0 p-0" classA=""
                                     active={this.state.currentTabActive} clickHandle={this.changeTab}/>
                    </div>
                </div>
                <div className="container-fluid mb-3 px-lg-5">
                    <RenderCarListing newCars={this.props.newCars} usedCars={this.props.usedCars}
                        currentTab={this.state.currentTabActive}/>

                    <div className={"w-100 my-4 " + (this.state.currentTabActive === "Search Inventory" ? "d-none": "d-flex")}>
                        <BtnLink title="SHOW ALL" to="inventory" classes="btn-primary mx-auto" onClick={windowTop}/>
                    </div>
                </div>
                <BackgroundSellBuy />
                <SpecialsCarousel newCars={this.props.newCars}/>
                <WhyUs/>
                <BackgroundSellBuy />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        newCars: state.newCarData,
        usedCars: state.usedCarData,
        url: state.inventorySearchURL,
        sort: state.inventorySortInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchDataAction,
        fetchData
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);