const Post = (props) => {
  const { title, body, datePublished } = props.post;

  return (
    <div className='post'>
      <h3>{title}</h3>
      <p>{body}</p>
      <p>{datePublished}</p>
    </div>
  )
}

export default Post;