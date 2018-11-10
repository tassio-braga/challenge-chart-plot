import React from "react";

/*
* Footer component
*
* Holds button that triggers data ingest and Chart update
*/
import './Footer.css';

class Footer extends React.Component {
    render() {
      return (
        <div className="footer">
            <button onClick={this.props.submit}>GENERATE CHART</button>
        </div>
      );
    }
  }

export default Footer;
