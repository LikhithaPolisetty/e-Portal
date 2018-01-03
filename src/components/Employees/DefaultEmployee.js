import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import { browserHistory} from "react-router";
import {login, logout, setDefaultEmployee} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class DefaultEmployee extends Component {
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

            axios.post('http://localhost:8080/TabnerEmployeePayroll/defaulttabneremployee', {
                username : this.props.main.userName
            }, config)
                .then((response) => {
                    console.log('printinig default employee');
                    console.log(response.data.response);
                    this.props.setDefaultEmployee(response.data.response);
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
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Personal Details</a>
                        </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse">
                        <div class="panel-body">
                            <h4>Employee Id: {this.props.main.defaultEmployee.emp_id}</h4>
                            <h4>First Name: {this.props.main.defaultEmployee.first_name}</h4>
                            <h4>Last Name: {this.props.main.defaultEmployee.last_name}</h4>
                            <h4>Email: {this.props.main.defaultEmployee.email_id}</h4>
                            <h4>Mobile: {this.props.main.defaultEmployee.mobile_num}</h4>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Immigration Details</a>
                        </h4>
                    </div>
                    <div id="collapse2" class="panel-collapse collapse">
                        <div class="panel-body">
                            <h4>Passport: {this.props.main.defaultEmployee.passport}</h4>
                            <h4>Visa: {this.props.main.defaultEmployee.visa}</h4>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Education Details</a>
                        </h4>
                    </div>
                    <div id="collapse3" class="panel-collapse collapse">
                        <div class="panel-body">
                            <h4>Education: {this.props.main.defaultEmployee.education}</h4>
                            <h4>Experience: {this.props.main.defaultEmployee.experience}</h4>
                            <h4>Skills: {this.props.main.defaultEmployee.skills}</h4>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">Address Details</a>
                        </h4>
                    </div>
                    <div id="collapse4" class="panel-collapse collapse">
                        <div class="panel-body">
                            <h4>Address: {this.props.main.defaultEmployee.address}</h4>
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
        setDefaultEmployee: (employee) => {
            dispatch(setDefaultEmployee(employee));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultEmployee);