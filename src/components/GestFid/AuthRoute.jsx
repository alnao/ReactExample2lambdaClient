import React, { Component } from 'react';
import AuthenticationService  from './services/authservice.js'
import  {Redirect, Route} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default class AuthRoute extends Component {

    componentWillMount() {
        this.setupAxiosInterceptors('Bearer ' + sessionStorage.getItem('token'));
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (AuthenticationService.isLogged()) {
                    config.headers.authorization = token
                } 

                return config;
            }
        )
    }  

    render() {
        
        let Token = sessionStorage.getItem('token');

        if (Token === null)
            return <Redirect to="/login" />
        
        let decoded = jwt.decode(Token);
        let ruoli = 'User';// decoded['cognito:groups'];

        if (AuthenticationService.isLogged()) {

            let myrole = this.props.role;

            if (ruoli.includes(myrole))
            {
                return <Route {...this.props} ></Route> 
            }
            else 
            {
                return <Redirect to="/forbidden" />
            }

            
        }
        else {
            return <Redirect to="/login" />
        }

    }

}
