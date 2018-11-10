import React, { Component } from 'react';
import Header from "./component/Header.js";

class App extends Component {
  render() {
    return (
      <Header name="Tassio" ref={instance => {this.header = instance;}}/>
    );
  }
}

export default App;
