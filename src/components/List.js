import React from 'react'
import Head from './Head'
import _ from 'lodash';
import Item from './Item'


export default class List extends React.Component{
  renderItems(){
    return _.map(this.props.todos, (todo, index) => 
      <Item key={index}{...todo} />);
  }

  render(){
    return (  
      <table>
        <Head />
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
  handleCreate(e){
    e.preventDefault()
    this.props.createTask(this.refs.createInput.value);
    this.refs.createInput.value = '';
    console.log( this.refs.createInput.value )
  }
}