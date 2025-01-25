import { useState, useEffect } from 'react';
import { posts as postsApi } from '../services/api';
import PostForm from './feed/PostForm';
import Post from './feed/Post';

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    loadPosts();
  }, [posts]);

  const loadPosts = async () => {
    try {
      const response = await postsApi.getAll();
      setPosts(response.data);
      //console.log('Posts : ', response.data);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const response = await postsApi.create(newPost);
      await loadPosts();
      // setPosts([response.data, ...posts]);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <div className="container">
      <PostForm onAddPost={handleAddPost} />
      <div className="row mt-4">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed; 