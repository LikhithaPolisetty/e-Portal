import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import {login,logout, setDefaultVendor, setTabnerVendors} from '../../actions/mainActions';
import {connect} from 'react-redux';
import axios from 'axios';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");

class TabnerVendors extends Component{

    constructor(){
        super();
        this.state={
            vendors: Object,
            ven: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onVendorSelect = this.onVendorSelect.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'text' ? target.value : target.value;
        const name = target.name;

        this.setState({
            [name] : value.toUpperCase()
        });
    }

    onVendorSelect(index){
        this.props.setDefaultVendor(this.props.main.tabnerVendors[index]);
    }

    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push('/home');
        }else{
            var config = {
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };
            axios.get('http://localhost:8080/TabnerEmployeePayroll/tabnervendors', config)
                .then((response) => {
                console.log(response.data.response);
                    this.props.setTabnerVendors(response.data.response);
                    console.log('Data from Redux');
                    console.log(this.props.main.tabnerVendors);
                    this.setState({
                        vendors: response.data.response
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    componentDidMount(){
        this.setState({
            vendors: this.props.main.tabnerVendors.slice()
        });
    }

    render(){
        const vendors = this.props.main.tabnerVendors.map((vendor,index) => {
            if(this.state.ven === '') {
                return <tr className="vendor-hover" key={index} onClick={() => this.onVendorSelect(index)}>
                    <td> {vendor.name} </td>
                </tr>
            } else {
                if(vendor.name.indexOf(this.state.ven) > -1){
                    return <tr className="vendor-hover" key={index} onClick={() => this.onVendorSelect(index)}>
                        <td> {vendor.name} </td>
                    </tr>
                } else {
                    return <tr className="vendor-hover" key={index} onClick={() => this.onVendorSelect(index)} style={{display:'none'}}>
                        <td> {vendor.name} </td>
                    </tr>
                }
            }
        });

        return(
            <div>
                <div>
                    <div className="row">
                        <div className="col-md-3">
                            <h4 className="profile">Vendors</h4>
                            <input type="text" className="form-control" placeholder="Search for Vendors.." id="ven" name="ven" onChange={this.handleInputChange}/>
                            <table className="table table-striped">
                                <tbody>
                                {vendors}
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
    return{
        main: state.main
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        login: () => {
            dispatch(login());
        },
        logout: () => {
            dispatch(logout());
        },
        setTabnerVendors: (vendors) => {
            dispatch(setTabnerVendors(vendors));
        },
        setDefaultVendor: (vendor) => {
            dispatch(setDefaultVendor(vendor));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabnerVendors);
