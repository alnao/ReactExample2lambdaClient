import React, { Component } from 'react';
import './LogoutComponent.css';
import AuthenticationService  from '../services/authservice.js';

export default class LogoutComponent extends Component {

    constructor() {
        super();

        AuthenticationService.clearUserInfo();
    }

    render() {
        return ( 
            <div className="LogoutComponent">
                <h1>Logout Eseguito con Successo!</h1>
            </div>
        )
    }
}