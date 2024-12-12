import PropTypes from 'prop-types';
import Post from './Post';
import Avatar from '@mui/material/Avatar';

function PostSection({ posts }) {
  return (
    <div id="post-section">
      <div>
        <h3>ポスト</h3>
        <h5>ここでは、お客様の目指すスライドに合わせたコンテンツ作成を支援します。</h5>
      </div>

      <div id="welcome-user">
        <div>
          <h3>ようこそ、User</h3>
          <h5>あなたに勧めのポスト</h5>
        </div>
        <div>
          <Avatar alt="User" src="https://mui.com/static/images/avatar/1.jpg" sx={{
            width: 70,
            height: 70,
            marginRight: 1
          }}/>
        </div>
      </div>

      <div id="homepage-post-list">
        {posts &&
          posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
      </div>
    </div>
  );
}

PostSection.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostSection;
