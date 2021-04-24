import { useEffect, useState, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import PostPreview from './PostPreview';
import Post from './Post';

import UserContext from '../../context/UserContext';

const PostList = () => {
  const { currentUser } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postsToDisplay, setPostsToDisplay] = useState('published');

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

  const handleClick = (e) => {
    const { value } = e.target;
    
    switch (value) {
      case 'all':
        setPostsToDisplay('all');
        break;
      case 'published':
        setPostsToDisplay('published');
        break;
      case 'unpublished':
        setPostsToDisplay('unpublished');
        break;
      default:
        break;
    }
  }

  return (
    <Switch>
      <Route path='/:postId'>
        <Post posts={posts} isLoading={isLoading} />
      </Route>
      <Route path='/'>
        {currentUser && currentUser.isAdmin &&
          <ul>
            <li><button value='all' onClick={handleClick}>All</button></li>
            <li><button value='published' onClick={handleClick}>Published</button></li>
            <li><button value='unpublished' onClick={handleClick}>Unpublished</button></li>
          </ul>
        }
        <div id='post-list'>
          {
            postsToDisplay === 'published' &&
              posts.map((post) => post.published &&
                <PostPreview
                  key={post._id}
                  post={post}
                />
              )
          }
          {
            postsToDisplay === 'unpublished' &&
              posts.map((post) => !post.published &&
                <PostPreview
                  key={post._id}
                  post={post}
                />
              )
          }
          {
            postsToDisplay === 'all' &&
              posts.map((post) =>
                <PostPreview
                  key={post._id}
                  post={post}
                />
              )
          }
        </div>
      </Route>
    </Switch>
  )
}

export default PostList;