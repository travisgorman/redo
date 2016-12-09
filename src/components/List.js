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