"use client";

import { useState } from "react";
import CreateEditPost from "../../components/CreateEditPost";
import PostList from "../../components/PostList";
import { Post } from "../../types"; // Ensure that Post is properly imported

export default function Dashboard() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedPost(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Blogify</h1>
      {isEditing ? (
        <CreateEditPost
          post={selectedPost}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div>
          <button
            onClick={() => setIsEditing(true)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create New Post
          </button>
          <PostList onEdit={handleEdit} />
        </div>
      )}
    </div>
  );
}
