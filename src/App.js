import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityQuery: '',
      location: {},
      error: false,
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

  } catch (error) {
    this.setState({
      error: true,
    });
  }
  
  const weatherAPI = `http://localhost:3001/weather?searchQuery=${this.state.cityQuery}`;
  
  try {
    const weatherData = await axios.get(`${weatherAPI}`);
    //console.log(weatherData)
    const forecastInfo = weatherData.data;
    this.setState({
      forecastInfo: forecastInfo,
    });
  } catch (error){
    this.setState({
      error: true,
    });
  }
}

  render() {
    return (
      <Container>

      <Form>
          <Form.Label>Where would you like to go?</Form.Label>
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