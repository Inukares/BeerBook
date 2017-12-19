import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
} from "reactstrap";
import "../styles/ContainerCard.css";
import { PortalWithState } from "react-portal";
import DetailedInfo from "./DetailedInfo.js";
import FaBeer from "react-icons/lib/fa/beer";
import Img from "react-image";
import InfiniteScroll from "react-infinite-scroller";
import LazyLoad from 'react-lazy-load';

export class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  toggleModal() {
    this.setState(state => {
      return { isModalOpen: !state.isModalOpen };
    });
  }

  render() {
    const beers = this.props.data;
    return (
      <div>
        <InfiniteScroll
          initialLoad={false}
          loadMore={this.props.loadMore}
          hasMore={true || false}
          loader={
            <Col xs={12} style={{ textAlign: "center" }}>
              <FaBeer size={49} className={"icon-spin"} />
            </Col>
          }
          threshold={160}
        >
          <Row>
            {beers.map((beer, ind) => {
              return (
                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  key={ind}
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "0px",
                    marginBottom: "10px"
                  }}
                >
                  <ListedItem
                    beer={beer}
                    key={beer.id}
                    toggleModal={this.toggleModal}
                    mode={this.props.mode}
                  />
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      </div>
    );
  }
}

const ListedItem = props => {
  const beer = props.beer;
  return (
    <div className="cardContainer">
      <PortalWithState closeOnOutsideClick closeOnEsc key={beer.id}>
        {({ openPortal, closePortal, isOpen, portal }) => [
          portal(
            <DetailedInfo
              beer={beer}
              isOpen={isOpen}
              closePortal={closePortal}
              key={beer.id}
              mode={props.mode}
            />
          ),
          <Card
            className="insideCardContainer"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              flexGrow: "auto",
              width: "100%",
              height: "100%",
              justifyContent: "space-around",
              alignItems: "center"
            }}
            onClick={openPortal}
            key={"insideCardContainer"}
          >
            <div className={`imgContainer${props.mode}`} key={beer.id}>
              <LazyLoad offsetBottom={2200}>
                <Img
                  src={beer.image_url}
                  loader={<FaBeer size={30} className={"icon-spin"} />}
                  key={beer.id}
                />
              </LazyLoad >
            </div>
            <CardBody style={{ width: "100%" }}>
              <h5 className="text-warning">{beer.name}</h5>
              <CardSubtitle className="text-muted">
                <small>{beer.tagline}</small>{" "}
              </CardSubtitle>
            </CardBody>
          </Card>
        ]}
      </PortalWithState>
    </div>
  );
};

export default ListItems;