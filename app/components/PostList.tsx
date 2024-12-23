"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function PostList({ onEdit }: { onEdit: (post: Post) => void }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
          >
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{post.content}</p>
            <div className="flex space-x-4 mt-auto">
              <button
                onClick={() => onEdit(post)}
                className="text-blue-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="text-red-500 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
