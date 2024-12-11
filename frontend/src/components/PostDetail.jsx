import PropTypes from 'prop-types';

function PostDetail({post}) {
    return (
        <div className="post-layout">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}

PostDetail.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostDetail;