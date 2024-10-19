import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from "../Book";

interface ShowToAnalyseProps {
  filterByAnalysis?: boolean;
}

function ShowToAnalyse({ filterByAnalysis = false }: ShowToAnalyseProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

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

  const handleOpenModal = (content: string, title: string) => {
    setModalContent(content);
    setModalTitle(title);
  };

  const handleCloseModal = () => {
    setModalContent(null);
    setModalTitle(null);
  };

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
            tableLayout: "auto",
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
              <th style={{ width: "15%", padding: "10px" }}>SE Practice</th>
              <th style={{ width: "15%", padding: "10px" }}>Claim</th>
              <th style={{ width: "15%", padding: "10px" }}>Result</th>
              <th style={{ width: "15%", padding: "10px" }}>Research Type</th>
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
                    {book.description ? (
                      <>
                        <div className="text-success">
                          {book.description.length > 100
                            ? `${book.description.slice(0, 100)}...`
                            : book.description}
                        </div>
                        {book.description && book.description.length > 100 && (
                          <button
                            className="btn btn-link"
                            onClick={() =>
                              handleOpenModal(
                                book.description || "No description available",
                                "Description"
                              )
                            }
                            style={{ color: "dodgerblue" }}
                          >
                            Read more
                          </button>
                        )}
                      </>
                    ) : null}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {book.published_date
                      ? new Date(book.published_date).toLocaleDateString(
                          "en-NZ",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )
                      : "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>{book.publisher}</td>
                  <td style={{ padding: "10px" }}>
                    {book.analysis ? (
                      <>
                        <div className="text-success">
                          {/*if long analysis, give link to open modal containing full analysis */}
                          {book.analysis.length > 100
                            ? `${book.analysis.slice(0, 100)}...`
                            : book.analysis}
                        </div>
                        {book.analysis.length > 100 && (
                          <button
                            className="btn btn-link"
                            onClick={() =>
                              handleOpenModal(
                                book.analysis || "No description available",
                                "Analysis"
                              )
                            }
                            style={{ color: "dodgerblue" }}
                          >
                            Read more
                          </button>
                        )}
                      </>
                    ) : (
                      <Link
                        href={`/analyse-book/${book._id}`}
                        className={buttonClass}
                        style={{ width: "100%" }}
                      >
                        Add analysis
                      </Link>
                    )}
                  </td>
                  <td style={{ padding: "10px" }}>{book.se_practice}</td>
                  <td style={{ padding: "10px" }}>{book.claim}</td>
                  <td style={{ padding: "10px" }}>{book.result}</td>
                  <td style={{ padding: "10px" }}>{book.research_type}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalContent && (
        <div
          className="modal"
          style={{
            display: "flex",
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "600px",
              width: "90%",
            }}
          >
            <span
              className="close"
              style={{
                position: "absolute",
                right: "20px",
                top: "50px",
                fontSize: "3.5rem",
                cursor: "pointer",
                color: "red",
              }}
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {modalTitle}
            </h2>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowToAnalyse;
