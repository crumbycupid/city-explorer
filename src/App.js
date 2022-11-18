import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Weather from './component/Weather'
import Alert from 'react-bootstrap/Alert'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      errorMessage: '',
      isError: false,
      weatherData: [],
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
    console.log(this.state.city)
  };

  handleCitySubmit = async (event) => {
    event.preventDefault();
    console.log('here')
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}&format=json`;
    try {
      let locationInfo = await axios.get(url);

      this.setState({
        cityData: locationInfo.data[0],
        lat: locationInfo.data[0].lat,
        lon: locationInfo.data[0].lon,
        isError: false,
        isAlertShown: false
      }, this.handleWeather);

    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
  }

  handleWeather = async () => {

    try {
      let url = `http://localhost:3002/weather?&lat=${this.state.lat}&lon=${this.state.lon}`
      let weatherData = await axios.get(url);

      console.log(weatherData);

      this.setState({
        weatherData: weatherData.data,
      });

      console.log(this.state);

    } catch (error) {
      console.log(error);
    }
  };

  render() {

    let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.lat},${this.state.lon}&zoom=13`


    //let display = mapUrl;
    /*if(this.state.isError) {
      display = <p>{this.state.errorMessage}</p>
    } else {
    display = <ul>
      <ul>City: {this.state.cityData.display_name}</ul>
      <ul>Latitude: {this.state.cityData.lat}</ul>
      <ul>Longitude: {this.state.cityData.lon}</ul>
    </ul>
  }*/

    let weatherDisplay = this.state.weatherData.map(weatherData => {

      return (
        <Weather
          date={this.state.weatherData.date}
          description={this.state.weatherData.description}
        />)
    });

    return (
      <>
        <header>
          <h1 title='404'>City Explorer</h1>
        </header>
        <main>
          <form id='cityForm' onSubmit={this.handleCitySubmit}>
            <label>
              <input name='city' type='text' onChange={this.handleCityInput} placeholder="Please Search for a City" id="inputId" />
            </label>
            <button type='submit' id="inputIdBtn">Explore</button>
          </form>
          <article>
            <img src={mapUrl} alt={this.state.cityData.display_name} />
            {this.state.isError ? <Alert className="alert"><Alert.Heading>Oh No! There is an Error!</Alert.Heading><p>{this.state.errorMessage}</p></Alert> : <p className='alert'></p>}
          </article>
        </main>
        <p>{this.state.cityData.display_name}</p>
      </>
    );
  }
}
    export default App;
