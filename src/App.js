import React, { Component } from 'react';
import Post from './Post.js'//chamando a execução do código: Vira componente '<POST />'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {
  
  // MONTAGEM PARA UM NOVO POST
  constructor(){
    super();
    this.state={
      posts:[]
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

  newPost(){
    const post = prompt('Insira o texto do seu novo post');
    let posts = this.state.posts;
    posts.push(post);
    this.setState({posts: posts});
    this.saveInStorage(); // TODA VEZ Q INSERE SALVA
  }


  render() {
        
    return (
           
      <MuiThemeProvider>
          <div style={{padding:30, backgroundColor:'#000000'}}>
            {this.state.posts.map((post,index)=>{
              return(<Post storageKey={'post' + index} text={post}/>)})}
            <FlatButton label={'Novo Post'} onClick={this.newPost.bind(this)} />            
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
