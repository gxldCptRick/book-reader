import React, { Component } from "react";
import Layout from "../layout";
import BookComponent from "../bookcard";
import { DATA_PROVIDERS } from "../../data/iocConstants";
import "./homepage.css";

const bookKey = "books";

export default class HomePageComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      books: [],
      input: "",
    };
  }
  componentDidMount() {
    let { ioc, managerName = DATA_PROVIDERS.SESSION_MANAGER } = this.props;
    let sessionManager = ioc.get(managerName);
    sessionManager
      .get(bookKey, [])
      .then((books) => {
        this.setState({ books });
        console.log("Loading books into state");
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
        console.error(err);
      });
  }

  updateHistory = (book) => {
    const { ioc } = this.state;
    const history = ioc.get(DATA_PROVIDERS.HISTORY_MANAGER);
    history.addResource(bookKey, book);
  };

  _renderPage() {
    let { books, input } = this.state;
    input = input.toLowerCase();
    return (
      (books.length > 1 &&
        books
          .filter(({ name }) => name.toLowerCase().includes(input))
          .map((b) => (
            <BookComponent onSelected={this.updateHistory} {...b} />
          ))) || (
        <p className="banner">
          There are currently no books
          {(input && ` that contain : "${input}"`) || input}
        </p>
      )
    );
  }

  _renderChoice() {
    let { errorMessage } = this.state;
    return (
      (errorMessage && (
        <p className="error-message banner">{errorMessage}</p>
      )) ||
      this._renderPage()
    );
  }
  render() {
    let { input } = this.state;
    let { navElements } = this.props;
    return (
      <Layout navElements={navElements}>
        <div className="search-box">
          <input
            className="search-box__input"
            placeholder="search books"
            value={input}
            onChange={({ target: { value } }) =>
              this.setState({ input: value })
            }
          />
        </div>
        {this._renderChoice()}
      </Layout>
    );
  }
}
