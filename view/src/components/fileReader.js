import React, { Component } from "react";

export default class FileReaderComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.chain = new ChainBuilder().build();
  }
  render() {
    let { fileUrl } = this.props;
    const RendererComponent = this.chain.createComponent(fileUrl);
    return <RendererComponent url={fileUrl} />;
  }
}

class ChainBuilder {
  constructor() {
    this.links = [];
  }
  addLink(link = FileChainer) {
    this.links.push(link);
  }
  build() {
    let end = new PdfViewerEnd();
    for (const link of this.links) {
      end = new link(end);
    }
    return end;
  }
}

class PdfViewerEnd {
  createComponent() {
    return ({ url }) => <iframe title="Book Frame" src={url} />;
  }
}

class FileChainer {
  constructor(nestedComponent) {
    this.nestedComponent = nestedComponent;
  }
  _isResponsible(url) {
    throw new Error("Not Implemented");
  }
  _createComponent() {
    throw new Error("Not Implemented");
  }
  createComponent(url) {
    if (this._isResponsible(url)) {
      return this._createComponent();
    } else {
      return this.nestedComponent.createComponent();
    }
  }
}
