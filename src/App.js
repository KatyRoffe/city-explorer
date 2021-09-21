import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import axios from 'axios';
import Figure from 'react-bootstrap/Figure'; 
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      map: null,
      error: false,
    }
  }
  // handleChange = event => {
  //   this.setState({
  //     searchQuery: event.target.value,
  //   });
  // }

  getLocation = async (event) => {
    event.preventDefault();
    try {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&Q=${this.state.searchQuery}&format=json`;

    console.log(url);
      const response = await axios.get(url);

      const location = response.data[0];
      console.log(location);
      this.setState({
        location: location,
        error: false,
      });

    } catch (error) {
      // console.error('Invalid City', this.state.searchQuery);
      this.setState ({ error: true});
    }
    const map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;

    this.setState({
      map: map,
    })
  }

  render() {
    return (
      <Container>
        <>
        <Form>
        <Form.Label>Title</Form.Label>

        <Form.Control onChange={(event) => this.setState({ searchQuery: event.target.value})} placeholder="enter city name" type="text"></Form.Control>
        <Button onClick={this.getLocation} variant="primary" type="submit">Explore!</Button>
        </Form>
        </>


        {this.state.error && <h2>Invalid City Name.</h2>}

        <Figure>
          <Figure.Image
            src={this.state.map}
          />
          {this.state.location.place_id &&
          <Figure.Caption>The city is: {this.state.location.display_name}</Figure.Caption>}
          
          {this.state.location.place_id &&
          <Figure.Caption>
            Latitude:{this.state.location.lat}
          </Figure.Caption>}

          {this.state.location.place_id &&
          <Figure.Caption>
            Longitude:{this.state.location.lon}
          </Figure.Caption>}
        </Figure>
      </Container>
    )
  }
} 

export default App;
