import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import FaRoad from 'react-icons/lib/fa/road';
import MdLocalGasStation from 'react-icons/lib/md/local-gas-station';
import GoCalendar from 'react-icons/lib/go/calendar';
import MdDirectionsCar from 'react-icons/lib/md/directions-car';
import { Colmd } from "../reusables/Div";
import { RenderCarInfoLinks } from "../reusables/RenderLinks";
import FullPageModal from "../reusables/FullPageModal";
import TestDrive from "./TestDrive";
import { setData } from "../../actions";
import { sendDataApi } from "../../api";

class CarListingVertical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert2: false,
            success: false,
            message: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetAlert = this.resetAlert.bind(this);
    }

    handleSubmit(url, data, method, alert, success, failed) {
        sendDataApi(url, data, method)
            .then(resp => {
                if (resp.status === 201) this.setState({[alert]: true, success: true, message: success});
                else this.setState({[alert]: true, success: false, message: failed});
            });
    }

    resetAlert(alert) {
        this.setState({[alert]: false, message: ""})
    }

    render() {
        const title = `${this.props.year} ${this.props.carManufacturer} ${this.props.model}`;
        return(
            <div className="car-listing-vertical row mt-4 position-relative">
                <Link to={`/inventory/${this.props.id}`} className="col-md-4 mt-1 mb-4">
                    <img className="img-fluid w-100" src={this.props.pictureAddress} alt="car"/>
                </Link>
                <div className="col-md-8 pl-md-0">
                    <div className="d-flex justify-content-between">
                        <div >
                            <Link to={`/inventory/${this.props.id}`}>
                                <h4>{title}</h4>
                            </Link>
                        </div>
                        <div className="price mt-1">
                            <span>{`$${this.props.discountedPrice}`}</span>
                            <span>{`$${this.props.price}`}</span>
                        </div>
                    </div>
                    <div className="car-info row d-md-flex my-md-3 mx-md-2 justify-content-md-between">
                        <Colmd >
                            <div>
                                <FaRoad/>
                                <span>Miles</span>
                            </div>
                            <div>{this.props.mileage}</div>
                        </Colmd>
                        <Colmd>
                            <div>
                                <MdLocalGasStation/>
                                <span>Type</span>
                            </div>
                            <div>{this.props.fuelType}</div>
                        </Colmd>
                        <Colmd>
                            <div>
                                <GoCalendar/>
                                <span>Condition</span>
                            </div>
                            <div>{this.props.carCondition}</div>
                        </Colmd>
                        <Colmd>
                            <div>
                                <MdDirectionsCar/>
                                <span>Transmission</span>
                            </div>
                            <div>{this.props.transmissionType}</div>
                        </Colmd>
                    </div>
                    <FullPageModal carInfo={this.props} setData={this.props.setData} compare={this.props.compare}
                                   TriggerComponent={RenderCarInfoLinks}
                                   InnerComponent={<TestDrive {...this.state} info={title} clickHandle={this.resetAlert}
                                                              submit={this.handleSubmit} id={this.props.id}/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        compare : state.compareVehicles
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setData
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CarListingVertical);