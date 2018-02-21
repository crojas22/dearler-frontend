import React from 'react';

const OnOff = (InnerComponent) => {
    return class OuterComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                active: false
            };
            this.clickOnOff = this.clickOnOff.bind(this);
            this.clickOut = this.clickOut.bind(this);
            this.clickIn = this.clickIn.bind(this);
        }

        clickOnOff() {
            this.setState({active: !this.state.active});
        }

        clickOut(e) {
            e.target === document.querySelector(".modal") ? this.setState({active:false}) : null
        }

        clickIn() {
            this.setState({active: true});
        }

        render() {
            return(
                <InnerComponent {...this.props} {...this.state} clickHandle={this.clickOnOff} clickOut={this.clickOut}
                                clickIn={this.clickIn}/>
            )
        }

    }
};

export default OnOff;