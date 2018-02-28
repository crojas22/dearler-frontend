import React from 'react';
import Navigation from "./Navigation";
import Footer from "./reusables/Footer";
import { RenderBreadcrumps } from "./reusables/RenderLinks";
import { TitleSeparator } from "./reusables/Div";
import MdDirectionsCar from 'react-icons/lib/md/directions-car';
import MdEventSeat from 'react-icons/lib/md/event-seat';
import GoAlert from 'react-icons/lib/go/alert';
import FormWithTab from "../hoc/FormWithTab";
import { InputLabel } from "./reusables/Form";
import { BtnInput, BtnSubmit } from "./reusables/Buttons";
import Alert from "./reusables/Alert";

const TradeIn = ({changeTab, tab, getValue, accident, interior, exterior, submit, alert, success, message, clickHandle}) => {
    let _make, _model, _year, _transmission, _mileage, _vin, _first, _last, _phone, _email, _comment;

    const submitHandler = e => {
        e.preventDefault();
        submit("v1/application/trade-in", {
            first: _first.value,
            last: _last.value,
            phone: _phone.value,
            email: _email.value,
            comment: _comment.value,
            make: _make.value,
            model: _model.value,
            year: _year.value,
            transmission: _transmission.value,
            mileage: _mileage.value,
            vin: _vin.value,
            exteriorCondition: exterior,
            interiorCondition: interior,
            accident: accident
        }, "POST", "alert", "Application submitted", "Something went wrong, please try again");
        _make.value = "";
        _model.value = "";
        _year.value = "";
        _transmission.value = "";
        _mileage.value = "";
        _vin.value = "";
        _first.value = "";
        _last.value = "";
        _phone.value = "";
        _email.value = "";
        _comment.value = "";
    };

    return(
        <div>
            <Navigation/>
            <div className="trade-in">
                <div className="img">
                    <h2 className="text-white p-3 px-xl-5">Sell Your Vehicle</h2>
                </div>
                <div className="container-fluid px-xl-5">
                    {/*<RenderBreadcrumps title2="inventory" title="Trade-in"/>*/}
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="mb-4">
                                <h2 className="font-weight-bold mt-4">TRADE IN <br className="d-none d-lg-block"/>APPLICATION</h2>
                                <TitleSeparator/>
                                <p className="pt-4 text-muted">
                                    Interested in trading in your current vehicle? It would probably be good to have an
                                    estimate of what it’s worth first.
                                    After all, trading in a vehicle is a lot less hassle than selling it yourself.
                                    And you can often lower your payments by trading in a vehicle as well. Win-win!
                                </p>
                                <p className="text-muted">
                                    We’re here to help you make an informed decision.
                                    Fill out the simple form below, and we’ll send you an estimated appraisal within 48 hours.
                                    From there, it’s up to you what you want to do!
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                <TabSelector click={changeTab} num="1" current={tab}
                                             title="CAR INFORMATION" info="Add your vehicle details"/>
                                <TabSelector click={changeTab} num="2" current={tab}
                                             title="CAR CONDITION" info="Add more vehicle details"/>
                                <TabSelector click={changeTab} num="3" current={tab}
                                             title="CONTACT DETAILS" info="Your contact details"/>
                            </div>
                            <form onSubmit={submitHandler}>
                                <Alert show={alert} classes={"" + (success ? "success": "danger") + " mb-0 mt-4"} message={message}
                                       alert="alert" clickHandle={clickHandle}/>
                                <Tab1 makeRef={input => _make = input} modelRef={input => _model = input}
                                      yearRef={input => _year = input} transRef={input => _transmission = input}
                                      mileageRef={input => _mileage = input} vinRef={input => _vin = input} click={changeTab} tab={tab}/>
                                <Tab2 click={changeTab} tab={tab} getValue={getValue}/>
                                <Tab3 tab={tab} firstRef={input => _first = input} lastRef={input => _last = input}
                                      phoneRef={input => _phone = input} emailRef={input => _email = input}
                                      commentRef={input => _comment = input}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

const Tab1 = props => (
    <div className={"pt-4 mb-4 "+(props.tab==="1"?"": "d-none")}>
        <div className="row">
            <InputLabel _for="make" divClass="col-md-4 col-sm-4"  inputRef={props.makeRef} title="Make:" required={false}/>
            <InputLabel _for="model" divClass="col-md-4 col-sm-4"  inputRef={props.modelRef} title="Model:" required={false}/>
            <InputLabel _for="year" divClass="col-md-4 col-sm-4"  inputRef={props.yearRef} title="Year:" required={false}/>
        </div>
        <div className="row">
            <InputLabel _for="transmission" divClass="col-md-4 col-sm-4"  inputRef={props.transRef} title="Transmission:" required={false}/>
            <InputLabel _for="mileage" divClass="col-md-4 col-sm-4"  inputRef={props.mileageRef} title="Mileage:" required={false}/>
            <InputLabel _for="vin" divClass="col-md-4 col-sm-4"  inputRef={props.vinRef} title="Vin:" required={false}/>
        </div>
        <BtnInput title="Continue" classes="btn-primary" data="2" onClick={props.click}/>
    </div>
);

const Tab2 = props => (
    <div className={"mt-2 mb-4 "+(props.tab==="2"?"": "d-none")} >
        <div className="py-3 border-bottom">
            <MdDirectionsCar size={30}/>
            <p className="m-0 pb-2">What is the Exterior Condition?</p>
            <Tab2Options _for="exterior" getValue={props.getValue}/>
        </div>
        <div className="py-3 border-bottom">
            <MdEventSeat size={30}/>
            <p className="m-0 pb-2">What is the Interior Condition?</p>
            <Tab2Options _for="interior" getValue={props.getValue}/>
        </div>
        <div className="py-3 border-bottom">
            <GoAlert size={30}/>
            <p className="m-0 pb-2">Has vehicle been in accident</p>
            <div className="row" data-name="accident" onChange={props.getValue}>
                <InputLabel _for="accident" checked={true} labelClass="order-1 m-0" inputClass="order-0 mt-1 mr-2"
                            divClass="col-md-4 col-sm-4 d-flex" title="No" value="no" type="radio"/>
                <InputLabel _for="accident" labelClass="order-1 m-0" inputClass="order-0 mt-1 mr-2"
                            divClass="col-md-4 col-sm-4 d-flex" value="yes" title="Yes" type="radio"/>
            </div>
        </div>
        <BtnInput title="Continue" classes="btn-primary mt-3" data="3" onClick={props.click}/>
    </div>
);

const Tab2Options = props => (
    <div className="row" data-name={props._for} onChange={props.getValue}>
        <InputLabel _for={props._for} checked={true} value="good" labelClass="order-1 m-0" inputClass="order-0 mt-1 mr-2"
                    divClass="col-md-4 col-sm-4 d-flex" title="Good" type="radio"/>
        <InputLabel _for={props._for} labelClass="order-1 m-0" value="average" inputClass="order-0 mt-1 mr-2"
                    divClass="col-md-4 col-sm-4 d-flex" title="Average" type="radio"/>
        <InputLabel _for={props._for} labelClass="order-1 m-0" value="bad" inputClass="order-0 mt-1 mr-2"
                    divClass="col-md-4 col-sm-4 d-flex" title="Bad" type="radio"/>
    </div>
);

const Tab3 = props => (
    <div className={"pt-4 mb-4 "+(props.tab==="3"?"": "d-none")}>
        <div className="row">
            <InputLabel _for="first" divClass="col-md-6 col-sm-6"  inputRef={props.firstRef} title="First name:"/>
            <InputLabel _for="last" divClass="col-md-6 col-sm-6"  inputRef={props.lastRef} title="Last name:"/>
        </div>
        <div className="row">
            <InputLabel _for="tel" divClass="col-md-6 col-sm-6"  inputRef={props.phoneRef} title="Phone number:"/>
            <InputLabel _for="email" type="email" divClass="col-md-6 col-sm-6"  inputRef={props.emailRef} title="Email:"/>
        </div>
        <div className="form-group">
            <label htmlFor="message">
                Comment:
            </label>
            <textarea className="form-control rounded-0 bg-light" name="message" id="message" rows="5" ref={props.commentRef}/>
        </div>
        <div className="d-flex flex-wrap flex-md-nowrap">
            <div className="d-flex mr-3 mb-3">
                <BtnSubmit title="Submit" classes="btn-primary align-self-center"/>
            </div>
            <p className="mb-0 font-90 text-muted">
                By submitting this form, you will be requesting trade-in value at no
                obligation and will be contacted within 48 hours by a sales representative.
            </p>
        </div>
    </div>
);

const TabSelector = props => (
    <div className=" col-md-4 col-sm-4 pt-4">
        <div className="pointer" onClick={props.click} data-data={props.num}>
            <div className={"num mb-2 d-inline-block rounded-circle text-center " + (props.current===props.num?"bg-prime text-white": "")}>{props.num}</div>
            <div className="font-weight-bold">{props.title}</div>
            <div className={"border-bottom-5 text-muted font-90 pb-2 "+(props.current===props.num?"border-prime":"")}>{props.info}</div>
        </div>
    </div>
);

export default FormWithTab(TradeIn);