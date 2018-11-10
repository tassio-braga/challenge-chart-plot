import React, {Component} from 'react';
import Header from "./component/Header.js";
import Editor from "./component/Editor.js";
import Chart from "./component/Chart.js";
import Footer from "./component/Footer.js";
import DataSetParser from "./component/DataSetParser.js";
import dJSON from 'dirty-json';

class App extends Component {

    dataSetParser = new DataSetParser();

    /*
    * generateChart()
    *
    * reads events from text input and populates Chart
    *
    */
    generateChart = () => {
        this.resize();
        var input = this.textInput.getValue().split("\n");
        var events = [];
        input.forEach(element => {
            if(element.length === 0) element = "{}";
            events.push(dJSON.parse(element));
        });
        events.forEach(event => {
            switch (event.type) {
                case 'start':
                    this.dataSetParser.start(event.group, event.select);
                    break;
                case 'span':
                    this.dataSetParser.setDataInterval(event.begin, event.end);
                    break;
                case 'data':
                    this.dataSetParser.insertData(event);
                    break;
                case 'stop':
                    this.updateChart(this.dataSetParser.getDatasets());
                    this.dataSetParser.stop();
                    break;
                default:
                    alert("Unknown Event type: " + event.type);
            }
        })

    };


    /*
    * updateChart(datasets)
    *
    * Populates Chart
    *
    */
    updateChart(datasets) {
        var data = {
            datasets: datasets
        };
        this.chart.getChartInstance().data = data;
        this.chart.getChartInstance().update();
    }

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
            <Footer submit={this.generateChart}/>
        </div>);
    }
}
export default App;