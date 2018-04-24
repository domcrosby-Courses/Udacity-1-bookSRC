import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from "./BooksGrid"

/**
 * User can search for books and add to a shelf
 * Current shelf status is displayed
 * @version 1.0.0
*/
class SearchBooks extends Component {
  static propTypes={
    /** list of books the user has read, currently reading, wishlisted */
    books: PropTypes.array.isRequired,
    /** updates the status of a book object given a status string*/
    onBookChange: PropTypes.func.isRequired
  }
  state = {
    /** Query used in search, updates searchBooks as well as searchBox */
    query: '',
    /** List of books returned from the query */
    searchBooks: []
  }
  updateQuery = (query) => {
    this.setState(() => ({query}))
    if (query!==""){
      BooksAPI.search(query)
      .then((searchBooks) => {
        if(query === this.state.query && searchBooks.length){
          this.setState(() => ({
            searchBooks:searchBooks.map((book) => {
              const bk = this.props.books.find(b => b.id === book.id)
              if(bk){book.shelf=bk.shelf}
              else{book.shelf="none"}
              return book
            })
          }))
        }else{
          this.setState(() => ({
            searchBooks:[]
          }))
        }
      })
    }
  }
  render() {
    const { query, searchBooks }  = this.state
    const { onBookChange }  = this.props
    return(
      <div className="search-books">
            <div className="search-books-bar">
      		  <Link
						to='/'
						className="close-search">Back</Link>
              <div className="search-books-input-wrapper">    
                <input 
       	          type="text" 
                  placeholder="Search by title or author"
                  value={query}
				          onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              { (searchBooks.length && (<BooksGrid onBookChange={onBookChange} filteredBooks={searchBooks}/>)) || (<p>no results</p>) }     
            </div>
          </div>
    )
  }
}

export default SearchBooks