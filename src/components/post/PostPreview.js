import { Link } from 'react-router-dom';

const PostPreview = (props) => {
  const { post } = props;

  return (
    <div className='post-preview'>
      <h3>
        <Link to={`/${post._id}`}>{post.title}</Link>
      </h3>
      <p>{post.content}</p>
      <p>{post.datePublished}</p>
    </div>
  )
};

export default PostPreview;