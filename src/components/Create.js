import React from 'react'

export default class List extends React.Component{
    render(){
    return (  
      <form onSubmit={this.handleCreate.bind(this)}>
        <input type="text" placeholder="What do I need to do?" ref="createInput" />
        <button>Create</button>
      </form>
    );
  }
  handleCreate(e){
    e.preventDefault();
    this.props.createTask(this.refs.createInput.value);
    this.refs.createInput.value = '';
    console.log( this.refs.createInput.value)
  }
}
