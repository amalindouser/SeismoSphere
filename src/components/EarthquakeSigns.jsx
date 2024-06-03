import React from 'react';
import { Card, CardGroup, ListGroup, ListGroupItem, CardHeader, Fade } from 'react-bootstrap';

const EarthquakeSigns = () => (
  <Fade appear={true} in={true}>
    <Card className="my-2">
      <Card.Body>
        <Card.Title tag="h5" className="text-center">
          Tanda Tanda Gempa
        </Card.Title>
        <CardGroup>
          {['Sebelum Gempa', 'Selama Gempa', 'Setelah Gempa'].map((stage, index) => (
            <Card key={index} style={{ width: '18rem' }}>
              <CardHeader tag="h5">{stage}</CardHeader>
              <ListGroup flush>
                {getStageItems(stage).map((item, idx) => (
                  <ListGroupItem key={idx}>{item}</ListGroupItem>
                ))}
              </ListGroup>
            </Card>
          ))}
        </CardGroup>
      </Card.Body>
    </Card>
  </Fade>
);

const getStageItems = (stage) => {
  switch (stage) {
    case 'Sebelum Gempa':
      return ['Perubahan perilaku hewan', 'Kenaikan air tanah', 'Perubahan medan magnet bumi', 'Gas yang keluar dari tanah'];
    case 'Selama Gempa':
      return ['Getaran tanah', 'Suara gemuruh', 'Pergerakan objek dan bangunan', 'Perubahan permukaan tanah'];
    case 'Setelah Gempa':
      return ['Gempa bumi susulan', 'Perubahan dalam sumber air', 'Kerusakan infrastruktur', 'Tsunami'];
    default:
      return [];
  }
};

export default EarthquakeSigns;
