import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from "./Book"

/**
 * Displays all books given an array of books
 * @version 1.0.0
*/
class BooksGrid extends Component {
  static propTypes={
    /** list of books to display */
    filteredBooks: PropTypes.array.isRequired,
    /** updates the status of a book object given a status string*/
    onBookChange: PropTypes.func.isRequired
  }
  render() {
    const { filteredBooks, onBookChange } = this.props
    return(
    	<ol className="books-grid">
        {filteredBooks.map((bookInfo) =>(
          /** render a book */
          <Book onBookChange={onBookChange} bookInfo={bookInfo} key={bookInfo.id}/>  
        ))}
      </ol>
    )
  }
}

export default BooksGrid