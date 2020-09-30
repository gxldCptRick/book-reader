import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./layout.css";

export default class LayoutComponent extends Component {
  render() {
    let className = this.props.className;
    return (
      <div className={className}>
        <header>
          <Link to="/" className="title-link">
            <h1>Book Reader</h1>
          </Link>
          <nav>
            <ul className="nav-list">
              {this.props.navElements.map(({ url, name }) => (
                <li key={name}>
                  <Link className="nav-list__item" to={url}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main>{this.props.children}</main>
      </div>
    );
  }
}
