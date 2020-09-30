import React, { Component } from "react";
import Layout from "../layout";

import "./bookpage.css";

export default class BookPageComponent extends Component {
  // nigger
  render() {
    let { name, description, coverImage, url } = this.props;
    return (
      <Layout>
        <div className="book-card">
          <div className="book-card__image-frame">
            <img
              className="book-card__image responsive-image"
              src={coverImage}
              alt={`Cover for book called ${name}`}
            />
          </div>
          <div className="book-card__text">
            <h2 className="page-title book-card__title">{name}</h2>
            <p className="book-card__description">{description}</p>
          </div>
        </div>
      </Layout>
    );
  }
}
