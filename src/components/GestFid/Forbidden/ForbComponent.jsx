import React, { Component } from 'react';
import  {Link} from 'react-router-dom';
import './ForbComponent.css';

export default class ForbComponent extends Component {

    render() {
        return (
            <div className="ForbComponent">
                <body class="bg-dark text-white py-5">
                    <div class="container py-5">
                        <div class="row">
                                <div class="col-md-2 text-center">
                                    <p><i class="fa fa-exclamation-triangle fa-5x"></i><br/>Status Code: 403</p>
                                </div>
                                <div class="col-md-10">
                                    <h3>OPPSSS!!!! Spiacente...</h3>
                                    <p>Non hai le prerogative di accesso a questo parte della applicazione.<br/>Per cortesia, torna nel login ed entra con un utente amministratore!</p>
                                    <Link className="btn btn-danger" to="/login">Login</Link>
                                </div>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}