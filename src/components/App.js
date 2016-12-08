import React from 'react';
import ReactDOM from 'react-dom';
import Head from './Head';
import List from './List';
import Create from './Create';

const todos = [
  {
    task: 'Make a React Todo List App',
    isComplete: false,
  }, {
    task: 'Go for a walk',
    isComplete: false,
  }, {
    task: 'Commit this code',
    isComplete: false,
  },
]
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {todos}
  }
  render() {
    return (  
      <div>
        <h1>React ToDos App</h1>
        <Create />
        <List todos={this.state.todos} />
      </div>
    );
  }
}