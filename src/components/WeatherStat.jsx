import React, { Component } from "react";
class WeatherStat extends Component {
   
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default WeatherStat;
