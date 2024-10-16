import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from "../Book";

function ShowToAnalyse() {
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
        console.log("Error from ShowToAnalyse: " + err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="ShowToAnalyse">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <br />
            <h2
              className="text-center"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Books List
            </h2>
          </div>
          <div className="col-md-11">
            <br />
            <hr />
          </div>
        </div>

        {/* Table to display the list of books */}
        <table
          className="table table-hover"
          style={{
            tableLayout: "fixed",
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "15%", padding: "10px" }}>Title</th>
              <th style={{ width: "10%", padding: "10px" }}>ISBN</th>
              <th style={{ width: "15%", padding: "10px" }}>Author</th>
              <th style={{ width: "30%", padding: "10px" }}>
                Description
              </th>{" "}
              {/* Wider column */}
              <th style={{ width: "15%", padding: "10px" }}>Published Date</th>
              <th style={{ width: "15%", padding: "10px" }}>Analysis</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                <td
                  colSpan={6}
                  className="text-center"
                  style={{ padding: "10px" }}
                >
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
                      href={`/analyse-book/${book._id}`}
                      className="btn btn-outline-info btn-sm"
                      style={{ backgroundColor: "dodgerblue", padding: "3px" }}
                    >
                      Add analysis
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

export default ShowToAnalyse;
