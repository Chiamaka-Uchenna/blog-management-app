"use client"
import { db } from "./lib/firebase";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./lib/firebase"; // Import the useAuth hook
import "./globals.css";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth(); // Using the useAuth hook directly

  return (
    <>
      {/* Ensure these tags are present in the RootLayout */}
      <html lang="en">
        <body>
          <NavBar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          {/* Optionally show logout button if user is logged in */}
          {user && <button onClick={logout}>Logout</button>}
        </body>
      </html>
    </>
  );
}
