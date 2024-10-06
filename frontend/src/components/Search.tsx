import { useEffect, useState } from 'react';
import { Book } from './Book';

interface SearchResultsProps {
  query: string;  // Accept query as a prop
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (query) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        })
        .catch((err) => console.log('Error fetching search results:', err))
        .finally(() => setLoading(false));
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index} className="mb-4">
              <h2>{result.title}</h2>
              <p>Author: {result.author}</p>
              <p>ISBN: {result.isbn}</p>
              <p>Published: {result.published_date ? new Date(result.published_date).toLocaleDateString() : 'N/A'}</p>
              <p>Publisher: {result.publisher}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for &quot;{query}&quot;.</p>
      )}
    </div>
  );
}
