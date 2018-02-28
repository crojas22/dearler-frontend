import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div className="wrapper d-flex justify-content-center align-items-center"><div className="loader"></div></div>;

const HomePage = Loadable({
    loader: () => import('./HomePage'),
    loading: Loading
});

const Inventory = Loadable({
    loader: () => import("./Inventory"),
    loading: Loading
});

const IndividualCarPage = Loadable({
    loader: () => import("./IndividualCarPage"),
    loading: Loading
});

const Compare = Loadable({
    loader: () => import("./Compare"),
    loading: Loading
});

const TradeIn = Loadable({
    loader: () => import("./TradeIn"),
    loading: Loading
});

const PreApproval = Loadable({
    loader: () => import("./PreApproval"),
    loading: Loading
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perPage: 6,
            pageNumber: 1
        };
        this.changePageNumber = this.changePageNumber.bind(this);
        this.resetPage = this.resetPage.bind(this);
    }

    resetPage() {
        this.setState({pageNumber: 1});
    }

    changePageNumber(value, totalLinks) {
        if (!isNaN(value)) {
            this.setState({pageNumber: parseInt(value, 10)});
            window.scrollTo(0,0);
        } else if (value === "&lt;&lt;" && this.state.pageNumber > 1) {
            this.setState({pageNumber: this.state.pageNumber - 1});
            window.scrollTo(0,0);
        } else if (value === "&gt;&gt;" && this.state.pageNumber < totalLinks) {
            this.setState({pageNumber: this.state.pageNumber + 1});
            window.scrollTo(0,0);
        }
    }

    render() {
        return(
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/inventory' render={
                    () => (<Inventory {...this.state} changePage={this.changePageNumber} resetPage={this.resetPage}/>)
                }/>
                <Route path='/inventory/:car' render={props => (<IndividualCarPage {...props}/>)}/>
                <Route exact path="/financing/trade-in" component={TradeIn}/>
                <Route exact path="/financing/pre-approval" component={PreApproval}/>
                <Route path="/compare" component={Compare}/>
            </Switch>
        );
    }
}

export default App;
