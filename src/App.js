import React, {Component} from 'react';
import Header from "./component/Header.js";
import Editor from "./component/Editor.js";
import Chart from "./component/Chart.js";
import DataSetParser from "./component/DataSetParser.js";

class App extends Component {

    /*
    * resize()
    *
    * Resizes Chart based on window and text input size
    *
    */
    resize = () => {
        var textSize = this.textInput.getHeight();
        var chartSize = window.screen.height - textSize - 230;
        this.chart.resize(chartSize);
    }

    render() {
        return (
        <div>
            <Header name="Tassio" ref={instance => {this.header = instance;}}/>
            <Editor onResize={this.resize} ref={instance => {this.textInput = instance;}}/>
            <Chart ref={instance => {this.chart = instance;}}/>
        </div>);
    }
}
export default App;