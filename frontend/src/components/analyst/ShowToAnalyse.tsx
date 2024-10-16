import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from "../Book";

interface ShowToAnalyseProps {
  filterByAnalysis?: boolean;
}

function ShowToAnalyse({ filterByAnalysis = false }: ShowToAnalyseProps) {
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
        const fetchedBooks = await res.json();

        const filteredBooks = filterByAnalysis
          ? fetchedBooks.filter((book: Book) => book.analysis)
          : fetchedBooks;

        setBooks(filteredBooks);
      } catch (err) {
        console.log("Error from ShowToAnalyse: " + err);
      }
    };

    fetchBooks();
  }, [filterByAnalysis]);

  const buttonClass =
    "bg-pink-500 text-white p-2 w-full flex items-center justify-center rounded-lg hover:bg-pink-600 transition";

  return (
    <div className="ShowToAnalyse">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
              <th style={{ width: "30%", padding: "10px" }}>Description</th>
              <th style={{ width: "15%", padding: "10px" }}>Published Date</th>
              <th style={{ width: "15%", padding: "10px" }}>Publisher</th>
              <th style={{ width: "15%", padding: "10px" }}>Analysis</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
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
                <tr key={book._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{book.title}</td>
                  <td style={{ padding: "10px" }}>{book.isbn}</td>
                  <td style={{ padding: "10px" }}>{book.author}</td>
                  <td style={{ padding: "10px", wordWrap: "break-word" }}>
                    {book.description}
                  </td>
                  <td style={{ padding: "10px" }}>{book.published_date}</td>
                  <td style={{ padding: "10px" }}>{book.publisher}</td>
                  <td style={{ padding: "10px" }}>
                    {book.analysis ? (
                      <div className="text-success">{book.analysis}</div>
                    ) : (
                      <Link
                        href={`/analyse-book/${book._id}`}
                        className={buttonClass}
                        style={{ width: "80%" }}
                      >
                        Add analysis
                      </Link>
                    )}
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
