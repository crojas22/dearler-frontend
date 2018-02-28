import React from 'react';
import { sendDataApi } from "../api";

const FormWithTab = (InnerComponent) => {
    return class OuterComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                tab: "1",
                accident: "no",
                exterior: "good",
                interior: "good",
                alert: false,
                success: false,
                message: "",
                result: null
            };
            this.handleSubmit = this.handleSubmit.bind(this);
            this.changeTab = this.changeTab.bind(this);
            this.getValue = this.getValue.bind(this);
            this.resetAlert = this.resetAlert.bind(this);
        };

        changeTab(e) {
            this.setState({tab: e.currentTarget.dataset.data});
        }

        getValue(e) {
            this.setState({[e.currentTarget.dataset.name]: e.target.value})
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
            return(
                <InnerComponent {...this.state} changeTab={this.changeTab} getValue={this.getValue}
                                submit={this.handleSubmit} clickHandle={this.resetAlert}/>
            )
        }
    }
};

export default FormWithTab;