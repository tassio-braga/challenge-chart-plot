import React, { Component } from 'react';
import Header from "./component/Header.js";
import Editor from "./component/Editor.js";

class App extends Component {
  dataSetParser = new DataSetParser();
  render() {
    return (
      <div>
        <Header name="Tassio" ref={instance => {this.header = instance;}}/>
        <Editor onResize={this.resize} ref={instance => {this.textInput = instance;}}/>
      </div>
    );
  }
}

export default App;
