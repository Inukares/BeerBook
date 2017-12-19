import React from "react";
import { Jumbotron } from "reactstrap";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return [
        <Jumbotron key={"jumbo"} className="text-center">
          <h1 className="text-info">
            You have probably reached maximum amount of beer-fetching per hour
            from an API.<br />
            You do like drinking, don't you? :)
          </h1>
          <h4>
            If you do enjoy this page, go ahead and visit my{" "}
            <a style={{ fontWeight: "550" }} href="https://github.com/Inukares">
              github
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/piotr-%C5%BCaczek-6896b8121/"
              style={{ fontWeight: "550" }}
            >
              Linkedin
            </a>
          </h4>
        </Jumbotron>
      ];
    }
    return this.props.children;
  }
}
