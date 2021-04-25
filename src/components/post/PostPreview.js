import { Link } from 'react-router-dom';

const PostPreview = ({ post }) => {
  return (
    <div className='post-preview'>
      <h3>
        <Link to={`/${post._id}`} dangerouslySetInnerHTML={{__html: post.title}} />
      </h3>
      <p dangerouslySetInnerHTML={{__html: post.content}} />
      <p>Created on {post.dateCreated}</p>
      {post.datePublished && <p>Published on {post.datePublished}</p>}
    </div>
  )
};

export default PostPreview;