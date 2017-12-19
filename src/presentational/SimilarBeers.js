import React from "react";
import _ from "lodash";
import FaBeer from "react-icons/lib/fa/beer";
import Img from "react-image";
import "../styles/SimilarBeers.css";
import {
  CardText,
  CardBody,
  Card,
} from "reactstrap";

const SimilarBeers = props => {
  const beerArray = _.flatten(Object.values(props.beer));
  const myBeer = beerArray[0];
  return [
    <Card key={myBeer.id + "card"}>
      <CardBody key={myBeer.id + "cardBody"} className={"cardBodySimilar"}>
        <div id={`imgMother${props.mode}`} className="text-center" style={{ display: "flex", justifyContent: "center" }}>
          <Img
            src={myBeer.image_url}
            loader={<FaBeer size={30} className={"icon-spin"} />}
            key={myBeer.id}
          />
        </div>
        <CardText>
          {myBeer.name}
        </CardText>
      </CardBody>
    </Card>
  ];
};

export default SimilarBeers;