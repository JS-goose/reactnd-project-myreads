import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

/*updateQuery and submitSearch functions were used with permission from the code creator, Ryan White, 
and can be found here https://www.youtube.com/watch?v=acJHkd6K5kI&t=0s&list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s&index=4*/

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: "",
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      this.setState({ books: response });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      book.shelf = shelf;
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book]),
      }));
    });
  };

  updateQuery = (query) => {
    this.setState({ query: query }, this.submitSearch);
  };

  submitSearch() {
    if (this.state.query === "" || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then((response) => {
      console.log(response);
      if (response.error) {
        return this.setState({ results: [] });
      } else {
        response.forEach(b => {
          let find = this.state.books.filter(book => book.id === b.id);
          b.shelf = find[0] ? find.shelf : null;
          // if(find[0]) {
          //   console.log('match')
          //   b.shelf = find[0].shelf;
          // }
        });
        return this.setState({ results: response });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((item, key) => 
               <Book key={key} book={item} />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
