import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import Weather from './Weather.js';
import Movies from './Movies.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityQuery: '',
      location: {},
      error: false,
      forecastInfo: [],
      movieInfo: [],
    }
  }

  handleChange = event => {
    this.setState({
      cityQuery: event.target.value,
    });
  }

  getLocation = async () => {
    const locationAPI = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.cityQuery}&format=json`

    try {
    const response = await axios.get(locationAPI); 

    this.setState({
      location: response.data[0], 
      error: false,
    });
    this.getWeather(); 
    this.getMovies();

  } catch (error) {
    this.setState({
      error: true,
    });
  }
};
  
  getWeather = async () => {
    const weatherAPI = `http://localhost:3001/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
    console.log(weatherAPI);
  try {
    const weatherData = await axios.get(weatherAPI);
    console.log(weatherData);
    // const forecastInfo = weatherData.data;
    this.setState({
      forecastInfo: weatherData.data,
    });
  } catch (error){
    this.setState({
      error: true,
    });
  }
}

  getMovies = async () => {
    const movieAPI = `http://localhost:3001/movies?searchQuery=${this.state.cityQuery}`
    console.log(movieAPI);

    try {
      const movieData = await axios.get(movieAPI);
      console.log(movieData);
      // const movieInfo = movieData.data;
      this.setState({
        movieInfo: movieData.data,
      })
    } catch (error) {
      this.setState({
        error: true,
      })
    }

    }
  

  render() {
    return (
      <Container>

      <Form>
          <Form.Label><h1>Where would you like to go?</h1></Form.Label>
          <Form.Control onChange={this.handleChange} value={this.state.cityQuery}/>
          <Button variant="primary" onClick={this.getLocation}>Explore!</Button>
      </Form>

        {this.state.location.place_id &&
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Img  variant ="top" src ={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=8`}/>
            <Card.Title>{this.state.location.display_name}</Card.Title>
            <Card.Text>Latitude:{this.state.location.lat}</Card.Text>
            <Card.Text>Longitude:{this.state.location.lon}</Card.Text>
            <Weather forecastInfo={this.state.forecastInfo} />
            <Movies movieInfo={this.state.movieInfo} />
          </Card.Body>
        </Card>
      }
      {this.state.error && <h2>Invalid Location. Please enter new city.</h2>}
      </Container>
      )
    }
  }


export default App;

// map finally renders! but error message still renders too. figureo out how to fix that. 