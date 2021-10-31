import React, { Component } from 'react';
import './DatiCliente.css';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import ClientiService from '../../services/API/Clienti/ClientiAPI.js';

export default class DatiClienteComponent extends Component {

    state = {
        id: '',
        codfid: '',
        nominativo: '',
        indirizzo: '',
        comune: '',
        cap: '',
        prov: '',
        telefono: '',
        mail: '',
        attivo: true,
        cards: {
            "bollini": 0,
            "ultimaspesa": "2020-01-01"
        },

        okMsg: null,
        errMsg: null
    }

    componentDidMount() {

        let CodFid = this.props.match.params.codfid;

        if (CodFid != "-1")
        {
            ClientiService.getClienteByCode(CodFid)
                .then(response => this.handleResponse(response))
                .catch(error => this.handleError(error));
        }
    }

    handleResponse = (response) => {
        console.log(response);

        this.setState({
            id : response.data.id,
            codfid : response.data.codfid,
            nominativo : response.data.nominativo,
            indirizzo : response.data.indirizzo,
            comune : response.data.comune,
            cap : response.data.cap,
            prov : response.data.prov,
            telefono : response.data.telefono,
            mail : response.data.mail,
            attivo : response.data.attivo,
            cards : response.data.cards,

            
        })

    }

    handleError = (error) => {
        console.log(error.response.data.message);

        this.setState({errMsg: error.response.data.message});

    }

    Salva = (values) => {
        console.log(values);

        ClientiService.insCliente({
            id : values.id,
            codfid : values.codfid,
            nominativo : values.nominativo,
            indirizzo : values.indirizzo,
            comune : values.comune,
            cap : values.cap,
            prov : values.prov,
            telefono : values.telefono,
            mail : values.mail,
            attivo : values.attivo,
            cards: this.state.cards
        })
        .then(
            () => {
                this.setState({okMsg : 'Inserimento dati eseguito con successo'});
                console.log(this.state.okMsg);
            }
        )
        .catch(error => this.handleError(error));
    }

    Valida = (values) => {

        let errors = {}

        if (!values.codfid) {
            errors.codfid = 'Inserisci il codice fidelity del cliente'
        }
        else if (values.codfid.length !== 8) {
            errors.codfid = 'Il codice fidelity deve avere 8 caratteri'
        }

        if (!values.nominativo) {
            errors.nominativo = 'Inserisci il nome del cliente'
        }
        else if (values.nominativo.length < 6) {
            errors.nominativo = 'Il nome deve avere almeno 3 caratteri'
        }

        if (!values.indirizzo) {
            errors.indirizzo = 'Inserisci l\'indirizzo del cliente'
        }
        else if (values.indirizzo.length < 8) {
            errors.indirizzo = 'L\'indirizzo deve avere almeno 8 caratteri'
        }

        if (!values.comune) {
            errors.comune = 'Inserisci ilò comune di residenza del cliente'
        }

        if (!values.telefono) {
            errors.telefono = 'Inserisci il numero di telefono del cliente'
        }
        else if (values.telefono.length < 5) {
            errors.telefono = 'Il nome deve avere almeno 5 caratteri'
        }

        return errors;

    }

    Annulla = () => {
        console.log("Cliente annullato");

        if (window.confirm('Abbandoni il caricamento?')) {
            this.props.history.push(`/clienti`);
        }

    }

    render() {

        let {id,codfid,nominativo,indirizzo,comune,cap,prov,telefono,mail,attivo} = this.state;
        return ( 
            <section className="container">
                 <div className="card">
                    <div className="card-body">
                        <h3 className="card-title mb-4">Dati Cliente Fidelity</h3>
                        <Formik 
                           initialValues={{id,codfid,nominativo,indirizzo,comune,cap,prov,telefono,mail,attivo}}
                           onSubmit={this.Salva}
                           enableReinitialize={true}
                           validate={this.Valida}
                           validateOnChange={false}
                           validateOnBlur={false}
                        >
                            {
                                (props) => (
                                    <Form>
                                        <div className="form-group">
                                            <img  src={`../user.png`} className="img-sm rounded-circle border" alt="imgcli" />
                                        </div>
                                        
                                        {this.state.okMsg && <div className="alert alert-success"><h5>{this.state.okMsg}</h5></div>}
                                        {this.state.errMsg && <div className="alert alert-danger"><h5>{this.state.errMsg}</h5></div>}

                                        <div className="form-row">
                                            <div className="col form-group">
                                                <label>Codice Fidelity *</label>
                                                <Field type="text" name="codfid" className="form-control" />
                                                <ErrorMessage name="codfid" component="span" className="errmsg" />
                                    
                                            </div>
                                            <div className="col form-group">
                                                <label>Nominativo (Nome Cognome) *</label>
                                                <Field type="text" name="nominativo" className="form-control" />   
                                                <ErrorMessage name="nominativo" component="span" className="errmsg" />  
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col form-group">
                                                <label>Indirizzo</label>
                                                <Field type="text" name="indirizzo" className="form-control" />
                                                <ErrorMessage name="indirizzo" component="span" className="errmsg" />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col form-group">
                                                <label>Comune</label>
                                                <Field type="text" name="comune" className="form-control" />
                                                <ErrorMessage name="comune" component="span" className="errmsg" />
                                            </div>
                                            <div className="col form-group">
                                                <label>Cap</label>
                                                <Field type="text" name="cap" className="form-control" />
                                            </div>
                                            <div className="col form-group">
                                                <label>Provincia</label>
                                                <Field as="select" name="prov" className="form-control">
                                                    <option value="">Seleziona...</option>
                                                    <option value="SS">Sassari</option>
                                                    <option value="CA">Cagliari</option>
                                                    <option value="NU">Nuoro</option>
                                                    <option value="OT">Olbia</option>
                                                    <option value="OR">Oristano</option>
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col form-group">
                                                <label>Telefono</label>
                                                <Field type="text" name="telefono" className="form-control" />
                                                <ErrorMessage name="telefono" component="span" className="errmsg" />
                                            </div>
                                            <div className="col form-group">
                                                <label>Mail</label>
                                                <Field type="email" name="mail" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <label className="custom-control custom-checkbox">
                                                <Field type="checkbox" name="attivo" className="custom-control-input" />
                                                <div className="custom-control-label"> Attivo </div> 
                                            </label> 
                                        </div>

                                        <div>
                                            <button type="submit" className="btn btn-primary inscli">Salva</button>
                                            <button type="button" onClick={this.Annulla} className="btn btn btn-warning inscli">Annulla</button>
                                        </div>
                                        <hr />
                                        <p className="text-muted">Confermando l'inserimento dei dati si accettano le politiche di privacy</p>
                                        
                                    </Form>
                                )
                            }
                        </Formik>
                     </div>
                 </div>
            </section>
        )
    }
}