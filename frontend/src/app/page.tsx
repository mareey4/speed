
export default function Home() {

  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">Welcome to SPEED!</h1>
        <p className="mt-4 text-center">
          Your go-to searchable database for empirical software engineering evidence.
          <br />
          The Software Empirical Evidence Database is the best ever!
        </p>

        <div className="flex justify-center space-x-4 mt-8">

          {/* Search Section */}
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-4 w-64 rounded-lg border border-gray-300"
              style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', width: '100%', borderRadius: '8px' }}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>
          <ShowToAnalyse />
      </main>
    </div>
  );
}
