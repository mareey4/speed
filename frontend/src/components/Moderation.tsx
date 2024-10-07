import React, { useState, useEffect } from 'react';
import { Book, BookStatus } from './Book';
import Link from 'next/link';

function Moderation() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // State for selected book

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
    } catch (error) {
        console.error('Error updating status:', error);
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

  return (
    <div className="Moderation">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
          </div>
        </div>

        {/* Table to display the list of books */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Status</th> {/* Added Status Column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  There is no book record!
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
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

        {/* Conditional rendering of the selected book details */}
        {selectedBook && (
          <div className="book-details">
            <h1>{selectedBook.title}</h1>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Description:</strong> {selectedBook.description}</p>
            <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
            <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
            <p><strong>Status:</strong> {selectedBook.status}</p>
            <button onClick={handleCloseDetails} className="btn btn-secondary">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Moderation;
