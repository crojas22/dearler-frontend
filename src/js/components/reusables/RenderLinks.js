import React from 'react';
import GoCalendar from 'react-icons/lib/go/calendar';
import MdAddCircle from "react-icons/lib/md/add-circle";
import MdRemoveCircle from "react-icons/lib/md/remove-circle";
import { NavLink } from "react-router-dom";
import { BtnLink } from "./Buttons";
import { ADD_TO_COMPARE, REMOVE_FROM_COMPARE } from "../../types/actionTypes";
import { snackBarShow } from "../../functions/HelperFunctions";

export const RenderLinks = ({links, classUL, classA, clickHandle, active}) => (
    <ul className={classUL}>
        {
            links.map((each, index) => (
                <BtnLink to={each} title={each} key={index} onClick={clickHandle}
                         classes={"p-3 border-0 font-weight-bold "+  (active === each ? "active" : "") + classA } />
            ))
        }
    </ul>
);

export const RenderBreadcrumps = ({title, title2}) => (
    <ol className="bread pl-0 py-3 d-flex my-3">
        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
        <li className="breadcrumb-item"><NavLink to={"/"+title2}>{title2}</NavLink></li>
        <li className="breadcrumb-item"><a >{title}</a></li>
    </ol>
);

export const RenderCarInfoLinks = props => (
    <ul className="car-links p-0 mt-4 mb-3 d-sm-flex flex-wrap">
        <li className="bg-light">
            <span>stock# </span> 323244
        </li>
        <li>
            <a onClick={props.click}>
                <GoCalendar/> Schedule a test drive
            </a>
        </li>
        {
            props.compare.filter(each => each.id === props.carInfo.id).length > 0 ?
                <li className="bg-light-blue">
                    <a onClick={() => {
                        props.setData(props.carInfo, REMOVE_FROM_COMPARE);
                        snackBarShow(props.setData, `${props.carInfo.carManufacturer} ${props.carInfo.model} REMOVED`)
                    }}>
                        <MdRemoveCircle size={18}/> from Compare
                    </a>
                </li>
                :
                <li>
                    <a onClick={() => {
                        if (props.compare.length < 3) {
                            props.setData(props.carInfo, ADD_TO_COMPARE);
                            snackBarShow(props.setData, `${props.carInfo.carManufacturer} ${props.carInfo.model} ADDED`)
                        }
                        else snackBarShow(props.setData, "MAX NUMBER OF CARS IN COMPARE")
                    }}>
                        <MdAddCircle size={18}/> to Compare
                    </a>
                </li>

        }
    </ul>
);