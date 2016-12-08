import React from 'react';
import ReactDOM from 'react-dom';

let App = React.createClass({
    getInitialState(){
      return {
        input: '',
        prize: ''
      }
    },
    handleInput(e){
      this.setState({
        input: e.target.value
      })
      console.log( this.state.input )
    },
 
    render(){
      if (this.state.input === 'travis'){
        this.setState({
          input: 'travis',
          prize: "YOU'RE A WINNER!",
        })
      }
      return (
        <div> 
          <input 
            type="text" 
            onChange={this.handleInput} 
            value={this.state.input} />
          <h3>
            {this.state.input}
          </h3>
          <h1>
            {this.state.prize}
          </h1>
         
        </div>
      )
    }
});

  

ReactDOM.render(  
  <App />, document.getElementById('app')
)