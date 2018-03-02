import React from 'react';

function CarouselControl(Component) {
    return class OuterComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                displayFrom: 0,
                displayTo: 1,
                perPage: 1
            };
            this.updateWindowSize = this.updateWindowSize.bind(this);
            this.forward = this.forward.bind(this);
            this.backward = this.backward.bind(this);
        }

        componentDidMount() {
            this.updateWindowSize();
            window.addEventListener("resize", this.updateWindowSize, false);
        }

        componentWillUnmount() {
            this.updateWindowSize();
            window.removeEventListener("resize", this.updateWindowSize, false)
        }

        updateWindowSize() {
            if (window.innerWidth > 824 && window.innerWidth < 1200) {
                this.setState({
                    displayFrom: 0,
                    perPage: 2,
                    displayTo: 2
                });
            } else if (window.innerWidth > 1200) {
                this.setState({
                    displayFrom: 0,
                    perPage: 3,
                    displayTo: 3
                });
            } else {
                this.setState({
                    displayFrom: 0,
                    perPage: 1,
                    displayTo: 1
                });
            }
        }

        forward(arrayLength) {
            this.setState(prevState => ({
                displayFrom: (prevState.displayFrom + prevState.perPage) % arrayLength,
                displayTo: ((prevState.displayTo % arrayLength) + prevState.perPage)
            }))
        }

        backward(arrayLength) {
            if (this.state.displayFrom === 0) {
                this.setState(prevState => ({
                    displayFrom: arrayLength - prevState.perPage,
                    displayTo: arrayLength
                }))
            } else {
                this.setState(prevState => ({
                    displayFrom: prevState.displayFrom - prevState.perPage,
                    displayTo: prevState.displayTo - prevState.perPage
                }))
            }
        }

        render() {
            return(
                <Component {...this.state} {...this.props} forward={this.forward} backward={this.backward}/>
            )
        }
    }
}

export default CarouselControl;