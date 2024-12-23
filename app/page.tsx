"use client";

import { useEffect, useState } from "react";
import { db } from "./lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// Define the Post type
interface Post {
  id: string;
  title: string;
  content: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]); // Use the Post type here

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[]; // Explicitly cast to Post[]
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Welcome to Blogify
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
