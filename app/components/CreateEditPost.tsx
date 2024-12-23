"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";

interface Post {
  id?: string;
  title: string;
  content: string;
}

interface CreateEditPostProps {
  post?: Post | null; // Can be Post, null, or undefined
  onSave: () => void;
  onCancel: () => void;
}

export default function CreateEditPost({
  post,
  onSave,
  onCancel,
}: CreateEditPostProps) {
  const [title, setTitle] = useState<string>(post?.title || "");
  const [content, setContent] = useState<string>(post?.content || "");

  const handleSave = async () => {
    if (!title || !content) return;

    if (post?.id) {
      // Update existing post
      const postDoc = doc(db, "posts", post.id);
      await updateDoc(postDoc, { title, content });
    } else {
      // Create new post
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: new Date(),
      });
    }

    setTitle("");
    setContent("");
    onSave();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {post ? "Edit Blog Post" : "Create New Blog Post"}
      </h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={6}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
