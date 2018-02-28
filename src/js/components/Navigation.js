import React from 'react';
import PhoneContactInfo from "./navigation/PhoneContactInfo";
import AddressInfo from "./navigation/AddressInfo";
import { BtnInput } from "./reusables/Buttons";
import { NavLink, withRouter } from "react-router-dom";
import OnOff from "../hoc/OnOff";
import { connect } from "react-redux";
import MdViewCarousel from "react-icons/lib/md/view-carousel";

const Navigation = ({clickHandle, active, compareArray, clickDropDown, dropDown}) => {
    const counter = compareArray.length;
    return(
        <nav className="navigation">
            <div className="justify-content-between navbar navbar-expand-md navbar-dark bg-black py-3">
                <div>
                    <a className="navbar-brand my-1" >
                        <img src="http://motors.stylemixthemes.com/wp-content/uploads/2015/12/logo.svg" alt="logo"/>
                    </a>
                    <div>
                        <PhoneContactInfo classes="d-md-none"/>
                    </div>
                </div>
                <div className="d-flex">
                    <AddressInfo classes="d-none d-md-block"/>
                    <PhoneContactInfo classes="d-none d-md-block"/>
                </div>
                <BtnInput title={<span className="navbar-toggler-icon"></span>} onClick={clickHandle} classes="navbar-toggler border-0"/>
            </div>
            <div className="navbar navbar-expand-md navbar-light bg-light p-0">
                <div className={"justify-content-md-between navbar-collapse " + (active ? "" : "collapse")}>
                    <ul className="navbar-nav">
                        <NavLink exact to="/" className="nav-link btn rounded-0 p-3 font-weight-bold">Home</NavLink>
                        <NavLink to="/inventory" className="nav-link btn rounded-0 p-3 font-weight-bold">Inventory</NavLink>
                        <li className="nav-item dropdown" onClick={() => clickDropDown("dropDown")} >
                            <a className="dropdown-toggle nav-link btn rounded-0 p-3 font-weight-bold">Financing</a>
                            <div className={"bg-light dropdown-menu p-0 m-0 border-0 rounded-0 " + (dropDown?"d-block":"")}>
                                <NavLink to="/financing/pre-approval" className="nav-link p-3 border-top">
                                    Application
                                </NavLink>
                                <NavLink to="/financing/trade-in" className="nav-link p-3 border-top border-bottom">
                                    Sell vehicle
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <NavLink to="/compare" className="btn d-block rounded-0 py-md-2 py-2 pl-3 pr-2">
                            <span className="d-inline-block h-100 position-relative">
                                Compare <MdViewCarousel size={40}/>
                                {
                                    counter > 0 ? <div className="counter">{counter}</div>
                                        : null
                                }
                            </span>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

const mapStateToProps = state => {
    return {
        compareArray: state.compareVehicles
    }
};

export default withRouter(connect(mapStateToProps,null)(OnOff(Navigation)));