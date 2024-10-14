import React from "react";
import { useState, useEffect } from "react";
import { Book } from "../Book";
import Link from "next/link";

const AdminView = () =>
{
    const [books, setBooks] = useState<Book[]>([]);

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
        console.log("Error from AdminView: " + err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="AdminView">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
          </div>
          <div className="col-md-11">
            <Link
              href="/create-book"
              className="btn btn-outline-warning float-right"
            >
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        {/* Table to display the list of books */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Open Book</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
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
                    <Link
                      href={`/admin-book/${book._id}`}
                      className="btn btn-outline-info btn-sm"
                      style={{ backgroundColor: "dodgerblue", padding: "3px" }}
                    >
                      Edit Book
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default AdminView