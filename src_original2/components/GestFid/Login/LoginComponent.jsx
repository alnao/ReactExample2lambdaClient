import React, { Component } from 'react';
import  {Link} from 'react-router-dom';
import './LoginComponent.css';
import AuthenticationService  from '../services/authservice.js';

export default class LoginComponent extends Component {

    state = {
        userid: '',
        password: '',
        isLogged: false,
        noLogged: false
    }

    render() {
        return ( 
            <div className="LoginComponent">
                <section className="section-content bg padding-y">
                    <div className="container login-container">
                        <div className="row">
                            <div className="col-md-6 login-form">
                                <h3>Accesso a GestFid</h3>
                                <div className="form-group">
                                    <input type="text" className="form-control"  name="userid" placeholder="Nome Utente" 
                                        value={this.state.userid} onChange={this.GestMod} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"  name="password" placeholder="Password" 
                                        value={this.state.password} onChange={this.GestMod} />
                                </div>
                                <div className="form-group">
                                    <button className="btnSubmit" onClick={this.Login}>Connetti</button>
                                </div>
                                <div className="form-group">
                                    <Link className="ForgetPwd" to="/condizioni">Password Dimenticata?</Link>
                                </div>
                                <ConnexKoMsg isNoLogged={this.state.noLogged}  /> 
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    Login = () => {
        console.log(this.state.userid, this.state.password);

        AuthenticationService.jwtAuthUser(this.state.userid, this.state.password)
        .then((response) => {
            AuthenticationService.saveUserInfo(this.state.userid, response.data.token);
            this.props.history.push(`/welcome/${this.state.userid}`); //ALT + 0096 | ALT GR + '
        })
        .catch(() => {
            this.setState({isLogged: false});
            this.setState({noLogged: true});
        })    
    }

    GestMod = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
}

function ConnexKoMsg(props) { 
    if (props.isNoLogged) {
        return <div className="alert alert-danger" role="alert">Spiacente la userid e/o la password sono errate!</div>
    }

    return null;
}