import './App.css';
import axios from 'axios';
import { Component } from 'react';
import Figure from 'react'; 
import Container from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
    }
  }
  handleChange = event => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  getLocation = async () => {

    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&Q=${this.state.searchQuery}&format=json`;

    try {
      const response = await axios.get(url);

      const location = response.data[0];

      this.setState({
        location: location,
        error: false,
      });

    } catch (error) {
      console.error('Invalid City', this.state.searchQuery);
      this.setState ({ error: true});
    }
  }

  render() {
    return (
      <Container>
        <input onChange={(event) => this.setState({ searchQuery: event.target.value})} placeholder="enter city name"></input>
        <button onClick={this.getLocation}>Explore!</button>

        {this.state.location.place_id &&
        <h2>The city is: {this.state.location.display_name}</h2>
        }

        {this.state.error && <h2>Invalid City Name.</h2>}

        <Figure>
          <Figure.Image
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=18`}
          />
          <Figure.Caption>
            {this.state.location.display_name}
          </Figure.Caption>
          <Figure.Caption>
            Latitude:{this.state.location.lat}
          </Figure.Caption>
          <Figure.Caption>
            Longitude:{this.state.location.lon}
          </Figure.Caption>
        </Figure>

      </Container>
    )
  }
} 

export default App;
