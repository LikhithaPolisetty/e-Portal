import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {
    login, logout, setEmployeeRates
} from '../../actions/mainActions';
import {connect} from "react-redux";
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class Rates extends Component {

    constructor(){
        super();
        this.state = {
            rates: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : target.value;
        const name = target.name;

        this.setState ({
            [name]: value.toUpperCase()
        }) ;

    }

    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };

            axios.get('http://'+localStorage.getItem('your_ip')+':8090/TabnerEmployeePayroll/employeerates', config)
                .then((response) => {
                    this.props.setEmployeeRates(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {

        const employee_rates = this.props.main.employeeRates.map((emprate, index) => {
            if(this.state.rates === ''){
                return   <tr className="employee_hover" key={index}>
                    <td>{emprate.emp_id}</td>
                    <td>{emprate.first_name}</td>
                    <td>{emprate.last_name}</td>
                    <td>{emprate.type}</td>
                    <td>{emprate.start_date}</td>
                    <td>{emprate.end_date}</td>
                    <td>{emprate.pay_rate}</td>
                    <td>{emprate.bill_rate}</td>
                </tr>
            } else {
                if((emprate.first_name.indexOf(this.state.rates) > -1) || (emprate.last_name.toUpperCase().indexOf(this.state.rates) > -1)){
                    return   <tr className="employee_hover" key={index}>
                        <td>{emprate.emp_id}</td>
                        <td>{emprate.first_name}</td>
                        <td>{emprate.last_name}</td>
                        <td>{emprate.type}</td>
                        <td>{emprate.start_date}</td>
                        <td>{emprate.end_date}</td>
                        <td>{emprate.pay_rate}</td>
                        <td>{emprate.bill_rate}</td>

                    </tr>
                } else {
                    return   <tr className="employee_hover" key={index} style={{display: 'none'}}>
                        <td>{emprate.emp_id}</td>
                        <td>{emprate.first_name}</td>
                        <td>{emprate.last_name}</td>
                        <td>{emprate.type}</td>
                        <td>{emprate.start_date}</td>
                        <td>{emprate.end_date}</td>
                        <td>{emprate.pay_rate}</td>
                        <td>{emprate.bill_rate}</td>
                    </tr>
                }
            }

        });

        return (
            <div className="container-fluid">

                <div className="search-div" style={{paddingLeft:'27px', paddingRight: '31px', marginLeft:'0px', marginRight: '0px'}}>
                    <div className="col-xs-1" style={{paddingLeft:'0px'}}>
                        <button className="btn btn-primary btn-align" type="button" data-toggle="modal" data-backdrop="false">Add</button>
                    </div>
                    <div className="col-xs-3" style={{float:'right'}}>
                        <input type="text" className="form-control"  placeholder="Search for..." id="rates" name="rates"
                               onChange={this.handleInputChange}/>
                    </div>

                </div>

                <div className="container">

                    <div className="table-div">
                        <div className="row justify-content-center">
                            <div className="col align-self-center">
                                <table class="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Type</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Pay Rate</th>
                                        <th>Bill Rate</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {employee_rates}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>




                    <div>
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
        setEmployeeRates: (employee_rates) => {
            dispatch(setEmployeeRates(employee_rates));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);