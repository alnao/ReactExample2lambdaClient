import React, { Component } from 'react';
import './SignUpComponent.css';
import UserPool from '../Login/UserPool.js';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';

export default class SignUpComponent extends Component {

    state = {
        userid: '',
        password: '',
        conferma: '',
        email: '',
        viewErr: false,
        errMsg: '',
    }

    render() {
        return ( 
            <div className="LoginComponent">
                <section className="section-content bg padding-y">
                    <div className="container login-container">
                        <div className="row">
                            <div className="col-md-6 login-form">
                                <h3>Creazione Nuovo Utente</h3>
                                <div className="form-group">
                                    <input type="text" className="form-control"  name="email" placeholder="Mail" 
                                        value={this.state.email} onChange={this.GestMod} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control"  name="userid" placeholder="Nome Utente" 
                                        value={this.state.userid} onChange={this.GestMod} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"  name="password" placeholder="Password" 
                                        value={this.state.password} onChange={this.GestMod} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"  name="conferma" placeholder="Conferma Password" 
                                        value={this.state.conferma} onChange={this.GestMod} />
                                </div>
                                <div className="form-group">
                                    <button className="btnSubmit" onClick={this.SignUp}>Registra</button>
                                </div>
                                <ViewErrMsg isNoLogged={this.state.viewErr} errMsg={this.state.errMsg}  /> 
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    SignUp = () => {
        console.log('Registrazione utente ' + this.state.userid);

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: this.state.email,
        };

        const attributeEmail = new CognitoUserAttribute(dataEmail);

        attributeList.push(attributeEmail);

        
        if (this.state.password === this.state.conferma)
        {
            console.log("Le Password coincidono");
        }
        else
        {
            this.setState({viewErr: true, errMsg: "Le password non coincidono!"});
            return;
        }
        

        UserPool.signUp(this.state.userid, this.state.password, attributeList, null, 
            function(err,result) 
        {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            var cognitoUser = result.user;
            alert('Creato utente ' + cognitoUser.getUsername());
            console.log('Creato utente ' + cognitoUser.getUsername());

        });

        this.props.history.push(`login`); 
    }

    GestMod = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
}

function ViewErrMsg(props) { 
    if (props.isNoLogged) {
        return <div className="alert alert-danger" role="alert">{props.errMsg}</div>
    }

    return null;
}
