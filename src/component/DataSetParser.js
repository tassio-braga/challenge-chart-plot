import React from "react";

/*
* DataSetParser()
*
* parses data from event objects
*
*/
class DataSetParser extends React.Component {

    /*Colors used to differentiate data sets*/
    colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6'];

    /*As data is read it is stored in sourceData*/
    sourceData = [];

    /*Set of keys used to group data sets*/
    keys = [];

    /*listening for new data flag*/
    listening = false;

    /*Interval used to display chart*/
    startTime = null;

    endTime = null;


    /*
     * clearData()
     *
     * clears all stored data and settings
     *
     */
    clearData() {
        this.sourceData = [];
        this.setGroup([]);
        this.setSelect([]);
        this.startTime = null;
        this.endTime = null;
    }


    /*
     * setDataInterval(startTime, endTime)
     *
     * recieves two timestamps - defines interval
     *
     */
    setDataInterval(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    };

    /*
     * start(group, select)
     *
     * group - set of keys to group data by
     * select - set of values to be retrieved
     *
     */
    start(group, select) {
        this.clearData();
        this.setGroup(group);
        this.setSelect(select);
        this.listening = true;
    }

    /*
     * stop()
     *
     * Stops listening for new data events
     */
    stop() {
        this.listening = false;
    }

    setGroup(group) {
        this.keys = group;
    };

    setSelect(select) {
        this.values = select;
    };

    /*filterDataInterval() removes data outside interval bounds*/
    filterDataInterval(){
        if(!this.startTime || !this.endTime) return;
        var _this = this;
        this.sourceData.forEach(group => {
            _this.values.forEach(value => {
                for(var i=0; i<group.data[value].length;i++){
                    var time = group.data[value][i].x;
                    if(time <_this.startTime || time >= _this.endTime ){
                        group.data[value].splice(i,1);
                    }
                }
            });
        })
    }

    /*
    * findMatchingDataSet(event) maches event with existing data by group
    *
    * returns group or null
    */
    findMatchingDataSet(event){
        var _this = this;
        return this.sourceData.find(function(element){
            var sum = 0;
            _this.keys.forEach(key=>{
                if(element[key] === event[key]) sum++
            });
            return sum === _this.keys.length
        });
    }

    /*
    * insertData(event) stores data from events into groups
    *
    */
    insertData(event) {
        if (!this.listening) { alert("Waiting start event."); return; }
        var target = this.findMatchingDataSet(event);
        if (target) {
            this.values.forEach(value => {
                target.data[value].push({
                    x: event.timestamp,
                    y: event[value]
                });
            });
            return;
        }

        var data = [];
        this.values.forEach(value => {
            data[value] = []
            if (value) {
                data[value].push({
                    x: event.timestamp,
                    y: event[value]
                });
            }
        });
        var sourceEntry = { data: data };
        this.keys.forEach(key => {
            sourceEntry[key] = event[key];
        });
        this.sourceData.push(sourceEntry);
    }

    /*
    * getDatasets() return all data - filtered by interval if defined
    * return data formated for Chart.js
    */
    getDatasets() {
        var data = [];
        var colorIndex = 0;
        var _this = this;
        this.filterDataInterval();
        this.sourceData.forEach(element => {
            _this.values.forEach(value => {
                var label = value + "";
                _this.keys.forEach(key => {
                    label += " " + element[key];
                });
                data.push({
                    label: label,
                    backgroundColor: _this.colors[colorIndex],
                    borderColor: _this.colors[colorIndex++],
                    data: element.data[value],
                    fill: false,
                    showLine: true
                });
                colorIndex %= _this.colors.length;
            });
        });
        return data;
    };
}

export default DataSetParser;

/*
{type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}
{type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1619780251293}
{type: 'data', timestamp: 1519780251293, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.1}
{type: 'data', timestamp: 1519780251293, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.2}
{type: 'data', timestamp: 1519780251293, os: 'linux', browser: 'chrome', min_response_time: 0.3, max_response_time: 1.3}
{type: 'data', timestamp: 1519780251293, os: 'linux', browser: 'firefox', min_response_time: 0.4, max_response_time: 1.4}
{type: 'data', timestamp: 1619780251293, os: 'mac', browser: 'chrome', min_response_time: 0.5, max_response_time: 1.5}
{type: 'data', timestamp: 1619780251293, os: 'mac', browser: 'firefox', min_response_time: 0.6, max_response_time: 1.6}
{type: 'data', timestamp: 1619780251293, os: 'linux', browser: 'chrome', min_response_time: 0.7, max_response_time: 1.7}
{type: 'data', timestamp: 1619780251293, os: 'linux', browser: 'firefox', min_response_time: 0.8, max_response_time: 1.8}
{type: 'stop', timestamp: 1619780251293}*/
