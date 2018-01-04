import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import { browserHistory} from "react-router";
import {login, logout, setDefaultClient, setDefaultEmployee, setDefaultVendor} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class DefaultClient extends Component {
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

            axios.get('http://localhost:8080/TabnerEmployeePayroll/defaulttabnerclient', config)
                .then((response) => {
                    console.log('printinig default client');
                    console.log(response.data.response);
                    this.props.setDefaultClient(response.data.response);

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
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Client Details</a>
                        </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse">
                        <div class="panel-body">
                            <h4>Name: {this.props.main.defaultClient.clientname}</h4>
                            <h4>Phone: {this.props.main.defaultClient.phone}</h4>
                            <h4>Email: {this.props.main.defaultClient.email}</h4>
                            <h4>Location: {this.props.main.defaultClient.location}</h4>
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
        setDefaultClient: (vendor) =>{
            dispatch(setDefaultClient(vendor));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClient);