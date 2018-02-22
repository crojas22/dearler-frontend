import React from 'react';
import MdDirectionsCar from 'react-icons/lib/md/directions-car';
import { InputLabel } from "../reusables/Form";
import { BtnSubmit } from "../reusables/Buttons";
import Alert from "../reusables/Alert";

const TestDrive = ({info, submit, id, showAlert2, success, clickHandle, message}) => {
    let _name, _phone, _email, _date;

    const submitHandle = e => {
        e.preventDefault();
        submit(`/v1/appointment/testdrive/${id}`, {
            name: _name.value,
            phone: _phone.value,
            email: _email.value,
            date: _date.value.slice(0, -5),
            time: _date.value.slice(-5)
        }, "POST", "showAlert2", "Success, we will call you to confirm", "Something went wrong, please try again");
        _name.value = "";
        _phone.value = "";
        _email.value = "";
        _date.value = "";
    };

    return(
        <form className="test-drive" onSubmit={submitHandle}>
            <div className="bg-black text-white px-3 px-md-4 py-3 py-md-4 d-flex">
                <div className="mr-3">
                    <MdDirectionsCar size={45} color="#6b98e2"/>
                </div>
                <div>
                    <h5>
                        SCHEDULE A TEST DRIVE
                    </h5>
                    <p>
                        {
                            info
                        }
                    </p>
                </div>
            </div>
            <div className="px-3 px-md-4 py-3 py-md-4">
                <Alert show={showAlert2} classes={"" + (success ? "success": "danger")} clickHandle={clickHandle}
                       message={message} alert="showAlert2"/>
                <div className="form-row">
                    <InputLabel _for="name" divClass="col-md-6 pr-md-3"  inputRef={input => _name = input} title="Name:"/>

                    <InputLabel _for="phone" divClass="col-md-6" inputRef={input => _phone = input} title="Phone:" type="tel"/>
                </div>
                <div className="form-row">
                    <InputLabel _for="email" divClass="col-md-6 pr-md-3" inputRef={input => _email = input} title="Email:" type="email"/>
                    <InputLabel _for="date" divClass="col-md-6" inputRef={input => _date = input} title="Date/Time:" type="datetime-local"/>
                </div>
            </div>
            <BtnSubmit title="Submit" classes="btn-primary ml-3 ml-md-4 mb-3 mb-md-4"/>
        </form>
    )
};

export default TestDrive;