import React, {Component} from 'react';
import {Scatter} from 'react-chartjs-2';

/*
* Chart Component
*
* recieves preformated data - displays connected scatter chart
*/
class Chart extends Component {

    /*Chart.js options*/
    chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            display: true,
            position: 'right'
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Timestamp'
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Response Time'
                    }
                }
            ]
        }
    };

    /*
    *resize(height)
    *
    *set Chart container height and updates chart size
    *
    */
    resize(height) {
        var chartInstance = this.refs.chart.chartInstance
        chartInstance.canvas.parentNode.style.height = height + 'px';
        chartInstance.resize();
    }

    /*
    *getChartInstance()
    *
    *returns chart.js instance
    *
    */
    getChartInstance() {
        return this.refs.chart.chartInstance;
    }

    render() {
        return (<div ref='chartContainer' className="chartContainer" height={this.props.height}>
            <Scatter ref='chart' data={{
                    datasets: []
                }} options={this.chartOptions}/>
        </div>);
    }
}

export default Chart;
