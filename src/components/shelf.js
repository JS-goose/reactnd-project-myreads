import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class Shelf extends Component {
componentDidMount() {
    console.log(this)
}

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
          {
              this.props.books.map((book, key) => <Book updateShelf={this.props.updateShelf} book={book} key={key} />
              )
          }
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
