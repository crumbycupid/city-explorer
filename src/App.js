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
    }
  }
  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleCitySubmit = async (event) => {
    let url = `https://us1.locationiq.com/v1/search?key${process.env.React_APP_CITY_KEY}&q=${this.state.city}&format=json`;
    try {
      event.preventDefault();
      let locationInfo = await axios.get(url);

      this.setState({
        cityData: locationInfo.data[0],
        isError: false,
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
        <h1>City Explorer</h1>
        <main>
          <form id='cityForm' onSubmit={this.handleCitySubmit}>
            <label>
              <input name='city' type='text' onChange={this.handleCityInput} placeholder="Please Search for a City" id="inputId" />
            </label>
            <button type='submit' id="inputIdBtn">Explore</button>
          </form>
          {this.state.isError ? <Alert className="alert"><Alert.Heading>Oh No! There is an Error!</Alert.Heading><p>{this.state.errorMessage}</p></Alert> : <p className='alert'></p>}
        </main>
      </>
    );
  }
}

export default App;
