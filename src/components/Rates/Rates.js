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