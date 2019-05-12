import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


class App extends Component {


 state = {
   products : [],
  }


 /*componentDidMount() {
    axios.get('http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&APPID=2e2993b098246f64cec696e6c602a30f')
      .then(res => {
        console.log(res);
        //this.setState({ products : res.data });
      }
      )
  }*/

handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  
  }

  handlePriceChange = (e) => {
    this.setState({
      price: e.target.value
    })
      
  }

  handleCompoChange = (e) => {
    this.setState({
      compo: [e.target.value]
    })
    
  }
 handleTypeChange = (e) => {
    this.setState({
      type: e.target.value
    })
        
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const produit = {
      name : this.state.name,
      price : this.state.price,
      type : this.state.type,
      composition : this.state.compo,
    } 
    axios({
    method: 'post',
    url: 'http://localhost:1234/produits/create',
    config: { headers: {'Access-Control-Allow-Origin' : '*',
                        'Content-Type': 'text/html; charset=utf-8',},
    data: produit,}
    }).catch(err=>{
      if(err){
      throw err;
      }}).then(res=>{
      console.log(res);
    })
  }

componentDidMount() {
    axios.get('http://localhost:1234/produits/getthemissions')
      .then(res => {
        console.log(res);
        this.setState({ products : res.data });
      }
      )
  }

  
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div className="row" >
        {this.state.products.map((produit, id)=>{
          return(
            
    <div className="col s9 m4" key={id}>
      <div className="card medium">
        <div className="card-content black-text">
          <span className="card-title">Client : {produit.client}</span>
          <p>référence commande : {produit.commande}</p>
          <p>objet : {produit.produit}</p>
          <p>type : {produit.refproduit}</p>
          <p>pièces : {produit.nombrepiece}</p>
          <p>visuels par pièce : {produit.nombrevisuels}</p>
          <p>poste : {produit.poste}</p>
        </div>
        <div className="card-action">
          <a href="#">Attribuer cette mission</a>
        </div>
      </div>
    </div>
  
            )
        
            
        }
        )}
      <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s12">
          <input  id="client" type="text" className="validate" />
          <label htmlFor="name">Nom du client</label>
        </div>
        <div className="input-field col s12">
          <input  id="commande" type="text" className="validate" />
          <label htmlFor="name">référence de la commande</label>
        </div>
      </div>
       <p>
      <label>
        <input className="with-gap" name="produit" value="tshrit" type="radio" />
        <span>Tshirt</span>
      </label>
    </p>
    <p>
      <label>
        <input className="with-gap" value="sac" name="produit" type="radio"  />
        <span>Sac</span>
      </label>
    </p>
    <div className="input-field col s12">
          <input  id="refproduit" type="text" className="validate" />
          <label htmlFor="refproduit">référence produit</label>
    </div>
    <div className="input-field col s12">
          <input  id="nombrepiece" type="number" className="validate" />
          <label htmlFor="nombrepiece">Nombre de pièces à réaliser</label>
    </div>
    <div className="input-field col s12">
          <input  id="nombrevisuel" type="number" className="validate" />
          <label htmlFor="nombrevisuel">Nombre de visuel par pièces</label>
    </div>

        <input type="submit" value="attribuer la mission" onClick={(e)=>{this.handleSubmit(e)}}/>
    </form>
  </div>
      </div>  
      </div>
    );
  }
}

export default App;
