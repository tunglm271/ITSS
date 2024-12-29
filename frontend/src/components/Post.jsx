import PropTypes from 'prop-types';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import flower from '../assets/flower.png';
function Post({ post }) {
  const fileServer = 'http://localhost:5000/';

  return (
    <div className="post-card">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="tag-list">
          {post.tags.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </div>
        <img
          src={flower}
          alt=""
          className="flower-img"
        />
      </div>
      <Link to={"/posts/" + post.id}><h2 className="post-title">{post.title}</h2></Link>
      <p>{post.content}</p>

      {/* Nếu bài viết có file, hiển thị liên kết tải xuống */}
      {post.fileUrl && (
        <a href={fileServer + post.fileUrl} download={post.title} className="download-link">
          ダウンロード (Download)
        </a>
      )}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
     id: PropTypes.number.isRequired,
     title: PropTypes.string.isRequired,
     content: PropTypes.string.isRequired,
     fileUrl: PropTypes.string, // fileUrl is optional
     tags: PropTypes.arrayOf(PropTypes.string), // Validate tags as an array of strings
  }).isRequired,
};

export default Post;
