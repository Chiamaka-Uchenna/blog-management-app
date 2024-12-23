"use client";

import Link from "next/link";
import { useAuth } from "../lib/firebase"; // Custom hook for Firebase Authentication
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            <Link href="/">Blogify</Link>
          </h1>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
            </li>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/admin/login"
                className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
