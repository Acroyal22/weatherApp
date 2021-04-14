import React from "react"; 

import { Card } from 'semantic-ui-react'

const Cards = ({weather}) => (
  <Card>
    <Card.Content>
        <Card.Header className="header">{weather.name}</Card.Header>
    </Card.Content>
  </Card>
)

export default Cards;
