const Post = (props) => {
  const { title, content, datePublished } = props.post;

  return (
    <div className='post'>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>{datePublished}</p>
    </div>
  )
}

export default Post;