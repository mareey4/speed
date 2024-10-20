'use client';

import SearchResults from '@/components/Search';

interface SearchPageProps {
  searchParams: { query?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.query || '';

  if (!searchQuery) {
    return (
      <div className="min-h-screen">
        <main className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-center">Search</h1>
          <p className="mt-4 text-center">No search query provided.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">
          Search Results for &quot;{searchQuery}&quot;
        </h1>

        <SearchResults query={searchQuery} />
      </main>
    </div>
  );
}
