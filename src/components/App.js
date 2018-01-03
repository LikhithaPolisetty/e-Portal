import React from 'react';
import {Component} from 'react';
import Header from "./Header/Header";
import Background from '../images/tabner.jpeg';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import Home from "./Home";
import Employee from "./Payrolls/Employee";


var sectionStyle = {

   /* backgroundImage: "url(" + Background + ")"*/
    backgroundColor : '#B0E0E6'
};


class App extends Component {

    render() {
        return(
            <div>
               <div>
                    <Header />
               </div>

                <div >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;