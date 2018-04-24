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
  /** searches BooksAPI for the query and updates state based on returned book object*/
  /** TODO : shorthand these IF statements */
  updateQuery = (query) => {
    this.setState(() => ({query}))
    if (query!==""){
      BooksAPI.search(query)
      .then((searchBooks) => {
        if(searchBooks.length){this.setState(() => ({
          searchBooks
        }))}else{
          this.setState(() => ({
            searchBooks:[]
          }))
        }
      })
    }else{
    	this.setState(() => ({
          searchBooks:[]
        }))
    }
    
  }
  render() {
    const { query, searchBooks }  = this.state
    const { books, onBookChange }  = this.props
    /** TODO : move this out of render */
    /** TODO : tidy up IF statement */
	  const joinedList = searchBooks.map((book) => {
      const bk = books.find(b => b.id === book.id)
      if(bk){book.shelf=bk.shelf}
      else{book.shelf="none"}
      return book
    })  
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
              <BooksGrid onBookChange={onBookChange} filteredBooks={joinedList} />
            </div>
          </div>
    )
  }
}

export default SearchBooks