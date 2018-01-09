import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import { browserHistory} from "react-router";
import {login, logout} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


 class PayRates extends Component {
    constructor(){
        super();
        this.state = {
            payRates: []

        }
    }

    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };

            axios.get('http://'+localStorage.getItem('your_ip')+':8090/TabnerEmployeePayroll//employeerates/PAY', config)
                .then((response) => {
                    console.log('PRINTING PAYDATERS' + response);
                    console.log(response);
                    this.setState({
                        payRates: response.data.response
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
    render() {
        return(
            <div className="content-section implementation">
                <h4 className="rate-heading">Pay Rates</h4>
                <DataTable value={this.state.payRates}
                           reorderableColumns={true}
                           paginator={true} rows={10}>
                    <Column field="empId" header="EmpID" filter={true} filterMatchMode="contains" />
                    <Column field="lastName" header="LastName"  filter={true} filterMatchMode="contains"/>
                    <Column field="firstName" header="FirstName"  filter={true} filterMatchMode="contains"/>
                    <Column field="rate" header="Rate" filter={true} filterMatchMode="contains"/>
                    <Column field="start_date" header="StartDate" filter={true} filterMatchMode="contains"/>
                    <Column field="end_date" header="EndDate" filter={true} filterMatchMode="contains"/>
                </DataTable>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        main: state.main

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch(login());
        },
        logout: () => {
            dispatch(logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayRates);