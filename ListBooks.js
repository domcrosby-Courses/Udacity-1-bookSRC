import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from "./BookShelf"

/**
 * Renders 3 bookshelves based on books property & title
 * @version 1.0.0
*/
class ListBooks extends Component {
  static propTypes={
    /** list of books the user has read, currently reading, wishlisted */
    books: PropTypes.array.isRequired,
    /** updates the status of a book object given a status string*/
    onBookChange: PropTypes.func.isRequired
  }
  render() {
    const { books, onBookChange } = this.props
    return(
      <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    /** Renders a bookshelf with a supplied title */
          			    title="Currently Reading"
          				  onBookChange={onBookChange}
          				  filteredBooks={books.filter((book)=>book.shelf==="currentlyReading")}
          		    />
        				  <BookShelf
          			    title="Want to Read"
        					  onBookChange={onBookChange}
              		  filteredBooks={books.filter((book)=>book.shelf==="wantToRead")}
              		/>
        				  <BookShelf
              			title="Read"
        					  onBookChange={onBookChange}
              		  filteredBooks={books.filter((book)=>book.shelf==="read")}
              		/>                
                </div>
              </div>
              <div className="open-search">
                <Link
                /** Links to search page */
						to='/search'
						className="close-search">Add a Book</Link>
              </div>
            </div>
	)
  }
}

export default ListBooks