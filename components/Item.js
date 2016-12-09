import React from 'react'

export default class Item extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
    }
  }
renderTaskSection(){
  const { task, isComplete } = this.props;
  const taskStyle = {
    color: isComplete ? 'green' : 'red',
    cursor: 'pointer',
  }
  return (  
    <td style={taskStyle}>{task}</td>
  )
}

renderActionsSection() {
  if (this.state.isEditing) {
    return (  
      <td>
          <button>Save</button>
          <button onClick={this.onCancelClick.bind(this)}>
            Cancel
          </button>
      </td>
    );
  }
  return (  
    <td>
        <button onClick={this.onEditClick.bind(this)}>Edit</button>
        <button>Delete</button>  
    </td>
  )
}

render(){
  return (  
    <tr>
        {this.renderTaskSection()}
        {this.renderActionsSection()}
    </tr>
  );
}

onEditClick(){
  this.setState({
    isEditing: true
  });
}

onCancelClick(){
  this.setState({
    isEditing: false
  })
}
}