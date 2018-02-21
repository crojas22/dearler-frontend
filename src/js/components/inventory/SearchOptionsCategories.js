import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchData, setData, searchOptionStatus } from "../../actions";
import { ADD_OPTION_SELECTED } from "../../types/actionTypes";
import { clickHandleHelper, displayInfo } from "../../functions/HelperFunctions";
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import FaChevronUp from "react-icons/lib/fa/chevron-up";

const SearchOptionsCategories = ({selected, counter, search, searchOptionStatus, active, option, title, url, setData, fetchData, selectedType, classes, index, sort, optionsSelected}) => {

    const onClickHandle = (e, variable) => {
        if (!url.join("").includes(variable)) {
            searchOptionStatus(!active, option);
            searchOptionStatus(true, selectedType);
            clickHandleHelper(e, variable, url, optionsSelected, index, title, selectedType, setData, ADD_OPTION_SELECTED, sort, fetchData);
        }
    };

    const obj = counter[search];

    return(
        <div className={classes}>
            {
                selected ?
                    <div>
                        <div  className={"px-2 bg-grey border selected "}>
                            <span onClick={e => onClickHandle(e, search)}>
                                {
                                    Object.keys(obj)[0]
                                }
                            </span>
                            <span className="badge badge-secondary rounded-0">
                                {
                                    Object.values(obj)[0]
                                }
                            </span>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={"bg-light p-2 title border "}
                             onClick={() => searchOptionStatus(!active, option)}>
                            <span>
                                {
                                    title
                                }
                            </span>
                            <span>
                                {
                                    active ? <FaChevronUp/> : <FaChevronDown/>
                                }
                            </span>
                        </div>
                        <div className="options">
                            <div>
                                {
                                    active ? displayInfo(counter, search , InnerComponent, onClickHandle, "not-selected"): null
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
};

const InnerComponent = ({title, value, click, classes}) => (
    <div className={"px-2 border bg-grey " + classes}>
        <span onClick={click}>
            {
                title
            }
        </span>
        <span className="badge badge-secondary rounded-0">
            {
                value
            }
        </span>
    </div>
);

const mapStateToProps = state => {
    return {
        url: state.inventorySearchURL,
        sort: state.inventorySortInfo,
        optionsSelected: state.optionsSelected
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchData,
        setData,
        searchOptionStatus
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchOptionsCategories);