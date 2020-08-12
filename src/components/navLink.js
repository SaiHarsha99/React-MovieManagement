import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavLinks extends Component {
  render() {
    return (
      <nav>
        <Link to={"/home"} onClick={() => this.forceUpdate()}>
          <button className="nbutton">Home</button>
        </Link>
        <Link to={"/favorites"} onClick={() => this.forceUpdate()}>
          <button className="nbutton1">Favourites</button>
        </Link>
        <Link to={"/watched"} onClick={() => this.forceUpdate()}>
          <button className="nbutton2">Watched List</button>
        </Link>
      </nav>
    );
  }
}
