import React, { Component } from 'react'
import './App.css';
import Form from './Form';
import Graph from './Graph';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: null };
  render() {
    return (
      <div className="App">
        { (data != null) && <Graph data={this.formatData(data)} /> }
      </div>
    )
  }
}

export default App;
