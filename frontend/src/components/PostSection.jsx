import PropTypes from 'prop-types';
import Post from './Post';
function PostSection({posts}) {
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
                <img src="https://s3-alpha-sig.figma.com/img/7725/9698/379a6812cb19259fb7ef359b6da622f2?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GvFkEod75-T7ZLlINwq-S9LcTWNtBU55FBrH8ChWhBNqtgCqId~wQOCJQPWiGbMcG4F6d8Ts2Zb3OkZLeVRZo988IA9QleQJVfMwhvs9LIGYRoNUgiIoUttt2jM-rNlxSBgos~Gb3nGz4HkRVKbL~anR-DqM5QNF~FX0TO7hGFY2wXGHnVe8~kUHKHZabBlWRpT2TPJNZoee18ubUc4GzAkYQTJq6tBxdoisQ7TD39il~1qjbXcI59-U9QjVADK32on0E7UtwtEDjnOuWTLWtUiJWPmVJoPCaDDuE1MZpsUdsSO5VzNOEwpVDA~i8ODBxqWclEtl~-tnackkb4g30A__" alt="" id="avatar"/>
            </div>
        </div>

        <div id="homepage-post-list">
            {posts && posts.map((post, index) => <Post key={index} post={post} />)}
        </div>
    </div>
  )
}


PostSection.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default PostSection