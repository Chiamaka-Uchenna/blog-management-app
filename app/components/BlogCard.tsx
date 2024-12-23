"use client";
import Link from "next/link";

import { Post } from "../types"; // Assuming you've defined a Post interface in types.ts

export default function BlogCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6 hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-4">
        {post.content.substring(0, 100)}...
      </p>
      <Link
        href={`/blog/${post.id}`}
        className="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        Read More
      </Link>
    </div>
  );
}
