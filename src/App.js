import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import Shelf from "./components/Shelf";
import Book from "./components/Book";

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/" component={Shelf} />
        <Route exact path="/search" component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
