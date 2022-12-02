import React from "react";
import WeatherDay from './WeatherDay'

class Weather extends React.Component {
 render() {
  let weathers = [];
  this.props.weatherData.forEach((event, index) => {
    return(
      <WeatherDay
      key={index}
      weatherData={event}
      />
    );
  });
    return (
      <>
        <h2>{this.props.cityName} weathers</h2>
       <ul>
        {weathers}
        </ul>
      </>
    );
  }
}


export default Weather;
