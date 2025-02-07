import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="max-w-7xl mx-auto flex justify-between items-center p-4 ">
      <div className="text-xl font-bold text-primary">
        <Link href="/">PassMedics</Link>
      </div>
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-4 mr-4">
          <Link
            href="/flashcards"
            className="text-gray-600 hover:text-gray-900"
          >
            Flashcards
          </Link>
          <Link href="/history" className="text-gray-600 hover:text-gray-900">
            History
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
