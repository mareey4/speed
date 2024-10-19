'use client';

import ShowToAnalyse from '@/components/analyst/ShowToAnalyse';

export default function ModeratorPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">Moderate an Article</h1>
        <p className="mt-4 text-center">
          Once a user has submitted an article, please choose if it can be approved or rejected!
        </p>
        <ShowToAnalyse isModerator={true} />
      </main>
    </div>
  );
}
