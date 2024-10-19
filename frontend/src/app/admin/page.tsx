'use client'

import AdminView from "@/components/admin/AdminView";

export default function CreateBook() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">Admin</h1>
        <p className="mt-4 text-center">
          Edit however you like! <br />
        </p>
        <AdminView />
      </main>
    </div>
  );
}
