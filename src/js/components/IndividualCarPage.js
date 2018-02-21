import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import MdLocalGasStation from 'react-icons/lib/md/local-gas-station';
import { RenderBreadcrumps, RenderCarInfoLinks, RenderLinks } from "./reusables/RenderLinks";
import { fetchData, setData } from "../actions";
import { TrTd } from "./reusables/Div";
import { renderFeatures } from "../functions/HelperFunctions";
import ContactForm from "./individualCar/ContactForm";
import TestDrive from "./inventory/TestDrive";
import FullPageModal from "./reusables/FullPageModal";
import { SnackBar } from "./reusables/SnakBar";
import Calculator from "./individualCar/Calculator";

class IndividualCarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTabActive: "Vehicle Features",
            showAlert: false,
            success: false,
            message: "",
            result: null
        };
        this.changeTab = this.changeTab.bind(this);
        this.changeMainPic = this.changeMainPic.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchData(
            `http://localhost:8080/api/v1/vehicles/${this.props.match.params.car}?projection=features`, 'GET', "CAR_INFO"
        );
        window.scrollTo(0,0);
    }

    changeMainPic(event) {
        document.querySelector(".main-pic").attributes.src.value = event.target.attributes.src.value;
    }

    handleSubmit(data, id) {
        fetch(`http://localhost:8080/api/v1/add/inquiries/${id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(resp => {
            if (resp.status === 201) this.setState({showAlert: true, success: true, message: "Success!! Message sent"});
            else this.setState({showAlert: true, success: false, message: "Sorry, something went wrong"});
        });
    }

    changeTab(e) {
        e.preventDefault();
        this.setState({currentTabActive: e.target.innerHTML})
    }

    render() {
        const {carManufacturer, year, model, pictureAddress, price, exteriorColor, interiorColor, vinNumber, picture2,
            picture3, picture4, bodyType, mileage, fuelType, transmissionType, wheelDrive, features, id} = this.props.info;
        const title = `${year} ${carManufacturer} ${model}`;
        return(
            <div className="individual-car-page container-fluid px-md-5">
                <RenderBreadcrumps title={title}/>
                <div className="row">
                    <div className="col-lg-8">
                        <h4 className="pt-2">
                            {
                                title
                            }
                        </h4>
                        <FullPageModal info={title} InnerComponent={TestDrive} compare={this.props.compare}
                                       TriggerComponent={RenderCarInfoLinks} id={id} carInfo={this.props.info} setData={this.props.setData}/>
                        <div>
                            <div>
                                <img className="main-pic img-fluid w-100" src={pictureAddress} alt={carManufacturer}/>
                            </div>
                            <div className="d-flex my-2">
                                <div className="col p-0 pr-2">
                                    <img className="img-fluid w-100" onClick={this.changeMainPic} src={picture2} alt={carManufacturer}/>
                                </div>
                                <div className="col p-0 pr-2">
                                    <img className="img-fluid w-100" onClick={this.changeMainPic} src={picture3} alt={carManufacturer}/>
                                </div>
                                <div className="col p-0 pr-2">
                                    <img className="img-fluid w-100" onClick={this.changeMainPic} src={picture4} alt={carManufacturer}/>
                                </div>
                                <div className="col p-0">
                                    <img className="img-fluid w-100" onClick={this.changeMainPic} src={pictureAddress} alt={carManufacturer}/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black px-2 mt-3">
                            <RenderLinks links={["Vehicle Features", "Contact"]}
                                         classUL=" nav-tab-menu m-0 p-0 " classA=""
                                         active={this.state.currentTabActive}
                                         clickHandle={this.changeTab}/>
                        </div>
                        <div className="container-fluid features-tab mb-3">
                            {
                                this.state.currentTabActive === "Vehicle Features" ?
                                    renderFeatures(features, "row flex-wrap", "col-sm-4 px-0 pt-2") :
                                    this.state.currentTabActive === "Contact" ?
                                        <ContactForm info={this.props.info} submit={this.handleSubmit} {...this.state}
                                                     clickHandle={() => this.setState({showAlert: false, message: ""})}/> : null
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 side-panel">
                        <div>
                            <div className="p-4 mt-2">
                                <span>OUR PRICE </span><span>${price}</span>
                            </div>
                            <div className="bg-black text-center text-uppercase">
                                plus taxes
                            </div>
                            <table className="my-2 table">
                                <tbody>
                                    <TrTd title="BODY" value={bodyType}/>
                                    <TrTd title="MILEAGE" value={mileage}/>
                                    <TrTd title="FUEL TYPE" value={fuelType}/>
                                    <TrTd title="YEAR" value={year}/>
                                    <TrTd title="TRANSMISSION" value={transmissionType}/>
                                    <TrTd title="DRIVE" value={wheelDrive}/>
                                    <TrTd title="EXTERIOR COLOR" value={exteriorColor}/>
                                    <TrTd title="INTERIOR COLOR	" value={interiorColor}/>
                                    <TrTd title="VIN" value={vinNumber}/>
                                </tbody>
                            </table>
                        </div>
                        <div className="gas my-3 d-flex justify-content-center">
                            <div>
                                <span>{this.props.info.mpgStreet}</span>
                                <span>CITY MPG</span>
                            </div>
                            <div className="h-100">
                                <MdLocalGasStation/>
                            </div>
                            <div>
                                <span>{this.props.info.mpgHighway}</span>
                                <span>HWY MPG</span>
                            </div>
                        </div>
                        <Calculator price={this.props.info.price} result={this.state.result} submit={result => this.setState({result: result})}/>
                    </div>
                </div>
                <SnackBar message={this.props.snackBar.message} show={this.props.snackBar.show}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        info : state.individualCarData,
        compare : state.compareVehicles,
        snackBar: state.snackBarStatus
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchData,
        setData
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualCarPage);