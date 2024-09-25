import Link from 'next/link';

export default function Home() {
  const buttonClass = "bg-blue-600 text-white p-4 w-32 h-32 flex items-center justify-center rounded-lg hover:bg-blue-700 transition";

  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">Welcome to SPEED!</h1>
        <p className="mt-4 text-center">
          Your go-to searchable database for empirical software engineering evidence.
          <br />
          The Software Empirical Evidence Database is the best ever!
        </p>

        {/* Button Section */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link href="/admin" className={buttonClass}>
            Admin
          </Link>
          <Link href="/user" className={buttonClass}>
            User
          </Link>
          <Link href="/moderator" className={buttonClass}>
            Moderator
          </Link>
          <Link href="/analyst" className={buttonClass}>
            Analyst
          </Link>
        </div>
      </main>
    </div>
  );
}
