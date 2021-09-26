import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default class Movies extends React.Component {
  render () {
    return (
      <Container>
        {this.props.movieInfo.map((movie, idx) => {
          return(
            <Card key={idx} style={{ width: '20rem' }}>
              <Card.Body>
                <Card.Img variant = "tp" src = {movie.imageURL} />
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
              </Card.Body>
            </Card>
          )
        }
        )}
      </Container>
    )
  }
}