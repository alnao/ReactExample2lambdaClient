import React, { Component } from 'react';
import  {Link} from 'react-router-dom';
import './FooterComponent.css';


export default class FooterComponent extends Component {

    render() {
        return ( 
            <div className="FooterComponent">
                <footer className="footer text-xs-center">
                    <p className="text-muted">
                        <small>&copy; 2019 by Xantrix Inc.</small>
                    </p>
                    <p className="text-muted">
                        <Link to="/condizioni"><small>Termini &amp; Condizioni</small></Link>
                    </p>
                    <p className="text-muted">
                        <Link to="/condizioni"><small>Chi Siamo</small></Link>
                    </p>
                    <p className="text-muted">
                        <Link to="/condizioni"><small>I nostri Negozi</small></Link>
                    </p>
                </footer>
            </div>
        )
    }
}