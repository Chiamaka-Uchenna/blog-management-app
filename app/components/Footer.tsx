export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-12">
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()} Blogify. All rights reserved.</p>
      </div>
    </footer>
  );
}
