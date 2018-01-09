import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {login, logout, setDefaultEmployee, setTabnerEmployees} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");
class TabnerEmployees extends Component {

    constructor(){
        super();
        this.state = {
            employees: Object,
            emp: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEmployeeSelect = this.onEmployeeSelect.bind(this);

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

            axios.get('http://'+localStorage.getItem('your_ip')+':8090/TabnerEmployeePayroll/tabneremployees', config)
                .then((response) => {
                    this.props.setTabnerEmployees(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                    console.log(this.props.main.tabnerEmployees);
                    console.log(this.props.main.tabnerEmployees[0]);
                    this.setState({
                        employees: response.data.response
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    componentDidMount(){
        this.setState({
            employees: this.props.main.tabnerEmployees.slice()
        });
    }
    onEmployeeSelect(index){
        this.props.setDefaultEmployee(this.props.main.tabnerEmployees[index]);
    }

    render() {

        const employees = this.props.main.tabnerEmployees.map((employee, index) => {
            if(this.state.emp === ''){
                return   <tr className="employee_hover" key={index} onClick={() => this.onEmployeeSelect(index)} ><td>{employee.last_name}, {employee.first_name}</td></tr>
            } else {
                if(employee.last_name.indexOf(this.state.emp) > -1 || employee.first_name.indexOf(this.state.emp) > -1){
                    return   <tr className="employee_hover" key={index} onClick={() => this.onEmployeeSelect(index)} ><td>{employee.last_name}, {employee.first_name}</td></tr>
                } else {
                    return   <tr className="employee_hover" key={index} onClick={() => this.onEmployeeSelect(index)} style={{display: 'none'}}><td>{employee.last_name}, {employee.first_name}</td></tr>
                }
            }

        });

        return (
            <div className="container-fluid">

                <div>
                    <div className="row">
                        <div className="col-md-3">
                            <h4 className="profile">My Profile</h4>
                            <input type="text" className="form-control"  placeholder="SEARCH FOR EMPLOYEE" id="emp" name="emp" onChange={this.handleInputChange}/>
                            <table class="table table-striped">
                                <tbody>
                                {employees}
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
        setTabnerEmployees: (employees) => {
            dispatch(setTabnerEmployees(employees));
        },
        setDefaultEmployee: (employee) => {
            dispatch(setDefaultEmployee(employee));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabnerEmployees);