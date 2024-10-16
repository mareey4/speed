"use client";

import ShowToAnalyse from "@/components/analyst/ShowToAnalyse";

export default function ShowBook() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">Analyse an Article</h1>
        <p className="mt-4 text-center">
          Once you have read the article, add your own analysis! <br />
        </p>
        <ShowToAnalyse />
      </main>
    </div>
  );
}
