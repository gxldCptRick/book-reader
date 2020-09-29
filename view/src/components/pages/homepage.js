import React, { Component } from "react";
import Layout from "../layout";
import BookComponent from "../bookcard";
export default class HomePageComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      books: [],
    };
  }
  componentDidMount() {
    let { ioc } = this.props;
    let sessionManager = ioc.get("sessionManager");
    sessionManager
      .get("books", [])
      .then((books) => {
        this.setState({ books });
        console.log("Loading books into state");
      })
      .catch((err) => {
        this.setState({ errorMessage: err });
        console.error(err);
      });
  }
  _renderPage() {
    let { books } = this.state;
    return (
      (books.length > 1 &&
        books.map((b) => <BookComponent {...b}></BookComponent>)) || (
        <p>There are currently no books</p>
      )
    );
  }

  _renderChoice() {
    let { errorMessage } = this.state;
    return (
      (errorMessage && <p className="error-message">{errorMessage}</p>) ||
      this._renderPage()
    );
  }
  render() {
    let { navElements } = this.props;
    return <Layout navElements={navElements}>{this._renderChoice()}</Layout>;
  }
}
