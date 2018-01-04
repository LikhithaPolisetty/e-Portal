import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {
    login, logout, setDefaultClient, setDefaultEmployee, setDefaultVendor, setTabnerClients, setTabnerEmployees,
    setTabnerVendors
} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");

class TabnerClients extends Component {

    constructor(){
        super();
        this.state = {
            clients: Object,
            cli: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClientSelect = this.onClientSelect.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : target.value;
        const name = target.name;

        this.setState({
            [name]: value.toUpperCase()
        });

    }

    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };

            axios.get('http://localhost:8080/TabnerEmployeePayroll/tabnerclients', config)
                .then((response) => {
                    this.props.setTabnerClients(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                    console.log(this.props.main.tabnerClients);
                    console.log(this.props.main.tabnerClients[0]);
                    this.setState({
                        clients: response.data.response
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    componentDidMount(){
        this.setState({
            employees: this.props.main.tabnerClients.slice()
        });
    }
    onClientSelect(index){
        this.props.setDefaultClient(this.props.main.tabnerClients[index]);
    }



    render() {

        const clients = this.props.main.tabnerClients.map((client, index) => {
            if(this.state.cli === ''){
                return   <tr className="employee_hover" key={index} onClick={() => this.onClientSelect(index)} ><td>{client.clientname}</td></tr>
            } else {
                if(client.clientname.indexOf(this.state.cli) > -1){
                    return   <tr className="employee_hover" key={index} onClick={() => this.onClientSelect(index)} ><td>{client.clientname}</td></tr>
                } else {
                    return   <tr className="employee_hover" key={index} onClick={() => this.onClientSelect(index)} style={{display: 'none'}}><td>{client.clientname}</td></tr>
                }
            }

        });

        return (
            <div>

                <div>
                    <div className="row">
                        <div className="col-md-3">
                            <h4 className="profile">Clients</h4>
                            <input type="text" className="form-control"  placeholder="SEARCH FOR CLIENTS" id="cli" name="cli" onChange={this.handleInputChange}/>
                            <table class="table table-striped">
                                <tbody>
                                {clients}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-9">
                            {this.props.children}
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
        setTabnerClients: (clients) => {
            dispatch(setTabnerClients(clients));
        },
        setDefaultClient: (client) => {
            dispatch(setDefaultClient(client));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabnerClients);