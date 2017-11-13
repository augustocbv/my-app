import React, { Component } from 'react';

// IMPORT CARD - MATERIAL-UI (VISÃO)
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Post extends Component {

  constructor(){
    super();
    this.state={
      name: 'Baraky',
      likes: 0,
      isFavorite: false,
      comments:['Olá']
    }
    
  }

  // NA MONTAGEM VERIFICA SE TEM ALGO NO 'STORAGE'
  componentDidMount(){
    let state = localStorage.getItem(this.props.storageKey);
    state = JSON.parse(state);
    this.setState(state);
  }

  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState); // converte em string
    localStorage.setItem(this.props.storageKey, actualState);
  }

  // INSERE LIKE
  giveLike(){
    let numLikes = this.state.likes;
    numLikes = numLikes + 1;
    const newState = {
      nome: 'Baraky com Likes',
      likes: numLikes
    }
    console.log('GIVELIKES');
    this.setState(newState);
    this.saveInStorage(); // TODA VEZ Q INSERE SALVA
  }

  // AJUSTA BOTAO FAVORITO
  setFavorite(){
    let favorite = this.state.isFavorite;
    favorite = !favorite;
    this.setState({isFavorite: favorite});
    this.saveInStorage(); // TODA VEZ Q INSERE SALVA
  }

  // INSERE COMENTARIO
  newComment(){
    // PEGA ESTADO ATUAL
    let comments = this.state.comments;    
    // MUDA ELE
    const newCommentText = prompt('Digite seu comentário'); 
    comments.push(newCommentText); // ADD ARRAY NOVO COMENTARIO
    // SETA NO ESTADO
    this.setState({comments: comments});
    this.saveInStorage(); // TODA VEZ Q INSERE SALVA
  }
  

  // RENDERIZAÇÃO DA PÁGINA
  render() {
    // VER LOG
    console.log('RENDERAPP');
    
    // TRATAMENTO favoriteText
    let favoriteText;
    if(this.state.isFavorite){
      favoriteText = "REMOVER DOS FAVORITOS";  
    } else {
      favoriteText = "FAVORITO";
    }

    // RETORNO DE PÁGINA
    return (
        <Card style = {{marginBotton:30}}>
            <CardText>
                
      

                <h1>{this.state.name}</h1>
                <h2>{this.props.text}</h2>

                
                {'Likes:' + this.state.likes} <br/>
                
                <FlatButton 
                    backgroundColor="#A4C639"
                    label={'Like'}
                    onClick={this.giveLike.bind(this)} />         
                
                <FlatButton 
                    backgroundColor="#99AAAA"
                    label={favoriteText}
                    onClick={this.setFavorite.bind(this)} />  

                <FlatButton                    
                    label={'Comentar'}
                    onClick={this.newComment.bind(this)} />  


                { /*
                <button onClick={this.setFavorite.bind(this)}>
                {favoriteText}          
                </button>
                
                <br/>
                <button onClick={this.newComment.bind(this)}>
                COMENTAR
                </button>
                */ }                
                

                <Card style={{padding: 15, backgroundColor: '#FFFFFF'}}>
                { // CHAMADA DE FUNÇÃO POR ARROW FUNCTION - OTIMIZADA
                this.state.comments.map((text,index) => {
                    return (<h4 key={index}> {text} </h4>);
                })}
                </Card>
                
                { // CHAMADA DE FUNCÃO 'NORMAL'
                /*
                this.state.comments.map(function(text,index){
                    return (<h4 key={index}> {text} </h4>);
                })
                */
                }
            </CardText>
        </Card>
    );
  }
}

export default Post;
