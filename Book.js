import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Given a book object, will render that book with image,title,authors,shelf
 * @version 1.0.0
*/
class Book extends Component {
  static propTypes={
    /** info about a book, image, title, authors */
    bookInfo: PropTypes.object.isRequired,
    /** updates the status of a book object given a status string*/
    onBookChange: PropTypes.func.isRequired
  }
  render() {
    const { bookInfo, onBookChange } = this.props
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${(bookInfo.imageLinks&&bookInfo.imageLinks.smallThumbnail)||""})`}}>
            </div>
            <div className="book-shelf-changer">
              <select 
                value={(bookInfo.shelf||"none")}
                onChange={(event) => onBookChange(bookInfo,event.target.value)}
              >
                <option value="unknown" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
  		  </div>
          <div className="book-title">{bookInfo.title}</div>
          <div className="book-authors">{(bookInfo.authors&&bookInfo.authors.join(", "))}</div>
        </div>
      </li>
    )
  }
}

export default Book


