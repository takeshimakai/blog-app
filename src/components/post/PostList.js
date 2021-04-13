import { useEffect, useState } from 'react';

import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('http://localhost:5000/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(err => console.log(err))
  };

  return (
    <div id='post-list'>
      {posts.map((post) => post.published && <Post key={post._id} post={post} />)}
    </div>
  )
}

export default PostList;