import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default class Weather extends React.Component {
  render () {
    return (
      <Container>
        {this.props.forecastInfo.map((day, index) => {
          return(
            <Card key={index} style={{ width: '20rem' }}>
              <Card.Body>
                <Card.Title>{day.valid_date}</Card.Title>
                <Card.Text>{day.description}</Card.Text>
              </Card.Body>
            </Card>
          )
        }
        )}
      </Container>
    )
  }
}