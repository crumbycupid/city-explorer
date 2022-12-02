import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import WeatherDay from './component/WeatherDay'
import Alert from 'react-bootstrap/Alert'
import Movie from './component/Movie';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      weatherData: [],
      movieData: [],
      errorMessage: '',
      isError: false,
      showImage: false
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
    console.log(this.state.city)
  };

  handleCitySubmit = async (event) => {
    try {
      event.preventDefault();
      
      let locationInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}&format=json`);
      let cityWeather = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchedLat=${locationInfo.data[0].lat}&searchedLon=${locationInfo.data[0].lon}`);
      let cityMovie = await axios.get(`${process.env.REACT_APP_SERVER}/movie?searchedCity=${this.state.city}`);
      
      let day = 1;
      
      let theWeather = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchedLat=${locationInfo.data[0].lat}&searchedLon=${locationInfo.data[0].lon}&days=${day}`);
      
      this.setState({
        cityData: locationInfo.data[0],
        weatherData: cityWeather.data[0],
        movieData: cityMovie.data[0],
        lat: locationInfo.data[0].lat,
        lon: locationInfo.data[0].lon,
        singleWeather: theWeather,
        isError: false,
        isAlertShown: false,
        isCity: true
      })
    } catch (error) {
      this.setState({
        isError: true,
        isCity: false,
        isMovie: false,
        errorMessage: error.message,
      })
    }
  }
  
  /*handleWeather = async () => {
    
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}&lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
      let weatherData = await axios.get(url);
      
      console.log(weatherData);
      
      this.setState({
        weatherData: weatherData.data
      });
      
      console.log(this.state);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  handleMovie = async ()=> {
    let movieURL = `${process.env.REACT_APP_SERVER}/movie?search=${this.state.city}`;
    let movieData = await axios.get(movieURL);
    this.setState({
      movieData: movieData.data
    })
  };
  */
 render() {
   
     let url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.lat},${this.state.lon}&zoom=13`;
     let cityGrid = <h2>lat: {this.state.lat}, lon: {this.state.lon}</h2>
     let map = this.state.isCity ? <img src={url} alt={this.state.city}/> : <></>
   
   /*    let weatherDisplay = this.state.weatherData.map((weatherData, idx) => {
      return <Weather
      date = {weatherData.date}
      description = {weatherData.fullDescription}
      key={idx}/>
    });

    let movieDisplay = this.state.movieData.map((movieData, idx) => {
      return <Movie
      movies = {this.state.movieData}
      city = {this.state.searchCity}
      key = {idx}/>
    });

    let display = '';
    if(this.state.isError) {
      display = <p>{this.state.errorMessage}</p>
    } else {
    display = <ul>
      <ul>City: {this.state.cityData.display_name}</ul>
      <ul>Latitude: {this.state.cityData.lat}</ul>
      <ul>Longitude: {this.state.cityData.lon}</ul>
    </ul>
  }

    let weatherDisplay = this.state.weatherData.map(weatherData => {

      return (
        <Weather
          date={this.state.weatherData.date}
          description={this.state.weatherData.description}
        />)
    });*/

    return (
      <>
        <header>
          <h1 title='404'>City Explorer</h1>
        </header>
        <form onSubmit={this.handleCitySubmit}>
          <label>
            <input name='city' onChange={this.handleCityInput} placeholder="ex: Tampa"/>
          </label>
            <button type='submit'>Explore!</button>
        </form>
        {this.state.isError ? <p>{this.state.errorMessage}</p> : <ul></ul>}
        {this.state.showImage &&
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.lat},${this.state.lon}&zoom=13`} alt={this.state.cityData.display_name} />}
            {this.state.isError ? <Alert className="alert"><Alert.Heading>Oh No! There is an Error!</Alert.Heading><p>{this.state.errorMessage}</p></Alert> : <p className='alert'></p>}
          <article>
          <div className="positions">
              {cityGrid}
              {map}
              {this.state.weatherData.length &&
              <WeatherDay
                cityName={this.state.city}
                weatherData={this.state.weatherData}
                />
              }
              <Movie
                cityName={this.state.city}
                movie={this.state.movieData}
                />
            </div>
            </article>
      </>
    );
  }
}
    export default App;
