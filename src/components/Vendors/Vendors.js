import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {login, logout, setTabnerVendors, deleteVendor} from '../../actions/mainActions';
import {connect} from "react-redux";
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class Vendors extends Component {

    constructor(){
        super();
        this.state = {
            ven: '',
            id_number: '',
            name: '',
            reg_state: '',
            invoice_freq: '',
            payment_freq: '',
            address: '',
            messageForCreateUser: '',
            message: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onVendorSelect = this.onVendorSelect.bind(this);
        this.handleCreateVendor = this.handleCreateVendor.bind(this);
        this.ifGotResponseFromCreateVendor = this.ifGotResponseFromCreateVendor.bind(this);
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
            axios.get('http://'+localStorage.getItem('your_ip')+':8090/TabnerEmployeePayroll/tabnervendors', config)
                .then((response) => {
                    this.props.setTabnerVendors(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                    console.log(this.props.main.tabnerVendors);
                    console.log(this.props.main.tabnerVendors[0]);

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    handleCreateVendor(event){
        event.preventDefault();
        console.log(this.state.id_number + this.state.name + this.state.reg_state + this.state.invoice_freq + this.state.payment_freq + this.state.address);

        var config = {
            headers: {'tabner_token': localStorage.getItem('tabner_token')}
        };
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/TabnerEmployeePayroll/newvendor', {
            id_number: this.state.id_number,
            name : this.state.name,
            reg_state : this.state.reg_state,
            invoice_freq: this.state.invoice_freq,
            payment_freq: this.state.payment_freq,
            address: this.state.address
        }, config)
            .then((response) => this.ifGotResponseFromCreateVendor(response))
            .catch(function (error) {
                console.log(error);
            });
    }

    ifGotResponseFromCreateVendor(response) {
        console.log(response);
        if (response.data.response === true) {

            console.log(response.data.response);

            browserHistory.push("/home");
            browserHistory.push("/loggedIn");

        }
        if (response.data.response === false){
            console.log('message is setting');
            this.setState({

                messageForCreateUser: '* The given Vendor details already exists'
            });
        }

    }

    onVendorSelect(index){
        var alert_msg = window.confirm("Are you sure you want to delete?");
        if(alert_msg) {
            var config = {
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };
            axios.post('http://'+localStorage.getItem('your_ip')+':8090/TabnerEmployeePayroll/deletevendor', {
                id_number: this.props.main.tabnerVendors[index].id_number
            }, config)
                .then((response) => this.ifGotResponseFromDeleteVendor(response, index))
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    ifGotResponseFromDeleteVendor(response, index){
        console.log(response);
        if (response.data.response === true) {

            console.log(response.data.response);
            this.props.deleteVendor(index);

        }
        if (response.data.response === false){
            console.log('message is setting');
            this.setState({

                messageForCreateUser: '* Something went wrong'
            });
        }
    }


    render() {

        const vendors = this.props.main.tabnerVendors.map((vendor, index) => {
            if(this.state.ven === ''){
                return   <tr className="employee_hover" key={index}>
                    <td>{vendor.id_number}</td>
                    <td>{vendor.name}</td>
                    <td>{vendor.reg_state}</td>
                    <td>{vendor.invoice_freq}</td>
                    <td>{vendor.payment_freq}</td>
                    <td>{vendor.address}</td>
                    <td> <span className="glyphicon glyphicon-trash" onClick = { () => this.onVendorSelect(index)}></span></td>
                </tr>
            } else {
                if((vendor.id_number.indexOf(this.state.ven) > -1) || (vendor.name.toUpperCase().indexOf(this.state.ven) > -1) || (vendor.reg_state.indexOf(this.state.ven) > -1) || (vendor.invoice_freq.toUpperCase().indexOf(this.state.ven) > -1) || (vendor.payment_freq.toUpperCase().indexOf(this.state.ven) > -1) || (vendor.address.toUpperCase().indexOf(this.state.ven) > -1)){
                    return   <tr className="employee_hover" key={index}>
                        <td>{vendor.id_number}</td>
                        <td>{vendor.name}</td>
                        <td>{vendor.reg_state}</td>
                        <td>{vendor.invoice_freq}</td>
                        <td>{vendor.payment_freq}</td>
                        <td>{vendor.address}</td>
                        <td> <span className="glyphicon glyphicon-trash" onClick = { () => this.onVendorSelect(index)}></span></td>
                    </tr>
                } else {
                    return   <tr className="employee_hover" key={index} style={{display: 'none'}}>
                        <td>{vendor.id_number}</td>
                        <td>{vendor.name}</td>
                        <td>{vendor.reg_state}</td>
                        <td>{vendor.invoice_freq}</td>
                        <td>{vendor.payment_freq}</td>
                        <td>{vendor.address}</td>
                        <td> <span className="glyphicon glyphicon-trash" onClick = { () => this.onVendorSelect(index)}></span></td>
                    </tr>
                }
            }

        });

        return (
            <div className="container">

                <div className="search-div" style={{paddingLeft:'27px', paddingRight: '31px', marginLeft:'0px', marginRight: '0px'}}>
                    <div className="col-xs-1" style={{paddingLeft:'0px'}}>
                        <button className="btn btn-primary btn-align" type="button" data-toggle="modal" data-target="#newVendor" data-backdrop="false">Add Vendor</button>
                    </div>
                    <div className="col-xs-3" style={{float:'right'}}>
                        <input type="text" className="form-control"  placeholder="SEARCH FOR Vendors" id="ven" name="ven"
                               onChange={this.handleInputChange}/>
                    </div>

                </div>

                <div>

                    <div className="table-div">
                        <div className="row justify-content-center">
                            <div className="col align-self-center">
                                <table class="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Vendor ID</th>
                                        <th>Vendor Name</th>
                                        <th>Registration State</th>
                                        <th>Invoice Frequency</th>
                                        <th>Payment Frequency</th>
                                        <th>Address</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {vendors}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>




                    <div>
                    </div>

                    <div className="modal fade" id="newVendor" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content"  style={{backgroundColor: '#2d60a3'}}>
                                <div className="modal-header">
                                    <div className="row">
                                        <div className="col-xs-11">
                                            <h4 className="modal-title forms-text">ADD NEW VENDOR</h4>
                                        </div>
                                        <div className="col-xs-1">
                                            <a data-dismiss="modal" style={{cursor : 'pointer'}}><span className="glyphicon glyphicon-remove"></span></a
                                            ></div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleCreateVendor.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor="idclient">Vendor ID</label>
                                            <input type="text" className="form-control" placeholder="Vendor ID" id= "id_number" name="id_number"
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clientname">Vendor Name</label>
                                            <input type="text" className="form-control" placeholder="VENDOR NAME" id= "name" name="name"
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Registration State</label>
                                            <input type="text" placeholder="REGISTRATION STATE" className="form-control" id="reg_state" name="reg_state" onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Invoice Frequency</label>
                                            <input type="email" placeholder="INVOICE FREQUENCY" className="form-control" id="invoice_freq" name="invoice_freq" onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="location">Payment Frequency</label>
                                            <input type="text" placeholder="PAYMENT FREQUENCY" className="form-control" id="payment_freq" name="payment_freq" onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="domain">Address</label>
                                            <input type="text" placeholder="ADDRESS" className="form-control" id="address" name="address" onChange={this.handleInputChange}/>
                                        </div>
                                        <div className = "row">
                                            <div className="col-xs-3"></div>
                                            <div className="col-xs-6">
                                                <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForCreateUser}</p>
                                            </div>
                                            <div className="col-xs-3"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-4"></div>
                                            <div className="col-xs-4">
                                                <button type="submit" className="btn btn-primary btn-lg btn-block btn-clr">Create</button>
                                            </div>
                                            <div className="col-xs-4"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>

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
        setTabnerVendors: (vendors) => {
            dispatch(setTabnerVendors(vendors));
        },
        deleteVendor: (index) => {
            dispatch(deleteVendor(index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
