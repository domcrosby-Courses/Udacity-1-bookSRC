import React from 'react'
import ListBooks from "./ListBooks"
import SearchBooks from "./SearchBooks"
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'

/**
 * Loader for SearchBooks and ListBooks components
 * State : Books - list of books the user has read, currently reading, wishlisted
 * @version 1.0.0
*/
class BooksApp extends React.Component {
  static propTypes = {/** None*/};
  state = {
    /** list of books the user has read, currently reading, wishlisted */
    books:[]
  }
  componentDidMount(){
    /** call API to receive current state of books & sets State:Books  */
		BooksAPI.getAll()
		.then((books) => {
			this.setState(() => ({
				books
			}))
		})
	}
  updateBook = (book, status) => {
    /** updates the status of a book object given a status string*/
    BooksAPI.update(book,status)
    book.shelf = status
    this.setState((currentState) => {
      return {books:[...currentState.books.filter(bk => bk.id !== book.id),book]}
    })
  }
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (   
          /** Renders the search page */
          <SearchBooks books={this.state.books} onBookChange={this.updateBook}/>
        )}/>
        <Route exact path='/' render={()=>(
    	    /** Renders the home page */
          <ListBooks books={this.state.books} onBookChange={this.updateBook}/>
        )}/>       
      </div>
    )
  }
}

export default BooksApp
