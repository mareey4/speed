"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Book, BookStatus } from '../components/Book';

import Link from 'next/link';

export default function Home() {
  const [acceptedArticles, setAcceptedArticles] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchAcceptedArticles = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/books");
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }
        const articles: Book[] = await res.json();
        
        // Filter for accepted articles
        const filteredArticles = articles.filter((article) => article.status === BookStatus.Accepted);
        setAcceptedArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching accepted articles:", error);
      }
    };
    

    fetchAcceptedArticles();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const buttonClass = "bg-blue-600 text-white p-4 w-32 h-32 flex items-center justify-center rounded-lg hover:bg-blue-700 transition";

  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">SPEED</h1>
        <p className="mt-4 text-center">
          Discover the power of data-driven insights for software engineering.
          <br />
          Empower your projects with evidence that makes a difference!
        </p>

        {/* Button Section */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link href="/admin" className={buttonClass}>Admin</Link>
          <Link href="/user" className={buttonClass}>User</Link>
          <Link href="/moderator" className={buttonClass}>Moderator</Link>
          <Link href="/analyst" className={buttonClass}>Analyst</Link>
        </div>

        {/* Search Section */}
        <div className="flex justify-center space-x-4 mt-8">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-4 w-64 rounded-lg border border-gray-300"
              style={{
                color: "black",
                backgroundColor: "white",
                borderColor: "white",
                width: "100%",
                borderRadius: "8px",
              }}
            />
            <button
              type="submit"
              className="bg-pink-500 text-white p-4 rounded-lg hover:bg-pink-600 transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Display Accepted Articles */}
        <div className="mt-4">
          {acceptedArticles.length === 0 ? (
            <p className="text-center">No accepted articles available.</p>
          ) : (
            <ul className="list-disc list-inside mx-auto max-w-lg">
              {acceptedArticles.map((article: Book) => (  // Add type annotation here
                <li key={article._id} className="mt-2">
                  <strong>{article.title}</strong> by {article.author}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
