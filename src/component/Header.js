import React from "react";
import './Header.css';
/*
* Header Component
*
* Displays name
*/
class Header extends React.Component {
    render() {
      return (
        <div className={this.props.className + " Header"}>
            <p>{this.props.name}'s Challenge</p>
        </div>
      );
    }
  }

export default Header;