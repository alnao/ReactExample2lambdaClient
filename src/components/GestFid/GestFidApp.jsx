import React, { Component } from 'react';
import  {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import WelcomeComponent from './Welcome/Welcome';
import ClientiComponent from './Clienti/Clienti';
import LoginComponent from './Login/LoginComponent';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent from './Footer/FooterComponent';
import LogoutComponent from './Logout/LogoutComponent';
import SignUpComponent from './SignUp/SignUpComponent';
import DatiClienteComponent from './Clienti/InsCliente/DatiCliente';
import ForbComponent from './Forbidden/ForbComponent';
import AuthRoute from  './AuthRoute';

export default class GestFidApp extends Component {

    state = {
        User: "User",
        Admin: "Admin"
    }

    render() {
        return ( 
            <div className="GestFidApp">
                <Router>
                    <>
                        <HeaderComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/logout" component={LogoutComponent} />
                            <Route path="/signup" component={SignUpComponent} />
                            <AuthRoute path="/welcome/:userid" component={WelcomeComponent} role={this.state.User} />
                            <AuthRoute path="/inscliente/:codfid" component={DatiClienteComponent} role={this.state.Admin} />
                            <AuthRoute path="/clienti" component={ClientiComponent} role={this.state.User} />
                            <Route path="/forbidden" component={ForbComponent} />
                            <Route  component={ErrorComponent} />
                        </Switch>
                        <FooterComponent />
                    </>
                </Router>
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>Errore. Pagina non Trovata!</div>
}





