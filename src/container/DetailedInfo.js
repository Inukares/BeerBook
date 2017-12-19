import React, { Component } from "react";
import "../styles/DetailedInfo.css";
import SimilarBeers from "../presentational/SimilarBeers.js";
import FaBeer from "react-icons/lib/fa/beer";
import Img from "react-image";
import {
  urls,
  Promises,
  PromiseAll
} from "../utilities/urlHelper.js";
import {
  Card,
  CardBody,
  Modal,
  Row,
  Col
} from "reactstrap";

export class DetailedInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getAllPromises();
  }

  getAllPromises = () => {
    const urlsArray = urls(this.props.beer);
    const promises = Promises(urlsArray);
    PromiseAll(promises, data => {
      this.setState(() => {
        return { data };
      });
      return data;
    });
  };

  defineSize = length => {
    let size = 12;
    if (length < 1) {
      return "auto";
    } else {
      return size / length;
    }
  };
  renderLi = () => {
    const beer = this.props.beer;
    return beer.food_pairing.map(singlepair => [
      <li className="liMuted" key={singlepair}>
        <span style={{ marginRight: "3px" }} key={beer.id}>
          -
        </span>
        {singlepair}
      </li>
    ]);
  };

  render() {
    const beer = this.props.beer;
    const data = this.state.data;
    const createCoolSpans = parameter => [
      <small key={beer.id}>
        <span style={{ fontWeight: "400" }}>{parameter.toUpperCase()}: </span>
        <span className="text-muted" style={{ paddingRight: "5px" }}>
          {beer[parameter]}{" "}
        </span>
      </small>
    ];
    const existingArrays = data.filter(itemToFilter => itemToFilter.length > 0);
    return [
      <Modal isOpen={this.props.isOpen} key={`${beer.id}Modal`} size={"lg"}>
        <Card key={`${beer.id}Card`}>
          <CardBody key={`${beer.id}CardBody`}>
            <Row key={`${beer.id}UpperRow`} className={"align-items-center"}>
              <Col xs={{ size: 5 }} className={"text-center"}>
                <div className={`detailedBeerImage${this.props.mode}`}>
                  <Img
                    src={beer.image_url}
                    loader={<FaBeer size={30} className={"icon-spin"} />}
                    key={beer.id}
                  />
                </div>
              </Col>
              <Col xs={{ size: 7 }}>
                <h3>{beer.name}</h3>{" "}
                <h6 className="text-muted">{beer.tagline}</h6>
                <div>
                  {createCoolSpans("ibu")}
                  {createCoolSpans("abv")}
                  {createCoolSpans("ebc")}
                  <br />
                </div>
                <small className="text-muted">{beer.description}</small>
                <br />
                <h6 className="text-muted servingTitle">Best served with:</h6>
                <ul className={"text-muted"}>{this.renderLi()}</ul>
              </Col>
            </Row>
            <Row
              key={"similarBeerRow"}
              className="text-center justify-content-center"
            >
              <div>
                <h6 className="text-warning">Similar beers</h6>
              </div>
            </Row>

            <Row key={`${beer.id}Row`}>
              <div
                className="card-deck text-center"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "15px"
                }}
                key={`${beer.id}CardDeck`}
              >
                {existingArrays.map(beer => [
                  <SimilarBeers
                    beer={beer}
                    size={this.defineSize(existingArrays.length)}
                    key={`${beer.id}SimilarBeers`}
                    mode={this.props.mode}
                  />
                ])}
              </div>
            </Row>
          </CardBody>
        </Card>
      </Modal>
    ];
  }
}

export default DetailedInfo;
