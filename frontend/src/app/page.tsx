"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShowToAnalyse from "@/components/analyst/ShowToAnalyse";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">SPEED</h1>
        <p className="mt-4 text-center">
          Discover the power of data-driven insights for software engineering.
          <br />
          Empower your projects with evidence that makes a difference!
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
        <ShowToAnalyse />
      </main>
    </div>
  );
}
