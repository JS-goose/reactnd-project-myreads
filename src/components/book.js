import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class Book extends Component {
  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url("${(this.props.book.imageLinks
                  .thumbnail &&
                  this.props.book.imageLinks.smallThumbnail) ||
                  "No image available"}")`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf || "none"}
                onChange={(event) => {
                  this.props.updateShelf(this.props.book, event.target.value)
                }}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors || "Sorry, no author listed."}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
