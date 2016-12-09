import React from 'react';
import ReactDOM from 'react-dom';
import Head from './Head';
import List from './List';
import Create from './Create';
import _ from 'lodash';

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
];

export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { todos };
  }
  
  render() {
    return (
       <div>
          <h1>React ToDos App</h1>
          <Create
            todos={this.state.todos}
            createTask={this.createTask.bind(this)}/>
          <List
            todos={this.state.todos}
            toggleTask={this.toggleTask.bind(this)}
            saveTask={this.saveTask.bind(this)}
            deleteTask={this.deleteTask.bind(this)}/>
      </div>
    );
  }

  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isComplete = !foundTodo.isComplete;
    this.setState({ todos: this.state.todos });
  }

  saveTask(oldTask, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({ todos: this.state.todos });
  }

  createTask(task) {
    this.state.todos.push({
      task,
      isComplete: false,
    });
    this.setState({ todos: this.state.todos });
  }

  deleteTask(taskToDelete) {
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({ todos: this.state.todos });
  }
  
}
