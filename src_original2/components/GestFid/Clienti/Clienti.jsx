import React, { Component } from 'react';
import ClientiService from '../services/API/Clienti/ClientiAPI.js';
import './Clienti.css';
import ReactPaginate from 'react-paginate';

export default class ClientiComponent extends Component {

    state = {
        clienti: [
        ],
        CodFid: "",
        ErrWebApi: false,
        OkMSg: null,
        ErrMsg: "",
        NumCli: 0,
        
        offset: 0,
        data: [],
        elements: [],
        perPage: 2,
        currentPage: 0,
    }

    componentDidMount() {
        this.CercaTutti();
    }

    CercaTutti = () => {
        ClientiService.getAllClientiData()
            .then(response => this.handleResponse(response))
            .catch(error => this.handleError(error))
    }

    ResetValue = () => {
        this.setState({clienti: [], ErrWebApi: false, ErrMsg: "", NumCli: 0});
    }

    Cerca = () => {
        console.log("Ricerca Codice" + this.state.CodFid);

        this.ResetValue();
    
        ClientiService.getClienteByCode(this.state.CodFid)
            .then(response => this.handleResponse(response))
            .catch(error => this.handleError(error))

    }

    Elimina = (codfid) => {
        console.log("Premuto il tasto elimina! CodFid: " + codfid);

        ClientiService.delClienteByCode(codfid)
            .then(response => {
                this.setState({OkMSg : `Eliminazione cliente ${codfid} eseguita con successo!`});
                this.ResetValue();
                this.CercaTutti();
            })
            .catch(error => this.handleError(error))
    }

    Modifica = (codfid) => {
        console.log("Premuto il tasto Modifica! CodFid: " + codfid);

        this.props.history.push(`/inscliente/${codfid}`);

    }

    Inserisci = () => {
        console.log("Premuto il tasto Inserimento!");

        this.props.history.push("/inscliente/-1");
    }

    handleResponse = (response) => {
        console.log(response);

        this.setState(
            {
                clienti : this.state.clienti.concat(response.data)
            }
        )
        
        this.setState(
            {
                NumCli : this.state.clienti.length,
                data : this.state.clienti,
                pageCount: Math.ceil(this.state.clienti.length / this.state.perPage)
            }
        )

        this.setElementsForCurrentPage();

    }

    setElementsForCurrentPage() {
        let elements = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({ elements: elements });
    }

    handleError = (error) => {
        console.log(error.response);

        this.setState(
        { 
            ErrMsg: error.response,
            ErrWebApi: true 
        });
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({ currentPage: selectedPage, offset: offset }, () => {
            this.setElementsForCurrentPage();
        });
    }

    setPerPage = (event) => {
        console.log(event.target.value);

        this.setState(
            { 
                perPage: parseInt(event.target.value), 
                currentPage: 0,  
                offset: 0, 
                data : this.state.clienti,
                pageCount: Math.ceil(this.state.clienti.length / parseInt(event.target.value))}, () => {
            this.setElementsForCurrentPage();
        });
    }

    render() {

        let paginationElement;

        if (this.state.pageCount > 1) {
            paginationElement = (
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={<span className="gap">...</span>}
                pageCount={this.state.pageCount}
                onPageChange={this.handlePageClick}
                forcePage={this.state.currentPage}

                containerClassName={"pagination"}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
            />
            );
        }

        return ( 
            <section className="container">
                
                <div className="table-wrapper"> 
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-5">
                            <h2>Risultati Ricerca: <small>Trovati  {this.state.NumCli} Clienti</small></h2>
                            </div>
                            <div className="col-sm-7">	
                                <button style={{'marginleft':'20px'}} className="btn btn-success float-right"  onClick={this.Inserisci}>
                                    <i className="fa fa-plus"></i> Nuovo Cliente
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="table-filter">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="show-entries">
                                <span>Mostra</span>
                                <select className="form-control" onChange={this.setPerPage}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>5</option>
                                    <option>50</option>
                                </select>
                                <span>righe</span>
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <button type="button" className="btn btn-primary" onClick={this.Cerca}><i className="fa fa-search"></i></button>
                                <div className="filter-group">
                                    <label>Filtro: </label>
                                    <input  name="CodFid" type="text" className="form-control" onChange={this.GestMod}  value={this.state.CodFid} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {this.state.OkMSg && <div className="alert alert-success">{this.state.OkMSg}</div>}
                    <table id="clienti" className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>CodFid</th>
                                <th>Nominativo</th>
                                <th>Indirizzo</th>
                                <th>Comune</th>
                                <th>Telefono</th>
                                <th>Bollini</th>
                                <th>Ultima Spesa</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                            <tbody>
                            {
                                this.state.elements.map (
                                    (cliente, index) => 
                                    <tr key = {cliente.codfid}>
                                        <td>{cliente.codfid}</td>
                                        <td>{cliente.nominativo}</td>
                                        <td>{cliente.indirizzo}</td>
                                        <td>{cliente.comune}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.cards.bollini}</td>
                                        <td>{cliente.cards.ultimaspesa}</td>
                                        <td>
                                            <button className="btn btn-warning table-buttons"  onClick={() => this.Modifica(cliente.codfid)}>
                                                <i className="fa fa-edit" aria-hidden="true"></i> Modifica
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning table-buttons" onClick={e => window.confirm(`Confermi l'eliminazione del cliente ${cliente.codfid} ?`) 
                                                && this.Elimina(cliente.codfid)}>
                                                <i className="fa fa-minus" aria-hidden="true"></i> Elimina
                                            </button>
                                        </td>
                                    </tr>
                                )
                            } 
                            </tbody>
                    </table>
                    <ErrWebApiMsg ErrWebApi={this.state.ErrWebApi}  ErrMsg={this.state.ErrMsg} /> 
                    {paginationElement}
                    
                </div>
            </section>
        )
    }

    GestMod = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
}

function ErrWebApiMsg(props) { 
    if (props.ErrWebApi) {
        return <div className="alert alert-danger" role="alert"><h3>{props.ErrMsg}</h3></div>
    }

    return null;
}

