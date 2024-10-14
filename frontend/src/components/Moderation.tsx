import React, { useState, useEffect } from 'react';
import { Book, BookStatus } from './Book';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Moderation.css';

function Moderation() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filter, setFilter] = useState<'all' | 'accepted' | 'rejected'>('all');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/api/books"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        const books = await res.json();
        setBooks(books);
      } catch (err) {
        console.log("Error from Moderation: " + err);
      }
    };

    fetchBooks();
  }, []);

  const updateBookStatus = async (id: string, status: BookStatus) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}/status`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update book status');
      }
  
      const updatedBook = await response.json();
      console.log('Book status updated:', updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
      );
  
      // Show success toast
      toast.success(`Book ${status === BookStatus.Accepted ? 'accepted' : 'rejected'} successfully!`);
    } catch (error) {
      console.error('Error updating status:', error);
      // Use type assertion to specify that error is an instance of Error
      const err = error as Error;
      toast.error('Error updating status: ' + err.message);
    }
  };

  const handleAccept = (id: string) => {
    updateBookStatus(id, BookStatus.Accepted);
  };

  const handleReject = (id: string) => {
    updateBookStatus(id, BookStatus.Rejected);
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  const filteredBooks = books.filter((book) => {
    if (filter === 'all') return true;
    if (filter === 'accepted') return book.status === BookStatus.Accepted;
    if (filter === 'rejected') return book.status === BookStatus.Rejected;
    return false;
  });

  return (
    <div className="Moderation">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
            <div className="text-center mb-3">
              <label htmlFor="filter" className="me-2">Filter:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'accepted' | 'rejected')}
                className="form-select d-inline-block w-auto"
              >
                <option value="all">All</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  There are no book records!
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                  <td>{book.status}</td>
                  <td>
                    <button
                      onClick={() => handleAccept(book._id as string)}
                      className="btn btn-outline-success btn-sm"
                      style={{ marginRight: '5px' }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(book._id as string)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleViewDetails(book)}
                      className="btn btn-outline-info btn-sm"
                      style={{ marginLeft: '5px' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {selectedBook && (
  <>
    <div className="backdrop" onClick={handleCloseDetails}></div>
    <div className="book-details">
      <button onClick={handleCloseDetails} className="btn-close" aria-label="Close">x</button>
      <h1>{selectedBook.title}</h1>
      <p><strong>Author:</strong> {selectedBook.author}</p>
      <p><strong>Description:</strong> {selectedBook.description}</p>
      <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
      <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
      <p><strong>Status:</strong> {selectedBook.status}</p>
    </div>
  </>
)}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Moderation;
