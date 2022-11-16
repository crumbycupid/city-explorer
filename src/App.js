import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      errorMessage: '',
      isError: false,
      lat: '',
      lon: ''
    }
  }
  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleCitySubmit = async (event) => {
    try {
      event.preventDefault();
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}&format=json`;
      let locationInfo = await axios.get(url)
      this.setState({
        cityData: locationInfo.data[0],
        lat: locationInfo.data[0].lat,
        lon: locationInfo.data[0].lon,
        isError: false,
        isAlertShown: false
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
  }

  render() {

    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>
        <main>
          <form id='cityForm' onSubmit={this.handleCitySubmit}>
            <label>
              <input name='city' type='text' onChange={this.handleCityInput} placeholder="Please Search for a City" id="inputId" />
            </label>
            <button type='submit' id="inputIdBtn">Explore</button>
          </form>
          {this.state.isError ? <Alert className="alert"><Alert.Heading>Oh No! There is an Error!</Alert.Heading><p>{this.state.errorMessage}</p></Alert> : <p className='alert'></p>}
        </main>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.lat},${this.state.lon}`} alt='placeholder' title='Map'/>
        <p>{this.state.city}, {this.state.lat}, {this.state.lon}</p>
      </>
    );
  }
}

        export default App;
