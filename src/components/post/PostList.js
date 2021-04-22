import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import PostPreview from './PostPreview';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = () => {
    fetch('http://localhost:5000/posts')
    .then(res => res.json())
    .then(data => {
      setPosts(data);
      setIsLoading(false);
    })
    .catch(err => console.log(err))
  };

  return (
    <Switch>
      <Route path='/:postId'>
        <Post posts={posts} isLoading={isLoading} />
      </Route>
      <Route path='/'>
        <div id='post-list'>
          {posts.map((post) => post.published &&
            <PostPreview
              key={post._id}
              post={post}
            />)
          }
        </div>
      </Route>
    </Switch>
  )
}

export default PostList;