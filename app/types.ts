

// Defining a Post type
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}


// Defining a User type for authentication purposes
export interface User {
  uid: string;
  displayName: string;
  email: string;
}


