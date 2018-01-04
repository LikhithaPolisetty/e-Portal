import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import { browserHistory} from "react-router";
import {login, logout, setDefaultClient} from '../../actions/mainActions';
import {connect} from "react-redux";

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
                    console.log(response.data.response);

                    console.log('printinig default vendor');
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

            <div className="panel-group" id="accordion">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Vendor Details</a>
                        </h4>
                    </div>
                    <div id="collapse1" className="panel-collapse collapse">
                        <div className="panel-body">
                            <h4>Client Name: {this.props.main.defaultClient.clientname}</h4>
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
        setDefaultClient: (vendor) => {
            dispatch(setDefaultClient(vendor));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClient);