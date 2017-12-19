import React, { Component } from "react";
import { Container, Col, Button, Badge } from "reactstrap";
import ListItems from "./container/ListItems";
import FaBeer from "react-icons/lib/fa/beer";
import _ from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      isLoaded: false,
      drunkMode: false
    };
  }
  makeRequest = () => {
    const page = this.state.currentPage;
    const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`;
    setTimeout(() => {
      fetch(url)
        .then(response => {
          return response.json().catch(err => {
            console.log(err);
          });
        })
        .then(data => {
          let dataArr = data;
          if (this.state.data) {
            dataArr = _.flatten([...this.state.data, data]);
          }
          this.setState({ data: dataArr, isLoaded: true });
        });
    }, 1800);
  };

  componentDidMount() {
    this.makeRequest();
  }

  loadMore = () => {
    this.setState(
      state => ({ currentPage: state.currentPage + 1 }),
      () => {
        this.makeRequest();
      }
    );
  };

  isDrunkModeOn = (cutString = false) => {
    const mode = this.state.drunkMode;
    let drunkMode = "";
    if (mode) {
      drunkMode = "On !";
    } else {
      drunkMode = "Off :(";
    }
    return cutString ? drunkMode.substr(0, 3).split(" ")[0] : drunkMode;
  };

  handleDrunkMode = () => {
    this.setState({ drunkMode: !this.state.drunkMode });
  };
  render() {
    return (
      <div className="App">
        <Container>
          {this.state.isLoaded && (
            <div>
              <h3 className="text-center">
                {!this.state.drunkMode ? "Would you like to enter drunk mode?" : "Good choice !"}
              </h3>
              <div className={"text-center"}>
                <Button
                  color="primary"
                  outline
                  onClick={e => this.handleDrunkMode()}
                >
                  Drunk mode{" "}
                  <Badge color="secondary">{this.isDrunkModeOn()}</Badge>
                </Button>
              </div>

              <div>
                <ListItems
                  data={this.state.data}
                  loadMore={this.loadMore}
                  mode={this.isDrunkModeOn(true)}
                />
              </div>
            </div>
          )}
          {!this.state.isLoaded && (
            <Col xs={12} style={{ textAlign: "center" }}>
              <FaBeer size={40} className={"icon-spin"} />
            </Col>
          )}
        </Container>
      </div>
    );
  }
}

export default App;
