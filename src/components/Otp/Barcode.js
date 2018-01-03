import React from 'react';
import {Component} from 'react';
import { browserHistory} from "react-router";
import {login, logout} from '../../actions/mainActions';
import {connect} from "react-redux";

 class Barcode extends Component {

    constructor(){
        super();
    }


    render() {
        return(
            <div className='container'>
               <div style={{textAlign: 'center', padding: '50px'}}>
                   <img src={localStorage.getItem('tabner_secret')}/>
                   <h4 style= {{color: 'black'}}>please install google authenticator app in your mobile, scan the above QR code and click the below button to continue </h4>
                   <button className='btn btn-primary' onClick={() => {this.props.login();
                       browserHistory.push('/loggedIn');
                   localStorage.removeItem('tabner_secret')}}>Continue</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Barcode);