import React from 'react';
import {Component} from 'react';
import { browserHistory} from "react-router";
import {login, logout} from '../../actions/mainActions';
import {connect} from "react-redux";
import  axios  from 'axios';

class Totp extends Component {

    constructor(props){
        super(props);
        this.state = {
            password: '',
            messageForTotp: ''

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'tel' ? target.value : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/TabnerEmployeePayroll/totp', {
            username: this.props.main.userName,
            password: this.state.password
        })
            .then((response) => this.ifGotResponseFromSubmit(response))
            .catch(function (error) {
                console.log(error);
            });
    }
    ifGotResponseFromSubmit(response) {
        console.log("are we getting response treue??");
        console.log(response);
        if (response.data.response === true) {
            console.log("token check");
            console.log(response);
            this.props.login();
            localStorage.setItem('tabner_token' ,response.data.token );
            console.log(localStorage.getItem('tabner_token'));
            console.log('is logged value is:' + this.props.main.isLogged);
            browserHistory.push("/employees") ;
        } else {
            this.setState({
                password: '',
                messageForTotp: '* please enter valid OTP'
            });

        }
    }

    render() {
        return(
           <div className="container-fluid otp-form">
                   <form onSubmit={this.handleSubmit.bind(this)}>
                       <div className="form-group">
                           <label htmlFor="pwd">Password:</label>
                           <input type="tel" className="form-control otp-input" id="password" maxLength="6" pattern="[0-9]{6}"
                                  name="password" placeholder="ENTER ONE TIME PASSWORD" onChange={this.handleInputChange}/>
                       </div>
                       <div className="row">
                           <div className="col-xs-4"></div>
                           <div className="col-xs-4">
                               <button type="submit" className="btn btn-primary btn-lg btn-block btn-clr">Submit</button>
                           </div>
                           <div className="col-xs-4"></div>
                       </div>
                       <p style={{color: 'red', textAlign: 'center'}}>{this.state.messageForTotp}</p>
                   </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(Totp);