import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import { browserHistory} from "react-router";
import {login, logout, setDefaultEmployee, setDefaultVendor} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class DefaultVendor extends Component {
    constructor(){
        super();

    }

    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };

            axios.get('http://localhost:8080/TabnerEmployeePayroll/defaulttabnervendor', config)
                .then((response) => {
                    console.log('printinig default vendor');
                    console.log(response.data.response);
                    this.props.setDefaultVendor(response.data.response);

                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
    render() {
        return(
            <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Vendor Details</a>
                        </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse">
                        <div class="panel-body">
                            <h4>Id Number: {this.props.main.defaultVendor.id_number}</h4>
                            <h4> Name: {this.props.main.defaultVendor.name}</h4>
                            <h4>Registration State: {this.props.main.defaultVendor.reg_state}</h4>
                            <h4>Invoice Frequency: {this.props.main.defaultVendor.invoice_freq}</h4>
                            <h4>Payment Frequency: {this.props.main.defaultVendor.payment_freq}</h4>
                        </div>
                    </div>
                </div>
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
        },
        setDefaultVendor: (vendor) =>{
            dispatch(setDefaultVendor(vendor));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultVendor);