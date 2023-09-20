import { Link } from "react-router-dom"
import "./Post.css"

const Post = ({post}) => {
  const PF="http://localhost:5000/images/";
  const sub=post.photo && post.photo.substr(13);
  return (
    <div className="post">
    {post.photo && (
      <img
        className="post-img"
        src={PF + sub}
        alt="post image"
      />
    )}
    <div className="post-info">
        <div className="post-cat">
        {post.categories.map((c)=>{
            <span className="post-cat-item">{c.name}</span>
        })}
        </div>
        <Link to={`/post/${post._id}`} className="link post-title">{post.title}</Link><hr/>
        <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
    </div>
    <p className="post-desc">     
      {post.desc}
    </p>
    </div>
  )
}

export default Post