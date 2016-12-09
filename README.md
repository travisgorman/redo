### Todo App Functionality
a user can...
* create new item in list
* toggle completion — task turns red when clicked on, signaling that the `isComplete` property holds a `true` value. 
* edit any item in the list — when the `EDIT` button is clicked, the field becomes editable, and the `EDIT` & `DELETE` buttons become `CANCEL` and `SAVE`
* save an item -persistence through internal state — when editing, if `SAVE` is clicked, the value of the task is changed.
* delete any item in the list - when `DELETE` is clicked, the ask disappears and is removed from the array

## `Entry.js`
```js
// Entry.js
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(  
  <App />, document.getElementById('app')
)

```
___
## `App.js`

```js
// App.js
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

```
___
## `List.js`

```js
// List.js
import React from 'react';
import _ from 'lodash';
import Head from './Head';
import Item from './Item';

export default class List extends React.Component{
  renderItems() {
    const props = _.omit(this.props, 'todos');b
    return _.map(this.props.todos, (todo, index) => <Item key={index}{...todo}{...props}/>);
  }

  render() {
    return (
      <table>
          <Head/>
          <tbody>
            {this.renderItems()}
          </tbody>
      </table>
    );
  }
}

```
___
## `Item.js`

```js
// Item.js
import React from 'react'

export default class Item extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  renderTaskSection() {
    const { task, isComplete } = this.props;
    const taskStyle = {
      color: isComplete ? 'green' : 'red',
      cursor: 'pointer',
    }

    if (this.state.isEditing) {
      return (  
        <td>
          <form onSubmit={this.onSaveClick.bind(this)} />
            <input type="text" defaultValue={task} ref="editInput" />
        </td>
      );
    }

    return (
       <td style={taskStyle} 
          onClick={this.props.toggleTask.bind(this, task)}>
         {task}
      </td>
    );
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td>
            <button onClick={this.onSaveClick.bind(this)}>Save</button>
            <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </td>
      );
    }
    return (
      <td>
          <button onClick={this.onEditClick.bind(this)}>Edit</button>
          <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>  
      </td>
    );
  }

  render() {
    return (
      <tr>
          {this.renderTaskSection()}
          {this.renderActionsSection()}
      </tr>
    );
  }

  onEditClick() {
    this.setState({ isEditing: true });
  }

  onCancelClick() {
    this.setState({ isEditing: false });
  }

  onSaveClick(e) {
    e.preventDefault();
    const oldTask = this.props.task;
    const newTask = this.refs.editInput.value;
    this.props.saveTask(oldTask, newTask);
    this.setState({ isEditing: false });
  }
}

```
___
## `Create.js`

```js
// Create.js
import React from 'react'

export default class Create extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: null
    };
  }

  renderError(){
    if (!this.state.error) { return null; }
    return <div style={{ color: 'red' }}>{this.state.error}</div>;
  }

  render(){
    return (  
      <form 
          onSubmit={this.handleCreate.bind(this)}>
         <input 
            type="text" 
            placeholder="What do I need to do?" 
            ref="createInput" />
        <button>Create</button>
          {this.renderError()}
      </form>
    );
  }

  handleCreate(e) {
    e.preventDefault();
    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if (validateInput) {
      this.setState({
        error: validateInput
      });
      return;
    }
    this.setState({ error:null });
    this.props.createTask(task);
    this.refs.createInput.value = '';
  }

  validateInput(task){
    if (!task) {
      return 'Please enter a task';
    } else if (_.find(this.props.todos, todo => todo.task === task)) {
      return 'Task already exists';
    } else {
      return null;
    }
  }
}

```
___

## `Head.js`
```js
// Head.js
import React from 'react'

export default class Head extends React.Component{
  render() {
    return (  
        <thead>
          <tr>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>  
    );
  }
}

```
