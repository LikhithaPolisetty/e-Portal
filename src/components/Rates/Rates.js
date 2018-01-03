import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {login, logout} from '../../actions/mainActions';
import {connect} from "react-redux";
 class Rates extends Component {

    constructor(){
        super();


    }
    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push("/home");
        }
    }

    render() {

        return(

            <div>
                <div className="dropdown">
                    <hr/>
                    <Link to={"/rates/payrates"} activeStyle={{color: 'red'}}> <button className="btn btn-primary dropdown-toggle btn-align"  type="button" >Pay Rates</button></Link>
                    <Link to={"/rates/billrates"} > <button className="btn btn-primary dropdown-toggle btn-align"  type="button" >Bill Rates</button></Link>

                </div>
                <hr/>

                <div >
                    {this.props.children}
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);