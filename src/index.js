import React from 'react';
import ReactDOM from 'react-dom';
/*import './index.css';*/
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import App from './components/App';
import Home from './components/Home';
import Employee from "./components/Payrolls/Employee";
import Rates from "./components/Rates/Rates";
import PayRates from "./components/Rates/PayRates";
import BillRates from "./components/Rates/BillRates";
import store from "./store";
import {Provider} from "react-redux";
import Barcode from "./components/Otp/Barcode";
import Totp from "./components/Otp/Totp";
import TabnerEmployees from "./components/Employees/TabnerEmployees";
import DefaultEmployee from "./components/Employees/DefaultEmployee";
import Clients from "./components/ClientsComponents/Clients";
import Vendors from "./components/VendorsComponents/Vendors";



require("./stylesheets/css/main.css");


class Main extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={App} >
                    <IndexRoute component={Home} />
                    <Route path={"loggedIn"} component={Employee}  />
                    <Route path={"home"} component={Home} />
                    <Route path={"barcode"} component={Barcode} />
                    <Route path={"totp"} component={Totp} />
                    <Route path={"rates"} component={Rates} >
                        <Route path={"payrates"} component={PayRates}  />
                        <Route path={"billrates"} component={BillRates} />
                    </Route>
                    <Route path={"employees"} component={TabnerEmployees} >
                        <IndexRoute component={DefaultEmployee}/>
                    </Route>
                    <Route path={"vendors"} component={Vendors} />
                    <Route path={"clients"} component={Clients} />
                </Route>
                <Route path={"home-single"} component={Home}/>
            </Router>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    window.document.getElementById('root'));

