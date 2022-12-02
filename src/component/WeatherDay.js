import React from "react";

class WeatherDay extends React.Component{

  render(){
    let weather = this.props.weather;

    return (
      <>
      <ul>
        {weather[0].time} will be {weather[0].forecast}
      </ul>
      </>
    );

  }

}

export default WeatherDay;
